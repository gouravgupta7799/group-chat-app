
let auth = require('../middleWare/auth');
const express = require('express');
const routers = express.Router();
let controller = require('../controllers/groups');

routers.post('/', auth.authorizerUser, controller.createNewGroup);
routers.get('/', auth.authorizerUser, controller.getAllGroups);


module.exports = routers;