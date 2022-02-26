const express = require("express");
const app = express();
const router = require("./routers/expressRouter");
const mongoose = require("mongoose");
const cors = require("cors");

const URL = "mongodb://localhost:27017/colorpic";

app.set("PORT", 8080);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose.connect(URL, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Connection Successful");
});

app.use("/palettes", router);

app.listen(app.get("PORT"), () => {
  console.log("Listening on port 8080");
});
