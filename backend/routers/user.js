
let express = require('express');
let userController = require('../controllers/user');

let router = express.Router();

router.post('/signUp', userController.signupNewUser);

module.exports = router;