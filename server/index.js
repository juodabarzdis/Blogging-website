import express from "express";
import posts from "./controller/posts.js";
import users from "./controller/users.js";
import comments from "./controller/comments.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
// import cookiesMiddleware from "universal-cookie-express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.set("trust proxy", 1); // trust first proxy if 0 then it will not trust any proxy
app.use(
  session({
    name: "session",
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // only send cookie over https if true
      maxAge: 6000000,
    },
  })
);

// app.use(cookiesMiddleware());

app.use("/api/posts/", posts);
app.use("/api/users/", users);
app.use("/api/comments", comments);
app.use("/uploads", express.static("uploads"));

app.listen(3000);
