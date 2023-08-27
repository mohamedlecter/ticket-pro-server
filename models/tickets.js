var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    title: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
    minPrice: {
    type: Number,
    required: false,
  },
    weekDayworkingHours: {
    type: String,
    required: false,
  },
  weeekEndworkingHours:{
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  img:{
    type: String,
    required: false,
  },
});

var tickets = new mongoose.model("Tickets", schema);
module.exports = tickets;