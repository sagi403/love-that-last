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

it("responds with 200 if user is admin", async () => {
  const cookie = await global.getCookie();

  return request(app).get("/api/users").set("Cookie", cookie).expect(200);
});
