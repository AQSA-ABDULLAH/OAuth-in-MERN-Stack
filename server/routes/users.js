const express = require('express');
const UserRegistration = require('../controllers/userRegistration'); 
const router = express.Router();
require("../db/connection");

// PUBLIC ROUTES
router.post("/user-signUp", UserRegistration.userRegistration);
router.post("/verify-otp", UserRegistration.verifyOTP);

module.exports = router;
