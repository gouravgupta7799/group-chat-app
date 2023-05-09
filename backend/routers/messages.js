
const express = require('express');
const router = express.Router();
const auth = require('../middleWare/auth');
const controller = require('../controllers/messages');


router.post('/', auth.authorizerUser, controller.postChatMessage);
router.get('/', auth.authorizerUser, controller.getChatMessage);


module.exports = router;