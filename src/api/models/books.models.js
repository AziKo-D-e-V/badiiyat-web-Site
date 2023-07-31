const { mongoose } = require("mongoose");

const booksSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      pages: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Types.ObjectId,
        ref: 'Authors',
      },
      description: {
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

module.exports = model("Books", booksSchema);
