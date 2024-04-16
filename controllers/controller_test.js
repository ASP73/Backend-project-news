const fetchTopics = require("../models/model_test")

const getTopics = (req,res,next) => {
    fetchTopics().then((topics) => {
        res.status(200).send({ topics: topics });
    })
    .catch((err) => {
        next(err);
    });
};

module.exports = { getTopics };