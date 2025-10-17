/**
 * @jest-environment node
 */

/**
 * @file categories.integration.test.js
 * @description Integration tests for the /categories API endpoint
 * across multiple mount points.
 * These tests cover creating, retrieving, and error handling
 * for category resources.
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
  try {
    await mongoose.connection.db.collection("categories").deleteMany({});
  } catch (e) {
    // ignore if collection does not exist yet
  }
});

describe("Category :id PUT and DELETE across mount points", () => {
  basePaths.forEach((basePath) => {
    describe(basePath + "/:id", () => {
      test("PUT /:id updates the document and returns 200", async () => {
        const created = await request(app)
          .post(basePath)
          .send({ name: "Original" })
          .set("Accept", "application/json");
        expect(created.status).toBe(201);

        const id = created.body._id;
        const updated = await request(app)
          .put(`${basePath}/${id}`)
          .send({ name: "Updated" })
          .set("Accept", "application/json");
        expect(updated.status).toBe(200);
        expect(updated.body).toHaveProperty("_id", id);
        expect(updated.body.name).toBe("Updated");

        // verify GET returns updated
        const res = await request(app).get(`${basePath}/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Updated");
      });

      test("DELETE /:id removes the document and subsequent GET returns 404", async () => {
        const created = await request(app)
          .post(basePath)
          .send({ name: "ToDelete" })
          .set("Accept", "application/json");
        expect(created.status).toBe(201);

        const id = created.body._id;
        const del = await request(app).delete(`${basePath}/${id}`);
        expect(del.status).toBe(200);
        expect(del.body).toHaveProperty("message");

        const resAfter = await request(app).get(`${basePath}/${id}`);
        expect(resAfter.status).toBe(404);
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
