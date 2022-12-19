import request from "supertest";
import { app } from "../../../app.js";

it("responds with 401 if not authenticated", async () => {
  return request(app).post("/api/products").send().expect(401);
});

it("responds with 401 if user is not an admin", async () => {
  const response = await request(app)
    .post("/api/users/register")
    .send({ email: "test1@test.com", password: "asdASD123!", name: "test" })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return request(app).post("/api/products").set("Cookie", cookie).expect(401);
});

it("responds with 201 if successfully created a product", async () => {
  const cookie = await global.getCookie();

  return request(app).post("/api/products").set("Cookie", cookie).expect(201);
});
