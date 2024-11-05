const express = require('express');
const UserRegistration = require('../controllers/userRegistration');
const { userLogin } = require('../controllers/userLogin');
const router = express.Router();
require("../db/connection");

// PUBLIC ROUTES
router.post("/user-signUp", UserRegistration.userRegistration);
router.post("/user-signIn", userLogin);
router.post("/verify-otp", UserRegistration.verifyOTP);

module.exports = router;
