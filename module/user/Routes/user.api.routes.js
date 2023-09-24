// user.api.routes.js

const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');
const {updateUservalidation, idValidation, authenticationValidation, signInValidation, photoValidation} = require('../Validation/UserValidation');
const fileUploadMiddleware = require('../../Middlewares/FileUploadMiddleware');

// Map the HTTP verbs to controller methods
router.post('/register', fileUploadMiddleware.single('profilePhoto'), authenticationValidation, userController.register);

router.post('/login', signInValidation, userController.login);

// GET request to retrieve a user by ID
router.get('/users/:id', idValidation, userController.getUserById);

// PUT request to update a user by ID
router.put('/users/:id', idValidation, updateUservalidation, userController.updateUserById);

// DELETE request to delete a user by ID
router.delete('/users/:id', idValidation, userController.deleteUserById);

// Route for uploading a user's profile photo
router.post('/users/:userId/uploadPhoto', photoValidation, fileUploadMiddleware.single('profilePhoto'), userController.uploadProfilePhoto);

// Route for deleting a user's profile photo
router.delete('/users/:userId/deletePhoto', userController.deleteProfilePhoto);

module.exports = router;
