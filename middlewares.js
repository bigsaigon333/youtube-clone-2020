import multer from "multer";
import routes from "./routes";

export const deliverRoutes = (req, res, next) => {
	res.locals.siteName = "YouTube-clone";
	res.locals.routes = routes;

	res.locals.loggedUser = req.user || null;
	// console.log("user: ", req.user);
	next();
};

export const onlyPublic = (req, res, next) => {
	if (req.user) {
		res.redirect(routes.home);
	} else {
		next();
	}
};

export const onlyPrivate = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.redirect(routes.home);
	}
};

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
