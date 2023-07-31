const { Schema, model, default: mongoose, Mongoose } = require("mongoose");

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
      required: true,
    },
    deathdate: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true, 
    },
    imagename:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
// title, pages, year, price, country, author, description 



module.exports = model("Authors", authorSchema);
