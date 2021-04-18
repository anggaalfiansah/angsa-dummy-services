const mongodb = require("mongoose");

const buktiModel = new mongodb.Schema({
  AttendanceID: {
    type: String,
    required: true,
  },
  JenisTest: {
    type: String,
    required: true,
  },
  TanggalTest: {
    type: Date,
    required: true,
  },
  HasilTest: {
    type: Boolean,
    default: false,
  },
  FotoBukti: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const BuktiData = mongodb.model("bukti", buktiModel);

module.exports = BuktiData;