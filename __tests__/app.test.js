const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const topics = require("../db/data/test-data/topics");
const articles = require("../db/data/test-data/articles");
const comments = require("../db/data/test-data/comments");



beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    return db.end();
 });
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
                expect(body.message).toEqual('Not found');
                            
            });
    });



})

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
                expect(body.message).toEqual('Not found');
                            
            });
    });

})
describe("/api/articles/:article_id", () => {
    test("GET 200: Responds with endpoint json data", () => {
        return request(app)
            .get("/api/articles/4")
            .expect(200)
            .then(({ body }) => {

              const article = body.article;
              article.forEach((article) => {
                  expect(typeof article.article_id).toBe("number");
                  expect(typeof article.title).toBe("string");
                  expect(typeof article.topic).toBe("string");
                  expect(typeof article.author).toBe("string");
                  expect(typeof article.body).toBe("string");
                  expect(typeof article.created_at).toBe("string");
                  expect(typeof article.votes).toBe("number");
                  expect(typeof article.article_img_url).toBe("string");
                //do I include a test for definite values?
                  expect(article.article_id).toBe(4);
                  expect(article.title).toBe("Student SUES Mitch!");
                  expect(article.topic).toBe("mitch");
                  expect(article.author).toBe("rogersop");
                  expect(article.body).toBe("We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages");
                  expect(article.created_at).toBe("2020-05-06T01:14:00.000Z");
                  expect(article.votes).toBe(0);
                  expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");                

                });
              });
    });
    test("GET 404: Returns an error with a path of the right type, but not present in database", () => {
        return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then(({ body }) => {
                const { message } = body;
                expect(message).toBe('Not found');
                            
            });
    });
    test("GET 400: Returns an error with a path of the wrong type", () => {
        return request(app)
          .get("/api/articles/banana")
          .expect(400)
          .then(({ body }) => {
            const { message } = body;
            expect(message).toBe("bad request");
          });
      });
})
describe("/api/articles", () => {
    test("GET 200: Responds with endpoint json data", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {

              const article = body.topics;
              article.forEach((article) => {
                  expect(typeof article.article_id).toBe("number");
                  expect(typeof article.title).toBe("string");
                  expect(typeof article.topic).toBe("string");
                  expect(typeof article.author).toBe("string");
                  expect(typeof article.comment_count).toBe("string");
                  expect(typeof article.created_at).toBe("string");
                  expect(typeof article.votes).toBe("number");
                  expect(typeof article.article_img_url).toBe("string");
                });
              });
    });
    test("GET 200: Responds with articles ordered by DESC", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            const article = body.topics;
            expect(article).toBeSortedBy("created_at", { descending: true });
          });
      });
    test("GET 404: Returns path not found for an endpoint that does not exist", () => {
        return request(app)
            .get("/api/artichokes")
            .expect(404)
            .then(({ body }) => {
                const { message } = body;
                expect(message).toBe('Not found');
                            
            });
    });  
})
describe("/api/articles/:article_id/comments", () => {
    test("GET 200: Responds with endpoint json data", () => {
        return request(app)
            .get("/api/articles/3/comments")
            .expect(200)
            .then(({ body }) => {
              const comments = body.comments;
              comments.forEach((comment) => {
                  expect(typeof comment.comment_id).toBe("number");
                  expect(typeof comment.votes).toBe("number");
                  expect(typeof comment.created_at).toBe("string");
                  expect(typeof comment.author).toBe("string");
                  expect(typeof comment.body).toBe("string");
                  expect(typeof comment.article_id).toBe("number");
                });
              });
    });
    test("GET 404: Returns an error with a path of the right type, but not present in database", () => {
        return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then(({ body }) => {
                const { message } = body;
                expect(message).toBe('Not found');
                            
            });
    });
    test("GET 400: Returns an error with a path of the wrong type", () => {
        return request(app)
          .get("/api/articles/banana/comments")
          .expect(400)
          .then(({ body }) => {
            const { message } = body;
            expect(message).toBe("bad request");
          });
      });
      test("GET 200: Returns an empty array if article_id does not have any comments", () => {
        return request(app)
          .get("/api/articles/4/comments")
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;
            expect(comments).toEqual([]);
          });
      }); 
})
describe("/api/articles/:article_id/comments", () => {
  test("POST 201: Responds with endpoint json data", () => {
      return request(app)
          .post("/api/articles/3/comments")
          .send({
            username: "rogersop",
            body: "load of garbage",
          })
          .expect(201)
          .then(({ body }) => {
            const comments = body.comments;
            comments.forEach((comment) => {
                expect(typeof comment.comment_id).toBe("number");
                expect(typeof comment.votes).toBe("number");
                expect(typeof comment.created_at).toBe("string");
                expect(typeof comment.author).toBe("string");
                expect(typeof comment.body).toBe("string");
                expect(typeof comment.article_id).toBe("number");
              });
            });
  });
  test("POST 404: Returns an error when posting to an article that doesn't exist", () => {
      return request(app)
          .post("/api/articles/999/comments")
          .send({
            username: "rogersop",
            body: "load of garbage",
          })
          .expect(404)
          .then(({ body }) => {
              const { message } = body;
              expect(message).toBe('Not found');
                          
          });
  });
  test("POST 400: Returns an error with a path of the wrong type", () => {
      return request(app)
        .post("/api/articles/banana/comments")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("bad request");
        });
    });
    test("POST 404: User does not exist", () => {
      return request(app)
        .post("/api/articles/4/comments")
        .send({
          username: "Barry",
          body: "load of garbage",
        })
        .expect(404)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe('Not found');
        });
    }); 
    test("POST 400: Body not of expected standard", () => {
      return request(app)
        .post("/api/articles/4/comments")
        .send({
          username: "rogersop",
          Barry: "load of garbage",
        })
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("bad request");
        });
    }); 
})
describe("/api/articles/:article_id", () => {
  test("PATCH 200: Responds with upddated endpoint json data", () => {
      return request(app)
          .patch("/api/articles/2")
          .send({
            inc_votes: 4
          })
          .expect(200)
          .then(({ body }) => {
            const article = body.article;
                expect(article.article_id).toBe(2);
                expect(article.votes).toBe(4);
                expect(article.title).toBe("Sony Vaio; or, The Laptop");
                expect(article.topic).toBe("mitch");
                expect(article.author).toBe("icellusedkars");
                expect(typeof article.body).toBe("string");
                expect(typeof article.created_at).toBe("string");
                expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
                
                
              });
            });

  test("PATCH 404: Returns an error when patching to an article that doesn't exist", () => {
        return request(app)
          .patch("/api/articles/999/")
          .send({
            inc_votes: 4
          })
          .expect(404)
          .then(({ body }) => {
              const { message } = body;
              expect(message).toBe('Not found');
                          
          });
  });
  test("PATCH 400: Returns an error with a path of the wrong type", () => {
      return request(app)
        .patch("/api/articles/banana")
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("bad request");
        });
    });
    test("PATCH 400: Body not of expected standard", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({
          username: "rogersop",
          Barry: "load of garbage",
        })
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("bad request");
        });
    }); 
  })
