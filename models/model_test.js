const db = require("../db/connection");

const fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    return rows;
  });
};

const fetchArticles = () => {
  return db
    .query(
      `SELECT article_id, title, topic, author, created_at, votes, article_img_url, (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS comment_count FROM articles ORDER BY created_at DESC;`
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not found" });
      }
      return rows;
    });
};

const fetchArticleById = (article_id) => {
  if (isNaN(article_id) || article_id <= 0) {
    return Promise.reject({ status: 400, message: "bad request" });
  }
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not found" });
      }
      return rows;
    });
};

const fetchCommentsByArticleId = (article_id) => {
  if (isNaN(article_id) || article_id <= 0) {
    return Promise.reject({ status: 400, message: "bad request" });
  }
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      return rows;
    });
};

const postingComment = (article_id, newComment) => {
  const { username, body } = newComment;
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const patchingArticle = (article_id, newVote) => {
  const { inc_votes } = newVote;
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const deleteComment = (comment_id) => {
  if (isNaN(comment_id) || comment_id <= 0) {
    return Promise.reject({ status: 400, message: "bad request" });
  }
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then(({ rows: comment }) => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, message: "Not found" });
      }
    });
};

const fetchUsers = () => {
  return db
    .query(`SELECT username, name, avatar_url FROM users;`)
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not found" });
      }
      return rows;
    });
};
module.exports = {
  fetchTopics,
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  postingComment,
  patchingArticle,
  deleteComment,
  fetchUsers,
};
