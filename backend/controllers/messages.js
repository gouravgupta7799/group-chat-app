const Message = require("../models/message");
const User = require("../models/user");


exports.postChatMessage = (req, res, next) => {
  let chat = req.body.messages;
  req.user.createMessage({
    chats: chat
  })

    .then(msg => res.status(201).json({ msg: msg }))
    .catch(err => {
      console.log(err)
      res.status(400).json({ err: err });
    })
}

exports.getChatMessage = (req, res, next) => {
  try {
    let mainUserId = req.user.Id;
    let mainUserName = req.user.userName;
    Message.findAll()
      .then(data => {
        res.json({ data, mainUserId: mainUserId, mainUserName: mainUserName })
      });
  }
  catch (err) {
    console.log(err)
    res.status(404).send(err)
  }
}