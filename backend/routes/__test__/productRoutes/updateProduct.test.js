import request from "supertest";
import { app } from "../../../app.js";
import mongoose from "mongoose";

const productSample = {
  name: "test",
  image: "/test/test.jpg",
  description: `test test test`,
  longDescription: `test test test test test`,
  brand: "test",
  category: "test",
  price: 49.95,
  beforeSalePrice: 69.95,
  countInStock: 5,
  rating: 5,
  numReviews: 10,
};

it("response with 401 if not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app).put(`/api/products/${id}`).send().expect(401);
});

it("responds with 401 if user is not an admin", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
    .post("/api/users/register")
    .send({ email: "test1@test.com", password: "asdASD123!", name: "test" })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .expect(401);
});

it("returns a 400 if product id is not validated", async () => {
  const cookie = await global.getCookie();

  return request(app)
    .put(`/api/products/notValidId`)
    .set("Cookie", cookie)
    .expect(400);
});

it("returns a 404 if product was not found", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send(productSample)
    .expect(404);
});

it("responds with 400 for not providing data", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .expect(400);
});

it("responds with 400 for providing invalidated data to change", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, name: "a" })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, price: "not number" })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, image: "a" })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, brand: "a" })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, category: "a" })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, countInStock: "not number" })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, description: "a" })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, longDescription: "a" })
    .expect(400);
});

it("responds with 400 for missing a field", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, name: undefined })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, price: undefined })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, image: undefined })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, brand: undefined })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, category: undefined })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, countInStock: undefined })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, description: undefined })
    .expect(400);

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send({ ...productSample, longDescription: undefined })
    .expect(400);
});

it("responds with 200 for updating the product successfully", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .expect(201);

  const id = response.body.id;

  const res = await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .send(productSample)
    .expect(200);

  expect(res.body.name).toEqual("test");
  expect(res.body.image).toEqual("/test/test.jpg");
  expect(res.body.description).toEqual("test test test");
  expect(res.body.longDescription).toEqual("test test test test test");
  expect(res.body.brand).toEqual("test");
  expect(res.body.category).toEqual("test");
  expect(res.body.price).toEqual(49.95);
  expect(res.body.beforeSalePrice).toEqual(69.95);
  expect(res.body.countInStock).toEqual(5);
});
