import request from "supertest";
import { app } from "../../../app.js";

it("returns a 404 if no product found", async () => {
  return request(app).get("/api/products").send().expect(404);
});

it("returns a 201 on successfully getting products", async () => {
  const cookie = await global.getCookie();

  await request(app).post("/api/products").set("Cookie", cookie).expect(201);

  await request(app).get("/api/products").expect(200);
});
