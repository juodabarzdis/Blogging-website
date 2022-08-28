import express from "express";
import db from "../database/connect.js";

const router = express.Router();

// get all posts with validation
router.get("/", async (req, res) => {
  try {
    const posts = await db.Posts.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Ivyko klaida");
    //  res.sendStatus(500)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id);
    res.json(post);
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

router.post("/", async (req, res) => {
  try {
    new db.Posts(req.body).save();
    res.json({ message: "Post created" });
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id);
    post.update(req.body);
    res.json({ message: "Irasas sekmingai atnaujintas PUT metodu" });
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id);
    post.destroy(req.body);
    res.json({ message: "Irasas sekmingai istrintas" });
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

// CRUD - Create, read, update, delete
//        POST    GET   PUT     DELETE

export default router;
