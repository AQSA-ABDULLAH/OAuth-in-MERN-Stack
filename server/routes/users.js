
const express = require('express');
const { userRegistration, verifyOTP } = require('../controllers/userRegistration');
const { userLogin } = require('../controllers/userLogin');
const { signupValidation, loginValidation } = require('../middlewares/AuthValidations');

const router = express.Router();

router.post('/signup', signupValidation, userRegistration);
router.post('/login', loginValidation, userLogin);         
router.post('/verify-otp', verifyOTP);                  

module.exports = router;

