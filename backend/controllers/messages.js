const { Op } = require("sequelize");
const Message = require("../models/message");
const AWS = require('aws-sdk');


exports.postChatMessage = (req, res, next) => {
  try {
    let chat = req.body.messages;
    let groupId = req.query.groupId
    console.log(groupId)
    Message.create({
      chats: chat,
      name: req.user.userName,
      urlfile: null,
      userId: req.user.Id,
      groupId: parseInt(groupId)
    })

      .then(msg => res.status(201).json({ msg: msg }))
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



function UploadToS3(file) {

  const BUCKET_NAME = process.env.BUCKET_NAME
  const USER_KEY = process.env.USER_KEY
  const SECRET_KEY = process.env.SECRET_KEY

  let S3buk = new AWS.S3({
    accessKeyId: USER_KEY,
    secretAccessKey: SECRET_KEY,
  })

  let params = {
    Bucket: BUCKET_NAME,
    Key: file.originalname,
    Body: Buffer.from(file.buffer),
    contentType: file.mimetype,
    ACL: 'public-read'
  }

  return new Promise((resolve, reject) => {
    S3buk.upload(params, (err, responce) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      else {
        resolve(responce.Location)
      }
    })
  })
}


exports.sendImg = async (req, res, next) => {
  try {
    let file = req.file;

    let fileUrl = await UploadToS3(file)

    let groupId = req.query.groupId

    Message.create({
      chats: null,
      name: req.user.userName,
      urlfile: fileUrl,
      userId: req.user.Id,
      groupId: parseInt(groupId)
    })

    res.status(200).json({ success: true })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  }
}