const Groups = require("../models/groups");
const Message = require("../models/message");
const userGroups = require("../models/userGroups");


exports.createNewGroup = async (req, res, next) => {
  try {
    let groupName = req.body.groupName;

    let data = await Groups.create({
      groupName: groupName
    })

    await Message.create({
      chats: `${req.user.userName} joined the group`,
      name: null,
      urlfile: null,
      userId: req.user.Id,
      groupId: data.id
    })

    await userGroups.create({
      userId: req.user.Id,
      groupId: data.id,
      groupName: data.groupName,
      userName: req.user.userName,
      isAdmin: true
    })
    res.status(201).json({ data });
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

exports.getAllGroups = (req, res, next) => {
  try {
    userGroups.findAll({ where: { userId: req.user.Id } })
      .then(data => {
        res.json({ data });
      });
  }
  catch (err) {
    console.log(err);
    res.status(404).json(err);
  };
};
