const app=require("express")();
const tweetController = require('./controllers/tweet.controller');

app.use("/index",tweetController)

module.exports= app;