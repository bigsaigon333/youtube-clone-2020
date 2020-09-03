import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import { deliverRoutes, onlyPrivate } from "./middlewares";
import routes from "./routes";
import "./passport.js";

const app = express();

const CookieStore = MongoStore(session);

// app.use(helmet());
app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.use(cookieParser());
app.use("/static", express.static("static"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
console.log("secret: ", process.env.COOKIE_SECRET);
app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: true,
		saveUninitialized: false,
		store: new CookieStore({ mongooseConnection: mongoose.connection }),
		// cookie: { secure: true },
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static("uploads"));
app.use(deliverRoutes);

app.use(routes.home, globalRouter);
app.use(routes.users, onlyPrivate, userRouter);
app.use(routes.videos, videoRouter);

export default app;
