const express = require("express");
const { validationResult } = require("express-validator");
const {
  getAllTweets,
  getTweetByTitle,
  getTweet,
  createTweet,
  deleteTweet,
  patchTweet,
} = require("../controllers/tweet.controller");

const router = express.Router();

const Tweet = require("../models/tweet.model");
const upload = require("../utils/fileUpload");
const validateTweet = require("../utils/validateTweet");

router.get("/", getAllTweets);

router.get("/:user_id", getTweet);

router.get("/title/:title", getTweetByTitle);

router.post("/", upload.single("avatar"), createTweet);

router.delete("/:user_id", deleteTweet);

router.patch("/:user_id", patchTweet);

module.exports = router;
