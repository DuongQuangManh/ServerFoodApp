var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressLayouts = require("express-ejs-layouts");
var session = require("express-session");

// var db = require("./config/db");
// db.mongoose;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var homeRouter = require("./routes/home");
var loginRouter = require("./routes/login");
var categoriesRouter = require("./routes/categories");
var productsRouter = require("./routes/products");
var detailRouter = require("./routes/userdetail");
var prodcutDetailRouter = require("./routes/productdetail");
var apiRouter = require("./routes/api");

var app = express();
app.use(expressLayouts);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.set("layout", "./layouts/login-layout");
app.set("layout", "./layouts/layout");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "SADHBAQKAAOAJNASUHWEIGASBDKSVAVSKDBWKSNDBWSADJBDSA",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/users", usersRouter);
app.use("/formlogin", loginRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/userdetail", detailRouter);
app.use("/productdetail", prodcutDetailRouter);
app.use("/api", apiRouter);

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
  if (req.originalUrl.indexOf("/api") == 0) {
    res.json({
      status: err.status,
      msg: err.message,
    });
  } else {
    res.render("error");
  }
});

module.exports = app;
