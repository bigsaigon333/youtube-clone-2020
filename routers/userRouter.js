import express from "express";
import routes from "../routes";
import { changePassword, getEditProfile } from "../controllers/userController";

const userRouter = express.Router();

// userRouter.get("/", (req, res) => res.send("Users"));
userRouter.get(routes.editProfile, getEditProfile);
userRouter.get(routes.changePassword, changePassword);
// userRouter.get(routes.me, userDetail);

export default userRouter;
