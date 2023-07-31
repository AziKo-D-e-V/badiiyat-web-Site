const authorSchema = require("../models/main.models");
const booksSchema = require("../models/main.models");
const { v4: uuid } = require("uuid");
const path = require("path");

const authors = async (req, res) => {
  const { name, surname, birthdate, deathdate, country, bio } = req.body;
  const { image } = req.files;

  const imagename = `${uuid()}${path.extname(image.name)}`;

  image.mv(process.cwd() + "/uploads/" + imagename);

  const author = await authorSchema.find({ name, surname });
  console.log(author.length);
  if (author.length > 0) {
    res.status(403).json({ message: "Author already exists" });
  } else {
    await authorSchema.create({
      name,
      surname,
      birthdate,
      deathdate,
      country,
      bio,
      imagename,
    });

    res.status(201).json({ message: "Author created" });
  }
};

const books = async (req, res) => {
  const { title, pages, year, price, country, author, description } = req.body;
  const { image } = req.files;

  const imagename = `${uuid()}${path.extname(image.name)}`;
  image.mv(process.cwd() + "/uploads/" + imagename);

  const name = author.split(" ");

  const authorid = await authorSchema.find({ name: name[0], surname: name[1] });
console.log(authorid[0].id);
  const book = await booksSchema.find({ title, pages });

  if (book.length > 0) {
    res.status(403).json({ message: "Book already exists" });
  } else {
    await authorSchema.create({
      title,
      pages,
      year,
      price,
      country,
      author: authorid[0]._id,
      description,
    });

    res.status(201).json({ message: "Books created" });
  }
};

module.exports = {
  authors,
  books,
};
