const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require('multer');
const dbConfig = require("./config/config.js");
const UserRoute = require("./routes/user");
const AdminRoute = require("./routes/admin");
const TicketsRoute = require("./routes/tickets");

require("dotenv").config();

const app = express();

let port = process.env.PORT;
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The folder where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generating a unique filename
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());

app.use("/user", UserRoute);
app.use("/admin", AdminRoute);
app.use("/tickets", TicketsRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Hello Crud Node Express"
  });
});

app.listen(port || 4000, () => {
console.log(`Server is listening on port ${process.env.PORT || 4000}`);});