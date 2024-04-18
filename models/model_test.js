const db = require("../db/connection");

const fetchTopics = () => {
    return db.query(`SELECT * FROM topics;`).then (( { rows }) => {
        return rows
    });
}

const fetchArticles = () => {
    return db.query(`SELECT article_id, title, topic, author, created_at, votes, article_img_url, (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS comment_count FROM articles ORDER BY created_at DESC;`)
    .then(({ rows }) => {

       if(rows.length === 0) {
        return Promise.reject({ status: 404, message: 'Path not found'})
       }
        return rows;
    })
}

const fetchArticleById = (article_id) => {

    if(isNaN(article_id) || article_id <= 0){
        return Promise.reject({ status: 400, message: 'bad request'})
    }
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
       
       if(rows.length === 0) {
        return Promise.reject({ status: 404, message: 'Path not found'})
       }
        return rows;
    })
}

const fetchCommentsByArticleId = (article_id) => {

    if(isNaN(article_id) || article_id <= 0){
        return Promise.reject({ status: 400, message: 'bad request'})
    }
    return db.query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {

        return rows;
    })
}

module.exports = { fetchTopics, fetchArticles, fetchArticleById, fetchCommentsByArticleId };