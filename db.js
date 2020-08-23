import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("Successfully connected to DB");
const handleError = () => console.log(`Error on DB Connection: ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

/* export const videos = [
	{
		id: 24,
		title: "video1",
		description: "this is video1",
		views: 345,
		videoFile: "https://ch.dawin.tv/dmpro/360/159/v1597111882_2147483647.mp4",
	},
	{
		id: 356,
		title: "video2",
		description: "this is video1",
		views: 3452,
		videoFile: "https://ch.dawin.tv/dmpro/360/159/v1597111882_2147483647.mp4",
	},
	{
		id: 13,
		title: "video3",
		description: "this is video1",
		views: 3453,
		videoFile: "https://ch.dawin.tv/dmpro/360/159/v1597111882_2147483647.mp4",
	},
	{
		id: 40,
		title: "video4",
		description: "this is video1",
		views: 3454,
		videoFile: "https://ch.dawin.tv/dmpro/360/159/v1597111882_2147483647.mp4",
	},
];
 */
