const AttendanceData = require("../models/attendance.model");
const BuktiData = require("../models/bukti.model");

exports.createBukti = async (req, res) => {
  const { AttendanceID, JenisTest, TanggalTest, HasilTest } = req.body;
  try {
    const FotoBukti = `images/${req.file.filename}`;
    console.log(FotoBukti);
    console.log(
      ({ AttendanceID, JenisTest, TanggalTest, HasilTest } = req.body)
    );
    const CekBukti = await BuktiData.findOne({ AttendanceID });
    const CekAttendance = await AttendanceData.findById(AttendanceID);
    const CekMasaBerlaku =
      new Date(
        `${CekAttendance.Tanggal}-${CekAttendance.Bulan}-${CekAttendance.Tahun}`
      ).getTime() - new Date(`${TanggalTest}`).getTime();
    const CekHariBerlaku = CekMasaBerlaku / 1000 / 3600 / 24;
    if (CekAttendance) {
      if (!CekBukti) {
        if (CekHariBerlaku > 7) {
          res.status(200).json({
            message: `Bukti test akan kadaluarsa sebelum hari kunjungan, harap test maksimal 7 hari sebelum kunjungan`,
          });
        } else {
          const data = new BuktiData({
            AttendanceID,
            JenisTest,
            TanggalTest,
            HasilTest,
            FotoBukti,
          });
          console.log(data);
          const submit = await data.save();
          if (submit) {
            await AttendanceData.findByIdAndUpdate(AttendanceID, {
              Status: true,
            });
            res.status(200).json({
              message: `Bukti test telah diterima`,
            });
          }
        }
      } else {
        res.status(200).json({
          message: `Bukti test sudah ada`,
        });
      }
    } else {
      console.log(err.message);
      res.status(500).send("Error");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};
