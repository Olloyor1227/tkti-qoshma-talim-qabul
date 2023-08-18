const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    name: String,
    password: String,

    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Userr", AdminSchema);
