
const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleWare/auth');
const controller = require('../controllers/messages');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth.authorizerUser, controller.postChatMessage);
router.get('/', auth.authorizerUser, controller.getChatMessage);
router.post('/sendImg', auth.authorizerUser, upload.single('file'), controller.sendImg);


module.exports = router;