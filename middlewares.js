import multer from "multer";
import routes from "./routes";

export const deliverRoutes = (req, res, next) => {
	res.locals.siteName = "YouTube-clone";
	res.locals.routes = routes;
	// res.locals.videos = videos;
	res.locals.user = {
		isAuthenticated: true,
		id: 1,
	};
	next();
};

const multerVideo = multer({ dest: "videos/" });
export const uploadVideo = multerVideo.single("videoFile");
