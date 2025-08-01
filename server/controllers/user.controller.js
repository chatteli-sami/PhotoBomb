import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


//* Register Feature
export const register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "Email already exists in the DB!"
             })
        }

        const user = await User.create(req.body);
        const userToken = jwt.sign({
            id: user._id,
            email: user.email
        }, JWT_SECRET, {
            expiresIn: '15d'
        })

        res.cookie("userToken", userToken, { httpOnly: true, secure: false })
           .status(201).json({
            success: true,
            message: "User registered successfully!",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
           })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while registering the user!",
            error: error.message
        });
    }
}


//* Login Feature
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user === null) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password!"
            });
        }
        const userToken = jwt.sign({
            id: user._id,
            email: user.email
        }, JWT_SECRET, {
            expiresIn: '15d'
        });
        res.cookie("userToken", userToken, { httpOnly: true, secure: false })
        res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            token: userToken, 
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while logging in the user!",
            error: error.message
        });
    }
}

//* Logout Feature
export const logout = (req, res) => {
    try {
        res.clearCookie("userToken")
           .status(200).json({
            success: true,
            message: "User logged out successfully!"
           });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while logging out the user!",
            error: error.message
        });
    }
}

//* Check Authentication Feature
export const checkAuth = (req, res) => {
    jwt.verify(req.cookies.userToken, JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized! Please login again."
            });
        }

        try {
            const user = await User.findById(payload.id).select("-password");
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found!"
                });
            }

            return res.status(200).json({
                success: true,
                message: "User authenticated successfully!",
                user
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while checking authentication!",
                error: error.message
            });
        }
    });
};