const dotenv = require("dotenv");

dotenv.config({ path: ".env" });
exports.DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

exports.email_config = {
  user: process.env.EMAIL,
  pass: process.env.PASSWORD_EMAIL,
};
