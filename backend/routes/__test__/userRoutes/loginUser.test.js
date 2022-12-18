import request from "supertest";
import { app } from "../../../app.js";

it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "asdASD123!",
      name: "test",
    })
    .expect(201);

  await request(app)
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      password: "incorrect",
    })
    .expect(400);
});

it("returns a 400 with a missing field", async () => {
  await request(app)
    .post("/api/users/login")
    .send({ email: "test@test.com" })
    .expect(400);

  await request(app)
    .post("/api/users/login")
    .send({ password: "asdASD123!" })
    .expect(400);

  await request(app).post("/api/users/login").send().expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "asdASD123!",
      name: "test",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      password: "asdASD123!",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
  expect(response.get("Set-Cookie")[0].split(";")[0]).not.toEqual("session=");
});