describe("/api/comments/:comment_id", () => {
    test("DELETE 204: Deletes the comment with passed id", () => {
        return request(app)
            .delete("/api/comments/3")
            .expect(204);            
    });
    test("DELETE 404: Responds with an error if comment_id does not exist ", () => {
        return request(app)
          .delete("/api/comments/999")
          .expect(404)
          .then(({ body }) => {
            const { message } = body;
            expect(message).toBe("Not found");
          });
      });
    test("DELETE 400: Responds with an error when comment_id is invalid datatype", () => {
        return request(app)
            .delete("/api/comments/banana")
            .expect(400)
            .then(({ body }) => {
                const { message } = body;
                expect(message).toBe('bad request');
                            
            });
    });  
})
describe("/api/users", () => {
  test("GET 200: Responds with endpoint json data", () => {
      return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            const {users} = body;
            users.forEach((user) => {
                expect(typeof user.username).toBe("string");
                expect(typeof user.name).toBe("string");
                expect(typeof user.avatar_url).toBe("string");
              });
            });
  });
  test("GET 404: Returns path not found for an endpoint that does not exist", () => {
      return request(app)
          .get("/api/losers")
          .expect(404)
          .then(({ body }) => {
              const { message } = body;
              expect(message).toBe('Not found');
                          
          });
  });  
})