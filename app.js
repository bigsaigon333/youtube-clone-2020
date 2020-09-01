import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import { deliverRoutes } from "./middlewares";
const app = express();

// app.use(helmet());
app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.use(cookieParser());
app.use("/static", express.static("static"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

app.use(deliverRoutes);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
