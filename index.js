//To handle exceptions
process.on("uncaughtException", (err) => {
  console.log("error in code", err);
});
import express from "express";
import dotenv from "dotenv";
import "./database/dbConnection.js";
import authRouter from "./modules/auth/auth.routes.js";
import messageRouter from "./modules/messages/messages.routers.js";
import globalError from "./middlewares/globalError.js";
const app = express();

// Load environment variables from .env file
dotenv.config();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/messages", messageRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`route not found ${req.originalUrl}`, 404));
});

//global error handling middleware
app.use(globalError);

// to handle all errors outside express
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
app.listen(process.env.PORT, () =>
  console.log(`App is running on port ${process.env.PORT}!`)
);
