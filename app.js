import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import { videos } from "./db";

const app = express();

// app.use(helmet());
app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const deliverRoutes = (req, res, next) => {
	res.locals.siteName = "YouTube-clone";
	res.locals.routes = routes;
	res.locals.videos = videos;
	res.locals.user = {
		isAuthenticated: true,
		id: 1,
	};
	next();
};

app.use(deliverRoutes);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
