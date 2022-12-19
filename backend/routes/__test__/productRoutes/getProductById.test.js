import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app.js";

it("returns a 404 if no product found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app).get(`/api/products/${id}`).send().expect(404);
});

it("returns a 400 if product id is not validated", async () => {
  return request(app).get(`/api/products/notValidId`).send().expect(400);
});

it("returns a 200 on successfully getting a product", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .expect(201);

  const id = response.body.id;

  await request(app).get(`/api/products/${id}`).expect(200);
});
