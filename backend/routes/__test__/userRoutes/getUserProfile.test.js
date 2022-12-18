import request from "supertest";
import { app } from "../../../app.js";

it("responds with details about the current user", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .get("/api/users/profile")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.email).toEqual("test@test.com");
});

it("responds with 401 if not authenticated", async () => {
  return request(app).get("/api/users/profile").send().expect(401);
});
