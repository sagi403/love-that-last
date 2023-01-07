import request from "supertest";
import { app } from "../../../app.js";

it("responds with 401 if not authenticated", async () => {
  return request(app).get("/api/users").send().expect(401);
});

it("responds with 401 if user is not an admin", async () => {
  const response = await request(app)
    .post("/api/users/register")
    .send({ email: "test1@test.com", password: "asdASD123!", name: "test" })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return request(app).get("/api/users").set("Cookie", cookie).expect(401);
});

it("returns a 400 for not providing a validated query", async () => {
  const cookie = await global.getCookie();

  return request(app)
    .get("/api/users?pageNumber=notValid")
    .set("Cookie", cookie)
    .expect(400);
});

it("responds with 200 for successfully getting users without providing a query", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .get("/api/users")
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.users.length).toEqual(1);
  expect(response.body.page).toEqual(1);
  expect(response.body.pages).toEqual(1);
});

it("responds with 200 for successfully getting users with a query provided", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .get("/api/users?pageNumber=1")
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.users.length).toEqual(1);
  expect(response.body.page).toEqual(1);
  expect(response.body.pages).toEqual(1);
});

it("responds with 200 for successfully getting users from the second page", async () => {
  const cookie = await global.getCookie();

  for (let i = 0; i < 12; i++) {
    await request(app)
      .post("/api/users/register")
      .send({
        email: `test${i}@test.com`,
        password: "asdASD123!",
        name: "test",
      })
      .expect(201);
  }

  const response = await request(app)
    .get("/api/users?pageNumber=2")
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.users.length).toEqual(3);
  expect(response.body.page).toEqual(2);
  expect(response.body.pages).toEqual(2);
});
