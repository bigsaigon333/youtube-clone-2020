import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

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
	try {
		const newVideo = await Video.create({
			fileUrl: path,
			title,
			description,
			creator: req.user.id,
		});
		req.user.videos.push(newVideo.id);
		req.user.save();
		console.log(newVideo);
		// console.log(file, title, description);

		// To DO: Upload and save video

		res.redirect(routes.videoDetail(newVideo.id));
	} catch (e) {
		console.error(e);
	}

	// res.render("upload", { pageTitle: "Upload" });
};

export const videoDetail = async (req, res) => {
	const {
		params: { id: videoId },
	} = req;
	// console.log(videoId);
	try {
		const video = await Video.findById(videoId)
			.populate("creator")
			.populate("comments");
		// console.log(video);
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

		if (String(video.creator) !== req.user.id)
			throw new Error(
				`you're not a creator: (creator, you) = (${video.creator}, ${
					req.user.id
				} ${typeof video.creator} ${typeof req.user.id})`
			);
		res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
	} catch (e) {
		console.error(e);
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
		const video = await Video.findById(videoId);
		if (String(video.creator) !== req.user.id)
			throw new Error(
				`you're not a creator: (creator, you) = (${video.creator}, ${
					req.user.id
				} ${typeof video.creator} ${typeof req.user.id})`
			);
		// await Video.findOneAndRemove({ _id: videoId });

		video.remove();
	} catch (e) {
		console.error(e);
	} finally {
		res.redirect(routes.home);
	}
};

export const postRegisterView = async (req, res) => {
	const {
		params: { id },
	} = req;

	try {
		const video = await Video.findById(id);
		video.views++;
		video.save();
		res.status(200);
	} catch (error) {
		console.error(error);
		res.status(400);
	} finally {
		res.end();
	}
};

// Add Comment

export const postAddComment = async (req, res) => {
	const {
		params: { id },
		body: { comment },
		user,
	} = req;

	console.log("postAddComment", comment);

	try {
		const video = await Video.findById(id);
		const newComment = await Comment.create({
			text: comment,
			creator: user.id,
		});
		video.comments.push(newComment.id);
		video.save();

		res.status(200);
	} catch (error) {
		console.error(error);
		res.status(400);
	} finally {
		res.end();
	}
};
