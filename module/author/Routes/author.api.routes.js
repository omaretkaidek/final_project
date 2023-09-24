// user.api.routes.js

const express = require('express');
const router = express.Router();
const authorController = require('../Controller/author-controller');
const { authorValidationRules, idValidation } = require('../validation/author-validation')
//const {updateUservalidation, idValidation, authenticationValidation, signInValidation, photoValidation} = require('../validation/author-validation');
//const fileUploadMiddleware = require('../../Middlewares/FileUploadMiddleware');

router.post('/authors', authorValidationRules, authorController.createAuthor);

router.get('/authors/:id', idValidation, authorController.getAuthorById);

module.exports = router;
