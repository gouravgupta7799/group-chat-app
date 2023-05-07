
const bcrypt = require('bcrypt');
// let uuid = require('uuid');
// let id = uuid.v4()
let JWT = require('jsonwebtoken');
const User = require('../models/user.js');
const Message = require("../models/message");

function generateToken(Id, name) {
  return JWT.sign({ userId: Id, userName: name }, process.env.JWT_SECRET)
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
        let joinGroup = Message.create({
          chats: `${newUser.userName} joined the group`
        })
        login(newUser.userEmail, req.body.userPassword, res);
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
    let password = req.body.userPassword;
    login(email, password, res);
  }
  catch (err) {
    res.json(err)
    console.log(err)
  }
}

let login = async (email, password, res) => {
  let foundEmail = await User.findOne({ where: { userEmail: email } });
  if (!foundEmail) {
    return res.status(404).json({ msg: 'User not found' });
  }
  if (foundEmail) {
    bcrypt.compare(password, foundEmail.userPassword, async (err, pass) => {
      if (pass) {
        let newUser = {
          createdAt: foundEmail.createdAt,
          updatedAt: foundEmail.updatedAt,
          userContect: foundEmail.userContect,
          userEmail: foundEmail.userEmail,
          userName: foundEmail.userName
        };
        res.status(200).json({ success: true, msg: "created sucsessfully", user: newUser, token: generateToken(foundEmail.Id, foundEmail.userName) })
      } else {
        res.status(401).json({ msg: `User not authorized,invalid password` });
      }
    })
  }
}
