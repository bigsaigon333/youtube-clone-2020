import routes from "../routes";
import Video from "../models/Video";

export const home = (req, res) => {
	const loadVideos = () =>
		new Promise((resolve, reject) => {
			const videos = Video.find({}).sort({ _id: -1 });
			if (videos) resolve(videos);
			else reject([]);
		});
	loadVideos().then((videos) => {
		res.render("home", { pageTitle: "Home", videos });
	});
};

export const search = async (req, res) => {
	const {
		query: { term: searchingBy },
	} = req;

	let videos = [];
	try {
		videos = await Video.find({
			title: { $regex: searchingBy, $options: "i" },
			description: { $regex: searchingBy, $options: "i" },
		});
	} catch (e) {
		console.error(e);
	} finally {
		res.render("search", {
			pageTitle: "Search",
			searchingBy: searchingBy,
			videos,
		});
	}
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

export const videoDetail = async (req, res) => {
	const {
		params: { id: videoId },
	} = req;
	// console.log(videoId);
	try {
		const video = await Video.findById(videoId);
		console.log(video);
		res.render("videoDetail", { pageTitle: `Video ${video.title}`, video });
	} catch (e) {
		console.error(e);
		res.redirect(routes.home);
	}
};
export const getEditVideo = async (req, res) => {
	const {
		params: { id: videoId },
	} = req;

	try {
		const video = await Video.findById(videoId);
		res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
	} catch (e) {
		res.redirect(routes.home);
	}
};

export const postEditVideo = async (req, res) => {
	const {
		params: { id: videoId },
		body: { title, description },
	} = req;

	try {
		await Video.findOneAndUpdate({ _id: videoId }, { title, description });
		res.redirect(routes.videoDetail(videoId));
	} catch (e) {
		res.redirect(routes.home);
	}
};

export const deleteVideo = async (req, res) => {
	const {
		params: { id: videoId },
	} = req;

	try {
		await Video.findOneAndRemove({ _id: videoId });
	} catch (e) {
		console.error(e);
	} finally {
		res.redirect(routes.home);
	}
};
