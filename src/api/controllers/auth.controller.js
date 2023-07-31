const userSchema = require("../models/model");
const bcrypt = require("bcrypt");
const jwt = require("../../libs/jwt");
const { generateHash, compareHash } = require("../../libs/bcrypt");
const { jwtSecretKey } = require("../../../config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userSchema.find({ email });
    if (findUser.length < 1) {
      return res
        .status(404)
        .json({ message: "Invalid email or password provided for login" });
    }
    const compare = await compareHash(password, findUser[0].password);

    if (!compare) {
      return res
        .status(404)
        .json({ message: "Invalid password provided to login" });
    }
    console.log(findUser[0].id);
    const token = jwt.sign({ userId: findUser[0].id });

    res.cookie("token", token);

    res.status(201).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  console.log(req.body);
  try {
    const { name, surname, phone, email, password } = req.body;
    const generate = await generateHash(password);
    const findUser = await userSchema.find({ email: email });
    console.log(findUser);
    if (!findUser.length < 1) {
      return res
        .status(404)
        .json({ message: "Invalid email or password provided for login" });
    }

    const user = new userSchema({
      name,
      surname,
      phone,
      email,
      password: generate,
    });

    if (findUser.length) {
      return res.status(404).json({ message: "Username already exists" });
    }
    const token = jwt.sign({ userId: findUser.id });

    res.cookie("token", token);

    await user.save();

    res.status(201).json({ message: "User created", data: user, token });
  } catch (error) {
    console.log(error);
  }
};

const profilEdit = async (req, res) => {
  const { name, surname, phone, email } = req.body;
  const { token } = req.cookies;
  try {
    const decodedToken = jwt.verify(token, jwtSecretKey);
    const userId = decodedToken.userId;
    console.log(userId);
    await userSchema.findByIdAndUpdate(userId, {
      name: name,
      surname: surname,
      phone: phone,
      email: email,
    });

    res.status(201).json({ message: "Successfully updated" });
  } catch (error) {
    console.log(error.message);
  }
};

const changePassword = async (req, res) => {
  const { email, password, newpass, renewpass } = req.body;
  const { token } = req.cookies;
  try {
    const decodedToken = jwt.verify(token, jwtSecretKey);
    const userId = decodedToken.userId;

    const user = await userSchema.findById(userId);
    const compare = await compareHash(password, user.password);
    if (!compare) {
      return res
        .status(404)
        .json({ message: "Invalid password" });
    }

      if(user.email === email & newpass === renewpass) {
        const generate = await generateHash(password);

        await userSchema.findByIdAndUpdate(userId, {password: generate})
        res.status(201).json({ message: "Successfully changed password" });
    }
    res.status(403).json({ message: "Error something email or new Password or return new Password " });

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  login,
  register,
  profilEdit,
  changePassword
};
