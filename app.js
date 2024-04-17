const express = require("express");
const { getTopics } = require("./controllers/controller_test");
const endpoints = require("./endpoints.json");

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).send({endpoints});
});

app.get("/api/topics", getTopics);

app.all('*', (req, res, next) => {
    res.status(404).send({message: 'Path not found'  });
})



module.exports = app;