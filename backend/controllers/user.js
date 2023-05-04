
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
// let uuid = require('uuid');
// let id = uuid.v4()
let JWT = require('jsonwebtoken');

function generateToken(id) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET)
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
        })
        res.status(201).json({ newUser })
      })
    }
  }
  catch (err) {
    res.status(500).json({ err })
    console.log(err)
  }
}


exports.loginUser = (req, res, next) => {
  console.log(req.body)

}