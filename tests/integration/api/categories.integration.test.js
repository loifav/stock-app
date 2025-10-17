/**
 * @jest-environment node
 */

/**
 * @file categories.integration.test.js
 * @description Integration tests for the categories API endpoints.
 * These tests cover creating, retrieving, and error handling
 * for category resources across multiple mount points.
 */
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server/test-app-mongo");

jest.setTimeout(30000);

const basePaths = [
  "/api/categories",
  "/api/user/category",
  "/categories",
  "/collection/categories",
  "/api/collection/categories",
];

beforeAll(async () => {
  await app.__ready;
});

beforeEach(async () => {
  // clear categories collection between tests if it exists
  try {
    await mongoose.connection.db.collection("categories").deleteMany({});
  } catch (e) {
    // ignore if collection does not exist yet
  }
});

describe("Categories integration (multiple mount points)", () => {
  basePaths.forEach((basePath) => {
    describe(basePath, () => {
      test("POST / creates a category (201) and returns created doc", async () => {
        const res = await request(app)
          .post(basePath)
          .send({ name: "Electronics" })
          .set("Accept", "application/json");
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.name).toBe("Electronics");
      });

      test("GET / returns an array that includes the created category", async () => {
        const created = await request(app)
          .post(basePath)
          .send({ name: "Books" })
          .set("Accept", "application/json");
        expect(created.status).toBe(201);

        const list = await request(app)
          .get(basePath)
          .set("Accept", "application/json");
        expect(list.status).toBe(200);
        expect(Array.isArray(list.body)).toBe(true);
        const found = list.body.find((d) => d._id === created.body._id);
        expect(found).toBeTruthy();
        expect(found.name).toBe("Books");
      });

      test("GET /:id returns the document (200)", async () => {
        const created = await request(app)
          .post(basePath)
          .send({ name: "Toys" })
          .set("Accept", "application/json");
        const id = created.body._id;
        const res = await request(app)
          .get(`${basePath}/${id}`)
          .set("Accept", "application/json");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("_id", id);
        expect(res.body.name).toBe("Toys");
      });

      test("GET /:id with nonexistent id returns 404", async () => {
        const res = await request(app).get(
          `${basePath}/000000000000000000000000`
        );
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message");
      });

      test("POST / without required fields returns 400 and an error message", async () => {
        const res = await request(app)
          .post(basePath)
          .send({})
          .set("Accept", "application/json");
        expect(res.status).toBe(400);
        expect(typeof res.body.message).toBe("string");
        expect(res.body.message.length).toBeGreaterThan(0);
      });
    });
  });
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
  } catch (e) {}
  if (app && typeof app.close === "function") {
    await app.close();
  }
});
