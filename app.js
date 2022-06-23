const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

const {
  notFoundHander,
  errorHandler,
} = require("./middelware/common/errorhande");

const app = express();
dotenv.config();

// database

mongoose
  .connect(process.env.MONGO_CONNEECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfully"))
  .catch((err) => console.log("err"));

//request

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//view
app.set("view engine", "ejs");

//staric folder
app.use(express.static(path.join(__dirname, "public")));

//COOKIES
app.use(cookieParser(process.env.COOKIE_SCRET));

//router
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

//error handel
app.use(notFoundHander);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App port ${process.env.PORT}`);
});
