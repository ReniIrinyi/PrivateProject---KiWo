const Sequelize = require("sequelize");
const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize");

const Submission = sequelize.define("form_submissions", {
  token: DataTypes.STRING,
  tokenExpiresAt: DataTypes.DATE,
  emailConfirmed: Sequelize.BOOLEAN,
  kind: Sequelize.STRING,
  vorname: Sequelize.STRING,
  nachname: Sequelize.STRING,
  geburtsdatum: DataTypes.DATE,
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
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

module.exports = Submission;
