const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./config/config.js");
const UserRoute = require("./routes/user");
const AdminRoute = require("./routes/admin");

const app = express();

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Databse Connected");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use("/user", UserRoute);
app.use("/admin", AdminRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Hello Crud Node Express"
  });
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});