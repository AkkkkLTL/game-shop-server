import request from "supertest";
import { App } from "@/app";
import { MessageRoute } from "@routes/messages.route";

const app = new App([new MessageRoute()]).getServer();


test("message route works", done => {
  request(app)
    .get("/messages")
    .expect("Content-Type", /json/)
    .expect({text: "frodo"})
    .expect(200, done);
});

test("testing route works", done => {
  request(app)
    .post("/messages")
    .type("form")
    .send({item: "hey"})
    .then(() => {
      request(app)
        .get("/test")
        .expect({array: ["hey"]}, done);
    });
});