import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
	logout,
	getJoin,
	postJoin,
	getLogin,
	postLogin,
	postGithubLogin,
	getMe,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.join, onlyPublic, getJoin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.github, passport.authenticate("github"));
globalRouter.get(
	routes.githubCallback,
	passport.authenticate("github", {
		failureRedirect: routes.login,
	}),
	postGithubLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
