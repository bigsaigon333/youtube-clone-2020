import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

const handleHome = (req, res) => {
	res.send("Hello world!");
};

const handleProfile = (req, res) => {
	res.send("You're on my profile!");
};
const handleListening = () => {
	console.log(`Listening on: http://localhost:${PORT}`);
};
const middlewareTest = (req, res, next) => {
	console.log("[Log]: middleware is working");
	next();
};

// app.use(middlewareTest);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(PORT, handleListening);
