const { fetchTopics, fetchArticles, fetchArticleById, fetchCommentsByArticleId, postingComment, patchingArticle, deleteComment, fetchUsers }= require("../models/model_test")


const getTopics = (req,res,next) => {
    fetchTopics().then((topics) => {
        res.status(200).send({ topics: topics });
    })
    .catch((err) => {
        next(err);
    });
};

const getArticles = (req,res,next) => {
    fetchArticles().then((topics) => {
        res.status(200).send({ topics: topics });
    })
    .catch((err) => {
        next(err);
    });
};

const getArticleById = (req,res,next) => {
    const { article_id } = req.params;
    fetchArticleById(article_id).then((article) => res.status(200).send({article}))
    .catch((err) => {
        if (err.status && err.message) {
            res.status(err.status).send({ message: err.message });
          }
        // next(err);

      });
};

const getCommentsByArticleId = (req,res,next) => {
    const { article_id } = req.params;
    fetchArticleById(article_id)
    .then(() => fetchCommentsByArticleId(article_id))
    .then((comments) => res.status(200).send({comments}))
    .catch(next);
};

const postCommentToArticle = (req, res, next) => {
    const { article_id } = req.params;
    Promise.all([postingComment( article_id, req.body), fetchArticleById(article_id)]) 
    .then((promiseResults) => {
        const comments = promiseResults[0];
        res.status(201).send({ comments: comments })})
    .catch((err) => {
        next(err);
    })
    ;
}
const patchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    Promise.all([patchingArticle( article_id, req.body), fetchArticleById(article_id)]) 
    .then((promiseResults) => {
        const article = promiseResults[0][0];
        res.status(200).send({ article })})
    .catch((err) => {
        next(err);
    })
    ;
}

const deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    deleteComment(comment_id)
    .then(() => res.status(204).send())
    .catch(next);

}

const getUsers = (req,res,next) => {
    fetchUsers().then((users) => {
        res.status(200).send({ users: users });
    })
    .catch((err) => {
        next(err);
    });
};


module.exports = { getTopics, getArticles, getArticleById, getCommentsByArticleId, postCommentToArticle, patchArticleById, deleteCommentById, getUsers };