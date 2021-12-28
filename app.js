const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.options("*", cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// body parser

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// end body parser

//ROUTE
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;
