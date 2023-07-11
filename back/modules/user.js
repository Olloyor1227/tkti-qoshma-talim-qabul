const mongoose = require("mongoose");
// const Region=require('./Region')
const Schema = mongoose.Schema;

const userSchema = Schema({
  phone: { type: String },
  password: { type: String },
  name: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);