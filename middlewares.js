import multer from "multer";
import routes from "./routes";

export const deliverRoutes = (req, res, next) => {
	res.locals.siteName = "YouTube-clone";
	res.locals.routes = routes;

	res.locals.user = req.user || null;
	console.log("user: ", req.user);
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
export const uploadVideo = multerVideo.single("videoFile");
