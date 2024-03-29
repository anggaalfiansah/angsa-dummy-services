var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
var mongodb = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index.route");
var usersRouter = require("./routes/users.route");
var faceRouter = require("./routes/face.route");
var attendanceRouter = require("./routes/attendance.route");
var skriningRouter = require("./routes/skrining.route");
var buktiRouter = require("./routes/bukti.route");
var phisingRouter = require("./routes/phising.route");

const { DB } = require("./config");

mongodb
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((connection) => {
    console.log("connection success");
  })
  .catch((e) => {
    console.log("MONGOERROR", e);
  });

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/face", faceRouter);
app.use("/attendance", attendanceRouter);
app.use("/skrining", skriningRouter);
app.use("/bukti", buktiRouter);
app.use("/phising", phisingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
