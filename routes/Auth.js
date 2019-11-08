const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/AuthController')

router.post('/v1/', AuthController.AuthenticateUser);

module.exports = router;