import routes from "../routes";
import Video from "../models/Video";
import { uploadVideo } from "../app";

export const home = async (req, res) => {
	const loadVideos = new Promise((resolve, reject) => {
		const videos = Video.find({});
		if (videos) resolve(videos);
		else reject([]);
	});
	loadVideos.then((videos) => {
		res.render("home", { pageTitle: "Home", videos });
	});

	// try {
	// 	const videos = await Video.find({});
	// 	console.log(videos);
	// 	res.render("home", { pageTitle: "Home", videos });
	// } catch (error) {
	// 	console.log(error);
	// 	res.render("home", { pageTitle: "Home", videos: [] });
	// }
};

export const search = (req, res) => {
	const {
		query: { term: searchingFor },
	} = req;
	res.render("search", { pageTitle: "Search", searchingBy: searchingFor });
};
export const getUpload = (req, res) =>
	res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
	const {
		body: { title, description },
		file: { path },
	} = req;
	const newVideo = await Video.create({ fileUrl: path, title, description });
	console.log(newVideo);
	// console.log(file, title, description);

	// To DO: Upload and save video

	res.redirect(routes.videoDetail(newVideo.id));

	// res.render("upload", { pageTitle: "Upload" });
};

export const videoDetail = (req, res) =>
	res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
	res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
	res.render("deleteVideo", { pageTitle: "Delete Video" });
