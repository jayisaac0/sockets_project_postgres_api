const express = require("express");
const router = express.Router();
const UserProfileController = require('../controllers/UserProfileController');
const authenticate = require('../middleware/auth');

router.post('/v1/', UserProfileController.createUserProfile);
router.patch('/v1/:id', UserProfileController.updateUserProfile);

module.exports = router;