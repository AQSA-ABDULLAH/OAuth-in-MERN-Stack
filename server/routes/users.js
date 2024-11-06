const express = require('express');
const { userRegistration, verifyOTP } = require('../controllers/userRegistration');
const { userLogin } = require('../controllers/userLogin');
const { signupValidation, loginValidation } = require('../middlewares/AuthValidations');
// const ForgetPassword = require("../../models/ForgetPassword.js");
const router = express.Router();

router.post('/signup', signupValidation, userRegistration);
router.post('/login', loginValidation, userLogin);         
router.post('/verify-otp', verifyOTP);

// FORGET PASSWORD ROUTES
// router.post("/forget-password", ForgetPasswordController.forgetPassword )
// router.post("/reset-pasword", ForgetPasswordController.resetPassword )
// router.patch("/update-password", ForgetPasswordController.updatePassword);

module.exports = router;

