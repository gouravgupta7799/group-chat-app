
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
// let uuid = require('uuid');
// let id = uuid.v4()
let JWT = require('jsonwebtoken');

function generateToken(Id) {
  return JWT.sign({ userId: Id }, process.env.JWT_SECRET)
}

exports.signupNewUser = async (req, res, next) => {
  try {
    let alreadyexist = await User.findOne({ where: { userEmail: req.body.userEmail } });
    if (alreadyexist) {
      res.status(403).json({ msg: 'User already exist' });
    } else if (!alreadyexist) {
      let salt = 5
      bcrypt.hash(req.body.userPassword, salt, async (err, hash) => {
        let newUser = await User.create({
          userName: req.body.userName,
          userContect: req.body.userContect,
          userEmail: req.body.userEmail,
          userPassword: hash,
        });
        res.status(201).json({ newUser });
      });
    };
  }
  catch (err) {
    res.status(500).json({ err });
    console.log(err);
  };
};

exports.loginUser = async (req, res, next) => {
  try {
    let email = req.body.userEmail;
    let Password = req.body.userPassword;

    let foundEmail = await User.findOne({ where: { userEmail: email } });
    if (!foundEmail) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (foundEmail) {
      bcrypt.compare(Password, foundEmail.userPassword, async (err, pass) => {
        if (pass) {

          res.status(200).json({ success: true, msg: "created sucsessfully", token: generateToken(foundEmail.Id) })
        } else {
          res.status(401).json({ msg: `User not authorized,invalid password` });
        }
      })
    }
  }
  catch (err) {
    res.json(err)
    console.log(err)
  }
}