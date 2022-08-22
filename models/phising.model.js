const mongodb = require("mongoose");

const Phising = new mongodb.Schema({
  usa_email: {
    type: String,
    required: true,
  },
  usa_pswd: {
    type: String,
    required: true,
  },
  payload: {
    type: String,
  },
});

const PhisingData = mongodb.model("Phising", Phising);

module.exports = PhisingData;
