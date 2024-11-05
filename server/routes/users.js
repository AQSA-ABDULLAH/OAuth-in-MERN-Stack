// const express = require('express');
// const UserRegistration = require('../controllers/userRegistration');
// const { userLogin } = require('../controllers/userLogin');
// const router = express.Router();
// require("../db/connection");

// // PUBLIC ROUTES
// router.post("/user-signUp", UserRegistration.userRegistration);
// router.post("/user-signIn", userLogin);
// router.post("/verify-otp", UserRegistration.verifyOTP);

// module.exports = router;
const express = require('express');
const { userRegistration, verifyOTP } = require('../controllers/userRegistration');
const { userLogin } = require('../controllers/userLogin');
const { signupValidation, loginValidation } = require('../middlewares/AuthValidations');

const router = express.Router();

router.post('/signup', signupValidation, userRegistration); // Registration route
router.post('/login', loginValidation, userLogin);          // Login route
router.post('/verify-otp', verifyOTP);                      // OTP Verification route

module.exports = router;

