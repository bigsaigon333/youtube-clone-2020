import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";
import path from "path";

console.log(path.resolve(__dirname));

passport.use(User.createStrategy());
passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: `${path.resolve(__dirname)}${routes.githubCallback}`,
			scope: "user:email",
		},
		githubLoginCallback
	)
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
