const { fetchTopics, fetchArticles, fetchArticleById, fetchCommentsByArticleId }= require("../models/model_test")


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
    .catch((err) => {

        if (err.status && err.message) {
            res.status(err.status).send({ message: err.message });
          }
        next(err);

      });
};

module.exports = { getTopics, getArticles, getArticleById, getCommentsByArticleId };