const express = require("express");
const { getTopics } = require("./controllers/controller_test");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.all('*', (req, res, next) => {
    res.status(404).send({message: 'Path not found'  });
})



module.exports = app;