
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export async function getAllUsers(req, res) {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        const userObject = user.toObject();
        delete userObject.password;

        res.status(201).json({ success: true, data: userObject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const updatePayload = {};

        if (name) {
            updatePayload.name = name;
        }
        if (email) {
            updatePayload.email = email.toLowerCase();
        }
        if (password) {
            updatePayload.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updatePayload, {
            new: true,
            runValidators: true,
            select: "-password",
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: "Email already in use" });
        }
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}