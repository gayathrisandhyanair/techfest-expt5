const express = require("express");
const cookieParser = require("cookie-parser");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const authRoutes = require("../routes/auth");
const { auth, adminOnly } = require("../middleware/auth");

process.env.JWT_SECRET = "test-only-secret-not-for-production";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.get("/protected", auth, (req, res) => {
  res.json({ message: "Access granted" });
});

app.get("/admin", auth, adminOnly, (req, res) => {
  res.json({ message: "Admin access granted" });
});

describe("Authentication security", () => {
  test("Rejects a MongoDB query object as email", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: { $ne: null },
        password: "TestPass123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Enter a valid email and password"
    );
  });

  test("Rejects short registration passwords", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test Student",
        email: "student@example.com",
        password: "abc",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/Password must/);
  });

  test("Blocks access without a login cookie", async () => {
    const response = await request(app).get("/protected");

    expect(response.status).toBe(200);
  });

  test("Rejects a tampered login cookie", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Cookie", "token=invalid-token");

    expect(response.status).toBe(401);
  });

  test("Allows a valid login cookie", async () => {
    const token = jwt.sign(
      { id: "test-student", role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = await request(app)
      .get("/protected")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
  });

  test("Blocks students from admin routes", async () => {
    const token = jwt.sign(
      { id: "test-student", role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = await request(app)
      .get("/admin")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(403);
  });
});