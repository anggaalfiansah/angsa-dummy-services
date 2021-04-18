const mongodb = require("mongoose");

const attendanceModel = new mongodb.Schema({
  UserID: {
    type: String,
    required: true,
  },
  Nama: {
    type: String,
    required: true,
  },
  Tanggal: {
    type: String,
    required: true,
  },
  Bulan: {
    type: String,
    required: true,
  },
  Tahun: {
    type: String,
    required: true,
  },
  CheckIn: {
    type: String,
    default: null,
  },
  CheckOut: {
    type: String,
    default: null,
  },
  ScoreSkrining: {
    type: Number,
    required: true,
  },
  HasilSkrining: {
    type: String,
    required: true,
  },
  Keterangan: {
    type: String,
    required: true,
  },
  Status: {
    type: Boolean,
    default: false,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const AttendanceData = mongodb.model("attendance", attendanceModel);

module.exports = AttendanceData;
