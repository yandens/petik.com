const request = require("supertest");
const app = require("../app");

const truncate = require("./utils/truncate");
truncate.user();
truncate.avatar();

var token = "";

// Register Berhasil
describe("POST /auth/register", () => {
  test("Register Berhasil", async () => {
    try {
      const res = await request(app).post("/auth/register").send({
        email: "rarjen57@gmail.com",
        password: "qwerty123",
        confirm_password: "qwerty123",
      });
      //   console.log(res.email);
      avatar = res.body.data.avatar;
      email = res.body.data.email;

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Register Success!");
      expect(res.body.data).toStrictEqual({
        email: email,
        avatar: avatar,
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
      const res = await request(app).post("/auth/register").send({
        email: "rarjen57@gmail.com",
        password: "qwerty123",
        confirm_password: "qwerty123",
      });

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
      const res = await request(app).post("/auth/register").send({
        email: "rarjen57@gmail.com",
        password: "qwerty123",
        confirm_password: "qwerty1231",
      });

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

// Register Gagal Email not valid
describe("POST /auth/register", () => {
  test("Register Gagal Email Not Valid", async () => {
    try {
      const res = await request(app).post("/auth/register").send({
        email: "rarjen57gmail.com",
        password: "qwerty123",
        confirm_password: "qwerty1231",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        "Email not valid / Password at least 6 characters"
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Register Gagal Password not valid
describe("POST /auth/register", () => {
  test("Register Gagal Password Not Valid", async () => {
    try {
      const res = await request(app).post("/auth/register").send({
        email: "otnielkevin.ok@gmail.com",
        password: "qwe",
        confirm_password: "qwe",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        "Email not valid / Password at least 6 characters"
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Login Gagal Email Not Valid
describe("POST /auth/login", () => {
  test("Login Gagal Email Not Valid", async () => {
    try {
      const res = await request(app).post("/auth/login").send({
        email: "rarjen57gmail.com",
        password: "qwerty123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Email not valid!");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Login Gagal user doesn't exist
describe("POST /auth/login", () => {
  test("Login Gagal User doesn't exist", async () => {
    try {
      const res = await request(app).post("/auth/login").send({
        email: "otnielkevin.ok@gmail.com",
        password: "qwerty123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Wrong email or password!");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Login Gagal Email not verified
describe("POST /auth/login", () => {
  test("Login Gagal User email not verified", async () => {
    try {
      const res = await request(app).post("/auth/login").send({
        email: "rarjen57@gmail.com",
        password: "qwerty123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Email not verifed!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Verify Email Gagal invalid token
// describe("POST /auth/verify", () => {
//   test.failing("Verification Email Gagal Invalid Token", async () => {
//     try {
//       const res = await request(app).get(
//         `/auth/verify?token=${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhcmplbjU3QGdtYWlsLmNvbSIsImlhdCI6MTY2OTk2MjIxMiwiZXhwIjoxNjY5OTYzMTEyfQ.E4Kf9PEVkNosuKGmSA5uD1t0TskDwQhw00dGjpmMg-A"}`
//       );

//       expect(res.statusCode).toBe(401);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(false);
//       expect(res.body.message).toBe("Invalid token!");
//     } catch (error) {
//       expect(error).toBe("error");
//     }
//   });
// });

// Verify Email Berhasil
describe("POST /auth/verify", () => {
  test("Verification Email Berhasil", async () => {
    try {
      const res = await request(app).get(
        `/auth/verify?token=${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhcmplbjU3QGdtYWlsLmNvbSIsImlhdCI6MTY2OTk2NzMyOH0.dCYYO-zX-Py8wrLrkcKpOe3RIXJoRqBsSeTrmUDcJIY"}`
      );

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Email Verified!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Login Berhasil
describe("POST /auth/login", () => {
  test("Login Berhasil", async () => {
    try {
      const res = await request(app).post("/auth/login").send({
        email: "rarjen57@gmail.com",
        password: "qwerty123",
      });
      token = res.body.data.token;
      const email = res.body.data.email;

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("login success!");
      expect(res.body.data).toStrictEqual({
        email,
        token: token,
      });
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Change password gagal must be 6 characters
describe("PUT /auth/change-password", () => {
  test("Ganti Password Gagal invalid format", async () => {
    try {
      const res = await request(app)
        .put("/auth/change-password")
        .set({ Authorization: `${"bearer " + token}` })
        .send({
          oldPassword: "qwe",
          newPassword: "qwer",
          confirmNewPassword: "qwer",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Password at least 6 characters");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Change password gagal password doesn't match
describe("PUT /auth/change-password", () => {
  test("Ganti Password Gagal password doesn't match", async () => {
    try {
      const res = await request(app)
        .put("/auth/change-password")
        .set({ Authorization: `${"bearer " + token}` })
        .send({
          oldPassword: "qwerty123",
          newPassword: "leinto77",
          confirmNewPassword: "leinto777",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Password Doesn't Match");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Change password gagal old password doesn't match
describe("PUT /auth/change-password", () => {
  test("Ganti Password Gagal old password doesn't match", async () => {
    try {
      const res = await request(app)
        .put("/auth/change-password")
        .set({ Authorization: `${"bearer " + token}` })
        .send({
          oldPassword: "qwerty1231",
          newPassword: "leinto777",
          confirmNewPassword: "leinto777",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Old Password Doesn't Match!");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Change Password berhasil
describe("PUT /auth/change-password", () => {
  test("Ganti Password Gagal old password doesn't match", async () => {
    try {
      const res = await request(app)
        .put("/auth/change-password")
        .set({ Authorization: `${"bearer " + token}` })
        .send({
          oldPassword: "qwerty123",
          newPassword: "leinto777",
          confirmNewPassword: "leinto777",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Password Updated!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Forgot Password Gagal Email Not Valid
describe("POST /auth/forgot-password", () => {
  test("Forgot Password Gagal Email Not Valid", async () => {
    try {
      const res = await request(app).post("/auth/forgot-password").send({
        email: "rarjen57gmail.com",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Email not valid!");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Forgot Password Gagal Email Not found
describe("POST /auth/forgot-password", () => {
  test("Forgot Password Berhasil", async () => {
    try {
      const res = await request(app).post("/auth/forgot-password").send({
        email: "otnielkevin.ok@gmail.com",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Email not found");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// Login Google Gagal Email Used
