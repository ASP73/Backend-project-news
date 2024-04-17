const db = require("../db/connection");

const fetchTopics = () => {
    return db.query(`SELECT * FROM topics;`).then (( { rows }) => {
        return rows
    });
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

module.exports = { fetchTopics, fetchArticleById };