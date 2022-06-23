const express = require("express");

const { getlogin }= require("../controller/logincontroller");
const decorateHtmlResponse = require("../middelware/common/decorateHtmlResponse")

const router = express.Router();

router.get("/",decorateHtmlResponse("Login"),getlogin);

module.exports = router