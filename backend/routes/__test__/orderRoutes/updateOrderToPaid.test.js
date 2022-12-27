import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app.js";
import { orderSample, paymentResult } from "../../../test/samples.js";

it("responds with 401 if not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app).put(`/api/orders/${id}/pay`).expect(401);
});

it("responds with 400 if order id is not validated", async () => {
  const cookie = await global.getCookie();

  await request(app)
    .put(`/api/orders/notValid/pay`)
    .set("Cookie", cookie)
    .expect(400);
});

it("responds with 400 for providing invalidated data", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(orderSample)
    .expect(201);

  const id = response.body.id;

  await request(app)
    .put(`/api/orders/${id}/pay`)
    .set("Cookie", cookie)
    .send({ ...paymentResult, id: 1 })
    .expect(400);

  await request(app)
    .put(`/api/orders/${id}/pay`)
    .set("Cookie", cookie)
    .send({ ...paymentResult, status: 1 })
    .expect(400);

  await request(app)
    .put(`/api/orders/${id}/pay`)
    .set("Cookie", cookie)
    .send({ ...paymentResult, update_time: 1 })
    .expect(400);

  await request(app)
    .put(`/api/orders/${id}/pay`)
    .set("Cookie", cookie)
    .send({ ...paymentResult, email_address: 1 })
    .expect(400);
});

it("responds with 400 for not providing data", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", cookie)
    .expect(400);
});

it("responds with 400 for missing a field", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(orderSample)
    .expect(201);

  const id = response.body.id;

  await request(app)
    .put(`/api/orders/${id}/pay`)
    .set("Cookie", cookie)
    .send({ ...paymentResult, id: undefined })
    .expect(400);

  await request(app)
    .put(`/api/orders/${id}/pay`)
    .set("Cookie", cookie)
    .send({ ...paymentResult, status: undefined })
    .expect(400);

  await request(app)
    .put(`/api/orders/${id}/pay`)
    .set("Cookie", cookie)
    .send({ ...paymentResult, update_time: undefined })
    .expect(400);

  await request(app)
    .put(`/api/orders/${id}/pay`)
    .set("Cookie", cookie)
    .send({ ...paymentResult, email_address: undefined })
    .expect(400);
});

it("responds with 404 if order not found", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/orders/${id}/pay`)
    .set("Cookie", cookie)
    .send(paymentResult)
    .expect(404);
});

it("responds with 200 for updating order to paid", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(orderSample)
    .expect(201);

  const id = response.body.id;

  const res = await request(app)
    .put(`/api/orders/${id}/pay`)
    .set("Cookie", cookie)
    .send(paymentResult)
    .expect(200);

  expect(res.body.paymentResult.id).toEqual("fds4y65j768j65g4");
  expect(res.body.paymentResult.status).toEqual("Paid");
  expect(res.body.paymentResult.update_time).toEqual("27/12/2022");
  expect(res.body.paymentResult.email_address).toEqual("admin@example.com");
});
