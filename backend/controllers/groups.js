const Groups = require("../models/groups");
const Message = require("../models/message");


exports.createNewGroup = (req, res, next) => {
  let groupName = req.body.groupName;

  Groups.create({
    groupName: groupName
  })
    .then(data => {
      res.json({ data })
    })
}


exports.getAllGroups = (req, res, next) => {
  // console.log(req.query.groupId)
  Groups.findAll()
    .then(data => {
      res.json({ data })
    })

}


exports.getAllMessagesFromGroup = (req, res, next) => {
  // console.log(req.group)

  Message.findAll({ where: { groupId: req.query.groupId } })
    .then(ree => console.log(ree))
}