// userController.js

const authorService = require('../service/author-service');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createAuthor = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        // Call the service method to handle the business logic
        const newAuthor = await authorService.createAuthor(req.body);
        console.log("Author created successfully"); 

        // Send back the appropriate response
        return res.status(201).json(newAuthor);
    } catch (error) {
        // Handle errors (e.g., database issues, unexpected errors, etc.)
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Sample method for getting a user by ID
exports.getAuthorById = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
        const authorId = req.params.id;
        const author = await authorService.getAuthorById(authorId);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        return res.status(200).json(author);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
