const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const topics = require("../db/data/test-data/topics");


beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    return db.end();
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



})
//do I do a length test with just the endpoint data? Unsure, nothing in model for logic
describe("/api", () => {
    test("GET 200: Responds with endpoint json data", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body }) => {
               const allEndpoints = body.endpoints;
               expect(allEndpoints);
                
            });
    });
    test("GET 404: Returns path not found for an endpoint that does not exist", () => {
        return request(app)
            .get("/apx")
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toEqual('Path not found');
                            
            });
    });

})