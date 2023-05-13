const Groups = require("../models/groups")
const User = require("../models/user")
const userGroups = require("../models/userGroups")
const Message = require('../models/message');
const { Op } = require("sequelize");

exports.searchUser = (req, res, next) => {
  try {
    let name = req.body.name;

    userGroups.findAll({ where: { userName: { [Op.like]: `%${name}%` } } })
      .then(data => {
        res.json({ data });
      });
  }
  catch (err) {
    console.log(err);
    res.json(err);
  };
};


exports.allUser = async (req, res, next) => {
  try {
    let group = req.query.groupId;

    let gropuId = await userGroups.findAll({ where: { groupId: group } });
    res.json({ data: gropuId });
  }
  catch (err) {
    console.log(err);
    res.json({ err });
  };
};


exports.addToGroup = async (req, res, next) => {
  try {
    let data = await Groups.findOne({ where: { id: req.body.groupId } });
    let user = await User.findOne({ where: { Id: req.body.Id } });

    await userGroups.create({
      userId: user.Id,
      groupId: data.id,
      groupName: data.groupName,
      userName: user.userName,
      isAdmin: false
    });

    await Message.create({
      chats: `${user.userName} add to group`,
      userId: user.Id,
      name: null,
      groupId: data.id
    });

  }
  catch (err) {
    console.log(err);
    res.json({ err });
  };
};

exports.makeAdmin = async (req, res, next) => {
  try {

    let adminNow = await userGroups.update(
      {
        isAdmin: true
      }, {
      where: {
        groupId: req.body.groupId,
        id: req.body.id,
      }
    });
    res.json({ adminNow });
  }
  catch (err) {
    console.log(err);
    res.json({ err });
  };
};


exports.removePerson = async (req, res, next) => {
  try {
    let removeNow = await userGroups.destroy(
      {
        where: {
          id: req.body.id,
        }
      });
    res.json({ removeNow });
  }
  catch (err) {
    console.log(err);
    res.json({ err });
  };
};