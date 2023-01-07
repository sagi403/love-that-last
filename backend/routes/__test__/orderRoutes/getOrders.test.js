import request from "supertest";
import { app } from "../../../app.js";
import { orderSample } from "../../../test/samples.js";

it("responds with 401 if not authenticated", async () => {
  return request(app).get(`/api/orders`).expect(401);
});

it("responds with 401 if user is not an admin", async () => {
  const response = await request(app)
    .post("/api/users/register")
    .send({ email: "test1@test.com", password: "asdASD123!", name: "test" })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return request(app).get(`/api/orders`).set("Cookie", cookie).expect(401);
});

it("returns a 400 for not providing a validated query", async () => {
  const cookie = await global.getCookie();

  await request(app)
    .get("/api/orders?pageNumber=notValid")
    .set("Cookie", cookie)
    .expect(400);
});

it("responds with 404 if order not found", async () => {
  const cookie = await global.getCookie();

  await request(app).get(`/api/orders`).set("Cookie", cookie).expect(404);
});

it("responds with 200 for getting orders without providing a query", async () => {
  const cookie = await global.getCookie();

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(orderSample)
    .expect(201);

  const response = await request(app)
    .get(`/api/orders`)
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.orders.length).toEqual(1);
  expect(response.body.orders[0].orderItems[0].name).toEqual(
    "To My Wife - Blessing In My Life - Necklace"
  );
  expect(response.body.orders[0].orderItems[0].qty).toEqual(1);
  expect(response.body.orders[0].orderItems[0].image).toEqual(
    "/images/collection/Blessing_In_My_Life_AB.jpg"
  );
  expect(response.body.orders[0].orderItems[0].price).toEqual(49.95);
  expect(response.body.orders[0].orderItems[0].product).toEqual(
    "63a6f1c6ec738ad2f77d8aaa"
  );
  expect(response.body.orders[0].shippingAddress.address).toEqual("Gordon");
  expect(response.body.orders[0].shippingAddress.city).toEqual("Tel-Aviv");
  expect(response.body.orders[0].shippingAddress.postalCode).toEqual("541362");
  expect(response.body.orders[0].shippingAddress.country).toEqual("Israel");
  expect(response.body.orders[0].paymentMethod).toEqual("PayPal");
  expect(response.body.orders[0].itemsPrice).toEqual(49.95);
  expect(response.body.orders[0].taxPrice).toEqual(0);
  expect(response.body.orders[0].shippingPrice).toEqual(0);
  expect(response.body.orders[0].totalPrice).toEqual(49.95);
  expect(response.body.page).toEqual(1);
  expect(response.body.pages).toEqual(1);
});

it("responds with 200 for successfully getting orders with a query provided", async () => {
  const cookie = await global.getCookie();

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(orderSample)
    .expect(201);

  const response = await request(app)
    .get(`/api/orders?pageNumber=1`)
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.orders.length).toEqual(1);
  expect(response.body.orders[0].orderItems[0].name).toEqual(
    "To My Wife - Blessing In My Life - Necklace"
  );
  expect(response.body.orders[0].orderItems[0].qty).toEqual(1);
  expect(response.body.orders[0].orderItems[0].image).toEqual(
    "/images/collection/Blessing_In_My_Life_AB.jpg"
  );
  expect(response.body.orders[0].orderItems[0].price).toEqual(49.95);
  expect(response.body.orders[0].orderItems[0].product).toEqual(
    "63a6f1c6ec738ad2f77d8aaa"
  );
  expect(response.body.orders[0].shippingAddress.address).toEqual("Gordon");
  expect(response.body.orders[0].shippingAddress.city).toEqual("Tel-Aviv");
  expect(response.body.orders[0].shippingAddress.postalCode).toEqual("541362");
  expect(response.body.orders[0].shippingAddress.country).toEqual("Israel");
  expect(response.body.orders[0].paymentMethod).toEqual("PayPal");
  expect(response.body.orders[0].itemsPrice).toEqual(49.95);
  expect(response.body.orders[0].taxPrice).toEqual(0);
  expect(response.body.orders[0].shippingPrice).toEqual(0);
  expect(response.body.orders[0].totalPrice).toEqual(49.95);
  expect(response.body.page).toEqual(1);
  expect(response.body.pages).toEqual(1);
});

it("responds with 200 for successfully getting orders from the second page", async () => {
  const cookie = await global.getCookie();

  for (let i = 0; i < 12; i++) {
    await request(app)
      .post(`/api/orders`)
      .set("Cookie", cookie)
      .send(orderSample)
      .expect(201);
  }

  const response = await request(app)
    .get(`/api/orders?pageNumber=2`)
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.orders.length).toEqual(2);
  expect(response.body.page).toEqual(2);
  expect(response.body.pages).toEqual(2);
});
