import request from "supertest";
import { app } from "../../../app.js";

it("clears the cookie after logging out", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "asdASD123!",
      name: "test",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/logout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")[0].split(";")[0]).toEqual("session=");
});
