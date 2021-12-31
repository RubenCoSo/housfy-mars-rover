const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");
const saltRounds = 10;

module.exports.postNewUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: "Provide email, password and username" });
    return;
  }

  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((findUser) => {
      //check if email adress is unique
      if (findUser) {
        res.status(400).json({ message: "User already exists." });
      }

      ////if user adress is unique

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ username, email, password: hashedPassword });
    })
    .then((createdUser) => {
      const { username, email, _id } = createdUser;

      const user = { username, email, _id };

      console.log(user);

      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

module.exports.checkUserLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.status(400).json({ message: "Provide username and password." });
    return;
  }

  User.findOne({ username })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "Wrong Username or password" });
        return;
      }

      // Compare  provided password with database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, username } = foundUser;

        const payload = { _id, email, username };

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
};

module.exports.getVerify = (req, res, next) => {
  console.log(`req.payload`, req.payload);

  res.status(200).json(req.payload);
};
