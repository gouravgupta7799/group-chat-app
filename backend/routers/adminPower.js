

const express = require('express');
const routers = express.Router();
const auth = require('../middleWare/auth');
const controller = require('../controllers/adminPower');

routers.post('/searchUser', auth.authorizerUser, controller.searchUser);
routers.post('/addToGroup', auth.authorizerUser, controller.addToGroup);
routers.get('/allUser', auth.authorizerUser, controller.allUser);
routers.post('/makeAdmin', auth.authorizerUser, controller.makeAdmin);
routers.post('/removePerson', auth.authorizerUser, controller.removePerson);


module.exports = routers;