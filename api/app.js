// STARTER CODE ---
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// built-in router from template
var indexRouter = require("./routes/index");
// import party router
var partyRouter = require("./routes/party");

var app = express();

// PORT
const PORT = process.env.PORT || 9000;

// Initiate Mongo Server --- uncomment when db is setup
const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

// STARTER CODE --- view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// new party router below
app.use("/party", partyRouter);

// STARTER CODE --- catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// STARTER CODE --- error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// initiates the server on the provided port
app.listen(PORT, (req, res) => {
  console.log(`Server Started at http://localhost:${PORT}`);
});

module.exports = app;
