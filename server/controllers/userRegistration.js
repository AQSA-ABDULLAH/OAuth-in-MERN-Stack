const User = require("../models/Users");
const { hashPassword } = require("../helpers/hashPassword");
const { createToken } = require("../helpers/jwt");
const compileEmailTemplate = require("../helpers/compile-email-template");
const mailer = require("../libs/mailer");

class UserRegistration {
    // OTP Generation
    static async generateOTP() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    // User Registration
    static userRegistration = async (req, res) => {
        try {
            const { userName, email, password, confirmPassword } = req.body;

            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(400).json({ error: "User already exists" });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ error: "Password and Confirm Password don't match" });
            }

            const OTP = await UserRegistration.generateOTP();
            const hashedPassword = await hashPassword(password);
            const user = new User({ userName, email, password: hashedPassword, otp: OTP });

            const savedUser = await user.save();

            const template = await compileEmailTemplate({
                fileName: "register.mjml",
                data: { email, OTP },
            });

            try {
                await mailer.sendMail(email, "Mail Verification", template);
                return res.status(201).json({
                    status: "success",
                    message: "User created successfully",
                    token: createToken(savedUser, false, "1d"),
                });
            } catch (error) {
                console.error("Failed to send Create User email:", error);
                return res.status(500).json({ error: "Failed to send Create User email." });
            }
        } catch (error) {
            console.error("Error in user registration:", error.message);
            return res.status(500).json({ error: "Failed to register user." });
        }
    };

    static async verifyOTP(req, res) {
        try {
            const { email, otp } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ status: "error", message: "User not found with the provided email." });
            }

            if (user.is_verified) {
                return res.status(400).json({ status: "error", message: "User account is already verified." });
            }

            if (user.otp !== otp) {
                return res.status(400).json({ status: "error", message: "Incorrect OTP." });
            }

            user.is_verified = true;
            await user.save();

            return res.status(200).json({ status: "success", message: "Account Verified Successfully!" });
        } catch (error) {
            console.error("Error verifying OTP:", error.message);
            return res.status(500).json({ status: "error", message: "Failed to verify OTP.", error: error.message });
        }
    }
}

module.exports = UserRegistration;



