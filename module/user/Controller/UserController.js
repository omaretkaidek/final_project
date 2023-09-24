// userController.js

const UserService = require('../Service/UserService');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fileService = require('../../FileManager/Service/FileService');
const FileController = require('../../FileManager/Controller/FileController');
exports.createUser = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        // Call the service method to handle the business logic
        const newUser = await UserService.registerUser(req.body);
        console.log("User created successfully");

        // Send back the appropriate response
        return res.status(201).json(newUser);
    } catch (error) {
        // Handle errors (e.g., database issues, unexpected errors, etc.)
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Sample method for getting a user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update user by ID
exports.updateUserById = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        const userId = req.params.id;
        const updatedData = req.body;

        const updatedUser = await UserService.updateUserById(userId, updatedData);

        if (!updatedUser || updatedUser.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const result = await UserService.deleteUserById(userId);

        if (result === 0) { // Assuming the service returns 0 if no rows were deleted
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(204).send(); // 204 No Content for successful delete
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const userProfile = await UserService.getUserProfile(userId);
        res.send(userProfile);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { Email, Password } = req.body;

        const user = await UserService.signInUser(Email, Password)
        
        const permissions = await UserService.getUserPermissions(user.id);

        const tokenPayload = { 
            id: user.id,
            permissions: permissions.map(permission => permission.name)
        };
        const token = jwt.sign(tokenPayload, 'your_jwt_secret', { expiresIn: '1h' });

        res.send({ token, user, permissions });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(400).send({ message: err.message });
    }
};

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let profilePhotoId = null;

        // Pass the profile photo ID to your user registration service
        const userId = await UserService.registerUser({ ...req.body, profilePhotoId });

        if (req.file) {
            // Use the fileService to handle the file and get its ID
            const fileId = await fileService.uploadFile(req.file, "users");
            // Now, save this fileId in the users table for the specific user
            await UserService.setProfilePhotoId(userId, fileId);
        }

        res.status(201).send({ message: 'User registered' });
    } catch (err) {
        console.error("Error during user registration:", err.message);  // Printing the error
        res.status(400).send({ message: err.message });
    }
};


exports.uploadProfilePhoto = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Use the fileService to handle the file and get its ID
        const fileId = await fileService.uploadFile(req.file, "users");
        // Now, save this fileId in the users table for the specific user
        await UserService.setProfilePhotoId(userId, fileId);

        res.status(200).json({ message: "Profile photo uploaded successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProfilePhoto = async (req, res) => {
    try {
        const userId = req.params.userId;
        const fileId = await UserService.getProfilePhotoId(userId);
        await UserService.removeProfilePhotoId(userId);
        await fileService.deleteFileById(fileId);
        res.status(200).json({ message: "Profile photo deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
