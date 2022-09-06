import express from "express";
import { Op } from "sequelize";
import db from "../database/connect.js";
import { auth, adminAuth } from "../middleware/auth.js";
import { postValidator } from "../middleware/validate.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// get all posts with validation
router.get("/", async (req, res) => {
  const options = {};
  if (req.query.order) {
    options.order = [["title", "DESC"]];
  }

  try {
    const posts = await db.Posts.findAll(options);
    res.json(posts);
  } catch (error) {
    res.status(500).send("Ivyko klaida");
    //  res.sendStatus(500)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id, {
      include: [db.Users, db.Comments],
    });
    res.json(post);
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

// Vienas blogo irasas sus vartotojo informacija
router.get("/user-post/:id", async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id, {
      include: db.Users,
    });
    res.json(post);
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

//

router.post(
  "/",
  adminAuth,
  upload.single("image"),
  postValidator,
  async (req, res) => {
    console.log(req.file);
    if (req.file) {
      req.body.image = "/uploads/" + req.file.filename;
    }
    console.log(req.file);
    try {
      new db.Posts(req.body).save();
      res.send("Post created");
    } catch {
      res.status(500).send("Ivyko klaida");
    }
  }
);

router.put(
  "/edit/:id",
  adminAuth,
  upload.single("image"),
  postValidator,
  async (req, res) => {
    try {
      const post = await db.Posts.findByPk(req.params.id);
      post.update(req.body);
      res.send("Irasas sekmingai atnaujintas PUT metodu");
    } catch {
      res.status(500).send("Ivyko klaida");
    }
  }
);

router.delete("/delete/:id", adminAuth, async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id);
    console.log(req.body);
    post.destroy(req.body);
    res.send("Irasas sekmingai istrintas");
  } catch {
    res.status(500).send("Jūsų sesijos laikas pasibaigė, prisijunkite");
  }
});

// search route

router.get("/search/:keyword", async (req, res) => {
  try {
    const posts = await db.Posts.findAll({
      where: {
        title: {
          [Op.like]: "%" + req.params.keyword + "%",
        },
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).send("Ivyko klaida");
  }
});

router.get("/category/:category", async (req, res) => {
  console.log(req);
  try {
    const posts = await db.Posts.findAll({
      where: {
        category: {
          [Op.eq]: req.params.category,
        },
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).send("Ivyko klaida");
  }
});

// CRUD - Create, read, update, delete
//        POST    GET   PUT     DELETE

export default router;
