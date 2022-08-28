import express from "express";
import db from "../database/connect.js";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;

router.post("/register", async (req, res) => {
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

// router.post("/login"),
//   async (req, res) => {
//     try {
//       const user = db.Users.findOne({
//         where: { email: req.body.email },
//       });
//       if (!user) {
//         return res.status(401).send("User not found");
//       }

//       if (await bcrypt.compare(req.body.password, user.password)) {
//         req.session.loggedIn = true;
//         res.send("User lsogged in");
//       } else {
//         res.status(401).send("Wrong password");
//       }
//     } catch (err) {
//       res.status(400).send("Login failed");
//     }
//   };

router.post("/login", async (req, res) => {
  try {
    const user = await db.Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (user.length === 0) {
      console.log("user not found");
      return res.status(400).json("User not found");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user[0].dataValues.password
    );
    if (validPassword) {
      req.session.user = {
        loggedIn: true,
        userId: user[0].dataValues.id,
        user: user[0].dataValues.username,
      };

      console.log(req.session);
      return res.json({
        message: "User logged in",
        user,
        session: req.session,
      });
    } else console.log("User not logged");
  } catch {
    res.status(500).send("Ivyko klaida");
  }
});

export default router;
