const { Op } = require("sequelize");
const Message = require("../models/message");


exports.postChatMessage = (req, res, next) => {
  try {
    let chat = req.body.messages;
    let groupId = req.query.groupId

    Message.create({
      chats: chat,
      name: req.user.userName,
      userId: req.user.Id,
      groupId: parseInt(groupId)
    })
      .then(msg => res.status(201).json({ msg: msg, mainuser: req.user.Id }))
      .catch(err => {
        console.log(err)
        res.status(400).json({ err: err });
      });
  }
  catch (err) {
    console.log(err)
    res.json({ err })
  }
};

exports.getChatMessage = (req, res, next) => {
  try {
    let mainUserId = req.user.Id;
    let lastUserId = req.query.lastUserId;
    let group = req.query.groupId;

    Message.findAll({
      where: {
        id: { [Op.gt]: lastUserId },
        groupId: group,
      }
    })
      .then(data => {
        res.json({ data, mainUserId: mainUserId })
      });
  }
  catch (err) {
    console.log(err);
    res.status(404).send(err);
  };
};