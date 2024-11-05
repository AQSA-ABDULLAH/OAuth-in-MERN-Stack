const express = require('express');
const { UserRegistration } = require('../controllers/userRegistration'); 
const { userLogin } = require('../controllers/userLogin');
// const {ProfileController} = require("../controllers/users/userProfile")
// const {ForgetPasswordController} = require("../controllers/users/forgetPassword")
const router = express.Router();
require("../db/connection");

// PUBLIC ROUTES
router.post("/user_signUp", UserRegistration.userRegistration);
router.post("/user_signIn", userLogin);

// PROFILE ROUTES
// router.get("/get-user-profile/:id", ProfileController.getUserProfile);
// router.get("/get-users", ProfileController.getAllUsers);
// router.patch("/update-profile/:id", ProfileController.updateUserProfile);

// FORGET PASSWORD ROUTES
// router.post("/forget-password", ForgetPasswordController.forgetPassword )
// router.post("/reset-pasword", ForgetPasswordController.resetPassword )
// router.patch("/update-password", ForgetPasswordController.updatePassword);

// OTP ROUTES
// router.post("/send-otp", UserController.verifyOTP )

module.exports = router;