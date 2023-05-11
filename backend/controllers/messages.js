const { Op } = require("sequelize");
const Message = require("../models/message");


exports.postChatMessage = (req, res, next) => {
  let chat = req.body.messages;
  let groupId = req.query.groupId
  // console.log(req.user)

  Message.create({
    chats: chat,
    name: req.user.userName,
    userId: req.user.Id,
    groupId: parseInt(groupId)
  })

    .then(msg => res.status(201).json({ msg: msg }))
    .catch(err => {
      console.log(err)
      res.status(400).json({ err: err });
    });
};

exports.getChatMessage = (req, res, next) => {
  try {
    let mainUserId = req.user.Id;
    let lastUserId = req.query.lastUserId;
    let groupId = req.query.groupId;
    console.log(groupId)
    console.log(lastUserId)
    Message.findAll({
      where: {
        id: { [Op.gt]: lastUserId },
        groupId: groupId,
        userId: req.user.Id
      }
    })
      .then(data => {
        res.json({ data, mainUserId: mainUserId })
      });
  }
  catch (err) {
    console.log(err)
    res.status(404).send(err)
  }
}