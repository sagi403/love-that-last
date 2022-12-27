import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app.js";
import { orderSample } from "../../../test/samples.js";

it("responds with 401 if not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app).get(`/api/orders/${id}`).expect(401);
});

it("responds with 400 if order id is not validated", async () => {
  const cookie = await global.getCookie();

  await request(app)
    .get(`/api/orders/notValid`)
    .set("Cookie", cookie)
    .expect(400);
});

it("responds with 404 if order not found", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/orders/${id}`).set("Cookie", cookie).expect(404);
});

it("responds with 200 for getting the order", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(orderSample)
    .expect(201);

  const id = response.body.id;

  const res = await request(app)
    .get(`/api/orders/${id}`)
    .set("Cookie", cookie)
    .expect(200);

  expect(res.body.orderItems[0].name).toEqual(
    "To My Wife - Blessing In My Life - Necklace"
  );
  expect(res.body.orderItems[0].qty).toEqual(1);
  expect(res.body.orderItems[0].image).toEqual(
    "/images/collection/Blessing_In_My_Life_AB.jpg"
  );
  expect(res.body.orderItems[0].price).toEqual(49.95);
  expect(res.body.orderItems[0].product).toEqual("63a6f1c6ec738ad2f77d8aaa");
  expect(res.body.shippingAddress.address).toEqual("Gordon");
  expect(res.body.shippingAddress.city).toEqual("Tel-Aviv");
  expect(res.body.shippingAddress.postalCode).toEqual("541362");
  expect(res.body.shippingAddress.country).toEqual("Israel");
  expect(res.body.paymentMethod).toEqual("PayPal");
  expect(res.body.itemsPrice).toEqual(49.95);
  expect(res.body.taxPrice).toEqual(0);
  expect(res.body.shippingPrice).toEqual(0);
  expect(res.body.totalPrice).toEqual(49.95);
  expect(res.body.user.name).toEqual("test");
  expect(res.body.user.email).toEqual("test@test.com");
});
