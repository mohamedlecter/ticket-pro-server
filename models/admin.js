var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    adminId: {
    type: String,
    required: false, // You can decide whether to keep this required or not    required: false,
    default: false,
  },
  birthdate: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

var admin = new mongoose.model("Admin", schema);
module.exports = admin;