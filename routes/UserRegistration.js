const express = require("express");
const router = express.Router();
const UserRegistrationController = require('../controllers/UserRegistrationController')

router.post('/v1/', UserRegistrationController.createUser);

module.exports = router;