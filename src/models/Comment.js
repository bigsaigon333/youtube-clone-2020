import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: "You need to write your comment",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	video: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Video",
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
