import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app.js";
import User from "../../../models/userModel.js";

it("response with 401 if not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app).put(`/api/users/${id}`).expect(401);
});

it("responds with 401 if user is not an admin", async () => {
  const response = await request(app)
    .post("/api/users/register")
    .send({ email: "test1@test.com", password: "asdASD123!", name: "test" })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  const id = new mongoose.Types.ObjectId().toHexString();

  return request(app).put(`/api/users/${id}`).set("Cookie", cookie).expect(401);
});

it("returns a 400 if user id is not validated", async () => {
  const cookie = await global.getCookie();

  return request(app)
    .put(`/api/users/notValidId`)
    .set("Cookie", cookie)
    .expect(400);
});

it("returns a 400 if body fields are not validated", async () => {
  const cookie = await global.getCookie();
  const { id } = await User.findOne({ email: "test@test.com" });

  const email = "new@new.com";
  const name = "NEW NAME";
  const isAdmin = false;

  await request(app)
    .put(`/api/users/${id}`)
    .set("Cookie", cookie)
    .send({ email: "not valid", name, isAdmin })
    .expect(400);

  await request(app)
    .put(`/api/users/${id}`)
    .set("Cookie", cookie)
    .send({ email, name: 123, isAdmin })
    .expect(400);

  await request(app)
    .put(`/api/users/${id}`)
    .set("Cookie", cookie)
    .send({ email, name, isAdmin: "not valid" })
    .expect(400);
});

it("responds with 400 if missing field", async () => {
  const cookie = await global.getCookie();

  const email = "test1@test.com";
  const password = "asdASD123!";
  const name = "test";
  const isAdmin = true;

  await request(app)
    .post("/api/users/register")
    .send({ email, password, name })
    .expect(201);

  const { id } = await User.findOne({ email });

  await request(app)
    .put(`/api/users/${id}`)
    .set("Cookie", cookie)
    .send({ email, name })
    .expect(400);

  await request(app)
    .put(`/api/users/${id}`)
    .set("Cookie", cookie)
    .send({ email, isAdmin })
    .expect(400);

  await request(app)
    .put(`/api/users/${id}`)
    .set("Cookie", cookie)
    .send({ name, isAdmin })
    .expect(400);
});

it("responds with 400 if email already exist", async () => {
  const cookie = await global.getCookie();
  const { id } = await User.findOne({ email: "test@test.com" });
  const email = "test1@test.com";

  await request(app)
    .post("/api/users/register")
    .send({ email, password: "asdASD123!", name: "test" })
    .expect(201);

  await request(app)
    .put(`/api/users/${id}`)
    .set("Cookie", cookie)
    .send({ email, name: "test", isAdmin: true })
    .expect(400);
});

it("responds with 404 if user not found", async () => {
  const cookie = await global.getCookie();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/users/${id}`)
    .set("Cookie", cookie)
    .send({ email: "test@test.com", name: "test", isAdmin: false })
    .expect(404);
});

it("responds with 200 for changing the name successfully", async () => {
  const cookie = await global.getCookie();
  const name = "NEW NAME";
  const email = "test@test.com";
  const { id } = await User.findOne({ email });

  const response = await request(app)
    .put(`/api/users/${id}`)
    .set("Cookie", cookie)
    .send({ email, name, isAdmin: true })
    .expect(200);

  expect(response.body.email).toEqual(email);
  expect(response.body.name).toEqual(name);
  expect(response.body.isAdmin).toEqual(true);
});

it("responds with 200 for changing the user details successfully", async () => {
  const cookie = await global.getCookie();
  const email = "test@test.com";
  const { id } = await User.findOne({ email });

  const newEmail = "new@new.com";
  const newName = "NEW NAME";
  const isAdmin = false;

  const response = await request(app)
    .put(`/api/users/${id}`)
    .set("Cookie", cookie)
    .send({ email: newEmail, name: newName, isAdmin })
    .expect(200);

  expect(response.body.email).toEqual(newEmail);
  expect(response.body.name).toEqual(newName);
  expect(response.body.isAdmin).toEqual(isAdmin);
});
