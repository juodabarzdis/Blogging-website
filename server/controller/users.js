import express from "express";
import db from "../database/connect.js";
import bcrypt from "bcrypt";
import { registerValidator, loginValidator } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
const saltRounds = 10;

router.post("/register", registerValidator, async (req, res) => {
  try {
    const userExists = await db.Users.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      res.status(400).send("User already exists");
      return;
    }
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    new db.Users({
      username,
      email,
      password: hashedPassword,
    }).save();
    res.json({ message: "User created" });
  } catch {
    res.status(400).send("Registracija nepavyko");
  }
});

router.post("/login", loginValidator, async (req, res) => {
  try {
    const user = await db.Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user.length === 0) {
      console.log("user not found");
      return res.status(400).send("User not found");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );
    if (validPassword) {
      req.session.loggedIn = true;
      req.session.user = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      };
      console.log(req.session.user);
      return res.json(req.session.user);
    } else console.log("User not logged");
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("User logged out");
});

router.get("/check-auth", auth, async (req, res) => {
  console.log(req.session.user);
  return res.json(req.session.user);
});

router.get("/all-posts/:userid", async (req, res) => {
  try {
    const user = await db.Users.findByPk(req.params.userid, {
      include: db.Posts,
    });
    res.json(user);
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

export default router;
