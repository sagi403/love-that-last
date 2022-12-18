import request from "supertest";
import { app } from "../../../app.js";

it("returns a 201 on successful register", async () => {
  return request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "asdASD123!", name: "test" })
    .expect(201);
});

it("returns a 400 with an invalid field", async () => {
  await request(app)
    .post("/api/users/register")
    .send({ email: "test@test", password: "asdASD123!", name: "test" })
    .expect(400);

  await request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "123456", name: "test" })
    .expect(400);

  await request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "asdASD123!", name: "t" })
    .expect(400);
});

it("returns a 400 with a missing field", async () => {
  await request(app)
    .post("/api/users/register")
    .send({ password: "asdASD123!", name: "test" })
    .expect(400);

  await request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", name: "test" })
    .expect(400);

  await request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "asdASD123!" })
    .expect(400);

  await request(app).post("/api/users/register").expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "asdASD123!", name: "test" })
    .expect(201);

  await request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "asdASD123!", name: "test" })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "asdASD123!", name: "test" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
  expect(response.get("Set-Cookie")[0].split(";")[0]).not.toEqual("session=");
});
