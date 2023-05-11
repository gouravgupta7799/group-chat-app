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
      userId: req.user.Id,
      name: req.user.userName,
      groupId: data.id
    })

    await userGroups.create({
      userId: req.user.Id,
      groupId: data.id
    })

    res.status(201).json({ data })
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

exports.getAllGroups = (req, res, next) => {
  try {
    // console.log(req.query.groupId)

    Groups.findAll()
      .then(data => {
        res.json({ data })
        console.log(data)
      })
  }
  catch (err) {
    console.log(err);
    res.status(404).json(err)
  }
}


// exports.getAllMessagesFromGroup = (req, res, next) => {
//   // console.log(req.group)
// console.log(1234)
//   Message.findAll({ where: { groupId: req.query.groupId } })
//     .then(ree => {
//       console.log(ree)
//     })
// }