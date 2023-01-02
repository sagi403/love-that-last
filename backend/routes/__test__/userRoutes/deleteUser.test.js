import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app.js";
import User from "../../../models/userModel.js";

it("response with 401 if not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app).delete(`/api/users/${id}`).expect(401);
});

it("responds with 401 if user is not an admin", async () => {
  const response = await request(app)
    .post("/api/users/register")
    .send({ email: "test1@test.com", password: "asdASD123!", name: "test" })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app)
    .delete(`/api/users/${id}`)
    .set("Cookie", cookie)
    .expect(401);
});

it("returns a 400 if user id is not validated", async () => {
  const cookie = await global.getCookie();

  return request(app)
    .delete(`/api/users/notValidId`)
    .set("Cookie", cookie)
    .expect(400);
});

it("returns a 404 if user was not found", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app)
    .delete(`/api/users/${id}`)
    .set("Cookie", cookie)
    .expect(404);
});

it("returns a 200 for deleting a user", async () => {
  const cookie = await global.getCookie();
  const email = "test1@test.com";
  const password = "asdASD123!";
  const name = "test123";

  await request(app)
    .post("/api/users/register")
    .send({ email, password, name })
    .expect(201);

  const { id } = await User.findOne({ email });

  const res = await request(app)
    .delete(`/api/users/${id}`)
    .set("Cookie", cookie)
    .expect(200);

  expect(res.body.message).toEqual("User removed");
});
