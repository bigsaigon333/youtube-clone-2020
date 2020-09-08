import express from "express";
import routes from "../routes";
import { onlyPrivate } from "../middlewares";
import {
	postRegisterView,
	postAddComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, onlyPrivate, postRegisterView);
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);

export default apiRouter;
