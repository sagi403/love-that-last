import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app.js";

it("responds with 401 if not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app).delete(`/api/products/${id}`).send().expect(401);
});

it("responds with 401 if user is not an admin", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
    .post("/api/users/register")
    .send({ email: "test1@test.com", password: "asdASD123!", name: "test" })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return request(app)
    .delete(`/api/products/${id}`)
    .set("Cookie", cookie)
    .expect(401);
});

it("responds with 400 if product id is not validated", async () => {
  const cookie = await global.getCookie();

  return request(app)
    .delete(`/api/products/notValidId`)
    .set("Cookie", cookie)
    .expect(400);
});

it("responds with 404 if product is not found", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app)
    .delete(`/api/products/${id}`)
    .set("Cookie", cookie)
    .expect(404);
});

it("responds with 200 if successfully removing a product", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .expect(201);

  const id = response.body.id;

  await request(app)
    .delete(`/api/products/${id}`)
    .set("Cookie", cookie)
    .expect(200);
});
