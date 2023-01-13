import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app.js";
import generateToken from "../../../utils/generateToken.js";

it("returns a 400 when an invalid parameter is provided", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const token = generateToken({});

  await request(app)
    .get(`/api/users/reset-password/notValidId/${token}`)
    .expect(400);

  await request(app)
    .get(`/api/users/reset-password/${id}/notValidToken`)
    .expect(400);
});

it("returns a 404 when the user not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const token = generateToken({});

  await request(app)
    .get(`/api/users/reset-password/${id}/${token}`)
    .expect(404);
});

it("returns a 500 when the token not verify", async () => {
  const token = generateToken({});
  const cookie = await global.getCookie();

  const response = await request(app)
    .get("/api/users/profile")
    .set("Cookie", cookie)
    .expect(200);

  const { id } = response.body;

  await request(app)
    .get(`/api/users/reset-password/${id}/${token}`)
    .expect(500);
});

it("returns a 404 when the user id different from the id in the token", async () => {
  const randomUserId = new mongoose.Types.ObjectId().toHexString();
  const cookie = await global.getCookie();

  const response = await request(app)
    .get("/api/users/profile")
    .set("Cookie", cookie)
    .expect(200);

  const { id } = response.body;
  const token = generateToken({ id });

  await request(app)
    .get(`/api/users/reset-password/${randomUserId}/${token}`)
    .expect(404);
});
