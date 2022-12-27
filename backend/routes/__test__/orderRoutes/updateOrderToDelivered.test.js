import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app.js";
import { orderSample } from "../../../test/samples.js";

it("responds with 401 if not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app).put(`/api/orders/${id}/deliver`).expect(401);
});

it("responds with 401 if user is not an admin", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
    .post("/api/users/register")
    .send({ email: "test1@test.com", password: "asdASD123!", name: "test" })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return request(app)
    .put(`/api/orders/${id}/deliver`)
    .set("Cookie", cookie)
    .expect(401);
});

it("responds with 400 if order id is not validated", async () => {
  const cookie = await global.getCookie();

  await request(app)
    .put(`/api/orders/notValid/deliver`)
    .set("Cookie", cookie)
    .expect(400);
});

it("responds with 404 if order not found", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/orders/${id}/deliver`)
    .set("Cookie", cookie)
    .expect(404);
});

it("responds with 200 for updating order to delivered", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(orderSample)
    .expect(201);

  const id = response.body.id;

  const res = await request(app)
    .put(`/api/orders/${id}/deliver`)
    .set("Cookie", cookie)
    .expect(200);

  expect(res.body.isDelivered).toEqual(true);
  expect(res.body.deliveredAt).toBeDefined();
});
