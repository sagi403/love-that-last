import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app.js";
import User from "../models/userModel.js";

let mongo;
beforeAll(async () => {
  process.env.JWT_KEY = "9h34hgu5423i94gv2i0m54un8h";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

global.getCookie = async () => {
  const email = "test@test.com";
  const password = "asdASD123!";
  const name = "test";

  const response = await request(app)
    .post("/api/users/register")
    .send({ email, password, name })
    .expect(201);

  const user = await User.findOne({ email });
  user.isAdmin = true;
  await user.save();

  const cookie = response.get("Set-Cookie");

  return cookie;
};
