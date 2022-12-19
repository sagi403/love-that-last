import request from "supertest";
import { app } from "../../../app.js";

it("response with 401 if not authenticated", async () => {
  return request(app).put("/api/users/profile").send().expect(401);
});

it("responds with 400 if email already exist", async () => {
  const cookie = await global.getCookie();
  const email = "test1@test.com";

  await request(app)
    .post("/api/users/register")
    .send({ email, password: "asdASD123!", name: "test" })
    .expect(201);

  await request(app)
    .put("/api/users/profile")
    .set("Cookie", cookie)
    .send({ email })
    .expect(400);
});

it("responds with 400 for not providing data", async () => {
  const cookie = await global.getCookie();

  await request(app)
    .put("/api/users/profile")
    .set("Cookie", cookie)
    .send()
    .expect(400);
});

it("responds with 400 for trying to change the admin status", async () => {
  const cookie = await global.getCookie();

  await request(app)
    .put("/api/users/profile")
    .set("Cookie", cookie)
    .send({ isAdmin: true })
    .expect(400);
});

it("responds with 400 for providing invalidated data to change", async () => {
  const cookie = await global.getCookie();

  await request(app)
    .put("/api/users/profile")
    .set("Cookie", cookie)
    .send({ name: "t" })
    .expect(400);

  await request(app)
    .put("/api/users/profile")
    .set("Cookie", cookie)
    .send({ email: "test@test" })
    .expect(400);

  await request(app)
    .put("/api/users/profile")
    .set("Cookie", cookie)
    .send({ password: "123456" })
    .expect(400);
});

it("responds with 200 for changing the email successfully", async () => {
  const cookie = await global.getCookie();
  const email = "test1@test.com";

  const response = await request(app)
    .put("/api/users/profile")
    .set("Cookie", cookie)
    .send({ email })
    .expect(200);

  expect(response.body.email).toEqual(email);
});

it("responds with 200 for changing the password successfully", async () => {
  const cookie = await global.getCookie();

  await request(app)
    .put("/api/users/profile")
    .set("Cookie", cookie)
    .send({ password: "newPASSWORD123!" })
    .expect(200);
});

it("responds with 200 for changing the name successfully", async () => {
  const cookie = await global.getCookie();
  const name = "new name";

  const response = await request(app)
    .put("/api/users/profile")
    .set("Cookie", cookie)
    .send({ name })
    .expect(200);

  expect(response.body.name).toEqual(name);
});

it("responds with 200 for changing all the fields successfully", async () => {
  const cookie = await global.getCookie();
  const email = "test1@test.com";
  const password = "newPASSWORD123!";
  const name = "new name";

  const response = await request(app)
    .put("/api/users/profile")
    .set("Cookie", cookie)
    .send({ email, password, name })
    .expect(200);

  expect(response.body.email).toEqual(email);
  expect(response.body.name).toEqual(name);
});
