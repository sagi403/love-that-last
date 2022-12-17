import request from "supertest";
import { app } from "../../app.js";

it("returns a 201 on successful register", async () => {
  return request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "123456", name: "test" })
    .expect(201);
});
