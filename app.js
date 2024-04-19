const express = require("express");
const { getTopics, getArticles, getArticleById, getCommentsByArticleId, postCommentToArticle } = require("./controllers/controller_test");
const endpoints = require("./endpoints.json");

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).send({endpoints});
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentToArticle);

//app.patch("/api/articles/:article_id", patchArticleById);
app.use('*', (req, res, next) => {

    res.status(404).send({message: 'Not found'  });
})

app.use((err, req, res, next) => {
    console.log(err);
    if (err.status && err.message) {
        res.status(err.status).send({ message: err.message });
      }
    next(err);
})

app.use((err, req, res, next) => {
    console.log(err);
    if(err.code === '22P02'){
        res.status(400).send({message: 'bad request'})
    } 
    if(err.code === '23502'){
        res.status(400).send({message: 'bad request'})
    } 
    if(err.code === '23503'){
        res.status(404).send({message: 'Not found'})
    }
    next(err);
})


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({message: 'Internal Server Error'});
})



module.exports = app;