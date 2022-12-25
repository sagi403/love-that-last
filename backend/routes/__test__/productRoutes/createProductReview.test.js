import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app.js";

it("responds with 401 if not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app).post(`/api/products/${id}/reviews`).send().expect(401);
});

it("returns a 400 if product id is not validated", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post(`/api/products/notValidId/reviews`)
    .set("Cookie", cookie)
    .expect(400);

  await request(app)
    .post(`/api/products/${id}/reviews`)
    .set("Cookie", cookie)
    .send({ rating: 4.5, comment: "a" })
    .expect(400);

  await request(app)
    .post(`/api/products/${id}/reviews`)
    .set("Cookie", cookie)
    .send({ rating: "a", comment: "test" })
    .expect(400);
});

it("responds with 400 for not providing data or missing data", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post(`/api/products/${id}/reviews`)
    .set("Cookie", cookie)
    .expect(400);

  await request(app)
    .post(`/api/products/${id}/reviews`)
    .set("Cookie", cookie)
    .send({ rating: 4.5 })
    .expect(400);

  await request(app)
    .post(`/api/products/${id}/reviews`)
    .set("Cookie", cookie)
    .send({ comment: "test" })
    .expect(400);
});

it("returns a 404 if product was not found", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app)
    .post(`/api/products/${id}/reviews`)
    .set("Cookie", cookie)
    .send({ rating: 4.5, comment: "test" })
    .expect(404);
});

it("returns a 400 if reviewing the same product twice", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .expect(201);

  const id = response.body.id;

  await request(app)
    .post(`/api/products/${id}/reviews`)
    .set("Cookie", cookie)
    .send({ rating: 4.5, comment: "test" })
    .expect(201);

  await request(app)
    .post(`/api/products/${id}/reviews`)
    .set("Cookie", cookie)
    .send({ rating: 5, comment: "test test" })
    .expect(400);
});

it("returns a 201 if successfully reviewing a product", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .expect(201);

  const id = response.body.id;

  await request(app)
    .post(`/api/products/${id}/reviews`)
    .set("Cookie", cookie)
    .send({ rating: 4.5, comment: "test" })
    .expect(201);
});
