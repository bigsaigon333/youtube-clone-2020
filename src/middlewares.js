import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();

const s3 = new aws.S3({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	// region:
});

const multerVideo = multer({
	storage: multerS3({
		s3,
		acl: "public-read",
		bucket: "youtube-clone-2020/videos",
	}),
});
const multerAvatar = multer({
	storage: multerS3({
		s3,
		acl: "public-read",
		bucket: "youtube-clone-2020/avatars",
	}),
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

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
