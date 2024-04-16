const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const topics = require("../db/data/test-data/topics");


beforeEach(() => {
    return seed(data);
});
//previous katas have asked for typeof but this specifies properties
describe("/api/topics", () => {
    test("GET 200: Responds with an array of all topics", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
               const allTopics = body.topics;
               allTopics.forEach((topics) => {
                expect(topics).toHaveProperty('slug');
                expect(topics).toHaveProperty('description');
               }); 
            });
    });
    test("GET 404: Returns path not found for an endpoint that does not exist", () => {
        return request(app)
            .get("/api/tropics")
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toEqual('Path not found');
                            
            });
    });


 afterAll(() => {
    return db.end();
 });
})