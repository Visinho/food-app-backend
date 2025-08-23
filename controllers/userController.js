import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// Login User
const loginUser = async (req, res) => {
   
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"})
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Check if user exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists!" });
        }

        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email!" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password!" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // Create token
        const token = createToken(user._id);

        res.json({
            success: true,
            message: "User registered successfully!",
            token
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong. Please try again!" });
    }
};

export {loginUser, registerUser}