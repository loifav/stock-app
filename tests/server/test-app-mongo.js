/**
 * @jest-environment node
 */

/**
 * @file test-app-mongo.js
 * @description Express app configured to use an in-memory MongoDB instance
 * for integration testing purposes.
 * This app exposes category routes across multiple mount points.
 */

const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();
app.use(express.json());

// readiness promise so tests can await DB connection
let readyResolve;
app.__ready = new Promise((resolve) => (readyResolve = resolve));

(async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);

  app.locals.__MONGOD = mongod;

  // try to load your real model, fallback to a simple model
  let Category;
  try {
    Category = require("@/models/category");
    Category = Category && (Category.default || Category);
  } catch (e) {
    const { Schema } = mongoose;
    const schema = new Schema(
      { name: { type: String, required: true } },
      { timestamps: true }
    );
    Category = mongoose.models.Category || mongoose.model("Category", schema);
  }

  const router = express.Router();

  router.get("/", async (req, res) => {
    const docs = await Category.find().lean();
    res.status(200).json(docs);
  });

  router.post("/", async (req, res) => {
    try {
      const doc = await Category.create(req.body);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const doc = await Category.findById(req.params.id).lean();
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.status(200).json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // add PUT and DELETE handlers for id operations
  router.put("/:id", async (req, res) => {
    try {
      const doc = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).lean();
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.status(200).json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const doc = await Category.findByIdAndDelete(req.params.id).lean();
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Deleted", _id: doc._id });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  [
    "/api/categories",
    "/api/user/category",
    "/categories",
    "/collection/categories",
    "/api/collection/categories",
  ].forEach((p) => app.use(p, router));

  // signal that DB & models are ready
  readyResolve();
})();

module.exports = app;

afterAll(async () => {
  if (app && app.locals && app.locals.__MONGOD) {
    await require("mongoose").disconnect();
    await app.locals.__MONGOD.stop();
  }
});
