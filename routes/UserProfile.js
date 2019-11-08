const express = require("express");
const router = express.Router();
const UserProfileController = require('../controllers/UserProfileController');
const authenticate = require('../middleware/auth');

router.post('/v1/', authenticate, UserProfileController.createUserProfile);
router.patch('/v1/:id', authenticate, UserProfileController.updateUserProfile);

module.exports = router;