const request = require("supertest");
const app = require("../app");

const userPasswordTest = {
  email: "user@test.com",
  password: "password123",
  confirm_password: "password",
};

const userTest = {
  email: "user@test.com",
  password: "password123",
  confirm_password: "password123",
};

const truncate = require("../utils/truncate");
truncate.user();

// Register Berhasil
describe("POST /auth/register", () => {
  test("Register Berhasil", async () => {
    try {
      const res = await request(app).post("/auth/register").send(userTest);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Register Success!");
      expect(res.body.data).toStrictEqual({
        email: userTest.email,
      });
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Register Gagal User Already Exist
describe("POST /auth/register", () => {
  test("Register Gagal Email Already Used", async () => {
    try {
      const res = await request(app).post("/auth/register").send(userTest);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Email already used!");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Register Gagal Password doesn't match
describe("POST /auth/register", () => {
  test("Register Gagal Password Doesn't Match", async () => {
    try {
      const res = await request(app)
        .post("/auth/register")
        .send(userPasswordTest);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Password doesn't match!");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});
