const Sequelize = require("sequelize");
const sequelize = require("./db"); // Your Sequelize instance

const Submission = sequelize.define("form_submission", {
  betreff: Sequelize.STRING,
  vorname: Sequelize.STRING,
  nachname: Sequelize.STRING,
  geburtsdatum: Sequelize.STRING,
  klasse: Sequelize.STRING,
  anschrift: Sequelize.STRING,
  wohnort: Sequelize.STRING,
  email: Sequelize.STRING,
  telefon: Sequelize.STRING,
  nachricht: Sequelize.STRING,
  montag: Sequelize.BOOLEAN,
  dienstag: Sequelize.BOOLEAN,
  mittwoch: Sequelize.BOOLEAN,
  donnerstag: Sequelize.BOOLEAN,
  freitag: Sequelize.BOOLEAN,
  fahrdienst: Sequelize.STRING,
  zvieri: Sequelize.STRING,
  fotoserlaubnis: Sequelize.STRING,
  verbindlich: Sequelize.STRING,
  signatureImage: Sequelize.BLOB, // Change to Sequelize.BLOB for binary data
});

module.exports = submission;
