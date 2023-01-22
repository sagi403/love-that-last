import request from "supertest";
import { app } from "../../../app.js";

it("returns a 400 when a invalid email is provided", async () => {
  return request(app)
    .post("/api/users/forgot-password")
    .send({
      email: "notValid",
    })
    .expect(400);
});

it("returns a 404 when a email that does not exist is supplied", async () => {
  return request(app)
    .post("/api/users/forgot-password")
    .send({
      email: "notExist@test.com",
    })
    .expect(404);
});

it("successfully generated a link to reset password", async () => {
  await global.getCookie();

  const response = await request(app)
    .post("/api/users/forgot-password")
    .send({
      email: "test@test.com",
    })
    .expect(200);

  expect(response.body.message).toEqual(
    "Check your email for a password reset link"
  );
});
