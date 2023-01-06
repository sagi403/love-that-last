import request from "supertest";
import { app } from "../../../app.js";

it("returns a 404 if no product found", async () => {
  return request(app).get("/api/products").send().expect(404);
});

it("returns a 200 on successfully getting products without providing a query", async () => {
  const cookie = await global.getCookie();

  await request(app).post("/api/products").set("Cookie", cookie).expect(201);

  const response = await request(app).get("/api/products").expect(200);

  expect(response.body.page).toEqual(1);
});

it("returns a 200 on successfully getting products with a query provided", async () => {
  const cookie = await global.getCookie();

  await request(app).post("/api/products").set("Cookie", cookie).expect(201);

  const response = await request(app)
    .get("/api/products?pageNumber=1")
    .expect(200);

  expect(response.body.products.length).toEqual(1);
  expect(response.body.page).toEqual(1);
  expect(response.body.pages).toEqual(1);
});

it("returns a 200 on successfully getting products from the second page", async () => {
  const cookie = await global.getCookie();

  for (let i = 0; i < 12; i++) {
    await request(app).post("/api/products").set("Cookie", cookie).expect(201);
  }

  const response = await request(app)
    .get("/api/products?pageNumber=2")
    .expect(200);

  expect(response.body.products.length).toEqual(2);
  expect(response.body.page).toEqual(2);
  expect(response.body.pages).toEqual(2);
});
