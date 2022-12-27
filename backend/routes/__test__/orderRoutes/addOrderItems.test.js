import request from "supertest";
import { app } from "../../../app.js";

const orderSample = {
  orderItems: [
    {
      name: "To My Wife - Blessing In My Life - Necklace",
      qty: 1,
      image: "/images/collection/Blessing_In_My_Life_AB.jpg",
      price: 49.95,
      product: "63a6f1c6ec738ad2f77d8aaa",
    },
  ],
  shippingAddress: {
    address: "Gordon",
    city: "Tel-Aviv",
    postalCode: "541362",
    country: "Israel",
  },
  paymentMethod: "PayPal",
  itemsPrice: 49.95,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 49.95,
};

it("responds with 401 if not authenticated", async () => {
  return request(app).post(`/api/orders`).send().expect(401);
});

it("responds with 400 for not providing data", async () => {
  const cookie = await global.getCookie();

  await request(app).post(`/api/orders`).set("Cookie", cookie).expect(400);
});

it("responds with 400 for providing invalidated data", async () => {
  const cookie = await global.getCookie();
  let order = JSON.parse(JSON.stringify(orderSample));

  order.orderItems[0].name = 1;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.orderItems[0].qty = "not valid";
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.orderItems[0].image = 1;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.orderItems[0].price = "not valid";
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.orderItems[0].product = 1;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.shippingAddress.address = 1;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.shippingAddress.city = 1;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.shippingAddress.postalCode = 1;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.shippingAddress.country = 1;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send({ ...orderSample, paymentMethod: 1 })
    .expect(400);

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send({ ...orderSample, itemsPrice: "not valid" })
    .expect(400);

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send({ ...orderSample, taxPrice: "not valid" })
    .expect(400);

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send({ ...orderSample, shippingPrice: "not valid" })
    .expect(400);

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send({ ...orderSample, totalPrice: "not valid" })
    .expect(400);
});

it("responds with 400 for missing a field", async () => {
  const cookie = await global.getCookie();
  let order = JSON.parse(JSON.stringify(orderSample));

  order.orderItems[0].name = undefined;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.orderItems[0].qty = undefined;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.orderItems[0].image = undefined;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.orderItems[0].price = undefined;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.orderItems[0].product = undefined;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.shippingAddress.address = undefined;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.shippingAddress.city = undefined;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.shippingAddress.postalCode = undefined;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  order = JSON.parse(JSON.stringify(orderSample));
  order.shippingAddress.country = undefined;
  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(order)
    .expect(400);

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send({ ...orderSample, paymentMethod: undefined })
    .expect(400);

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send({ ...orderSample, itemsPrice: undefined })
    .expect(400);

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send({ ...orderSample, taxPrice: undefined })
    .expect(400);

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send({ ...orderSample, shippingPrice: undefined })
    .expect(400);

  await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send({ ...orderSample, totalPrice: undefined })
    .expect(400);
});

it("responds with 200 for creating new order", async () => {
  const cookie = await global.getCookie();

  const res = await request(app)
    .post(`/api/orders`)
    .set("Cookie", cookie)
    .send(orderSample)
    .expect(201);

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
});
