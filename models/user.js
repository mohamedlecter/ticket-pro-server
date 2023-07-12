var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: String,
});

var user = new mongoose.model("User", schema);

module.exports = user;