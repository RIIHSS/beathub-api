const userService = require('../services/user.service');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        if (error.name === 'CastError') return res.status(400).json({ message: "Invalid ID format" });
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ error: "Missing required fields" });
        const newUser = await userService.createNewUser({ username, email, password });
        res.status(201).json({ message: "User created!", user: newUser });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ error: "Username or Email already exists" });
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        if (error.name === 'CastError') return res.status(400).json({ message: "Invalid ID" });
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};