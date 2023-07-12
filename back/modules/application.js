const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema(
  {
    // Personal infos begin
    name: String,
    surname: String,
    fathername: String,
    dob: String,
    gender: {
      type: String,
      enum: ["male", "fmale"],
    },
    passport_number: String,
    passport_dob: String,
    jshshr: String,
    address: String,
    photo: String,
    tel: String,
    // Personal infos end

    // Educational infos begin
    complated_edu: String,
    state: String,
    edu_type: String,
    edu_lang: String,
    edu_degree: String,
    faculty: String,
    // Educational infos end
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", ApplicationSchema);
