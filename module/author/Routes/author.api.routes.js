// user.api.routes.js

const express = require('express');
const router = express.Router();
const authorController = require('../Controller/author-controller');
const { authorValidationRules, idValidation } = require('../validation/author-validation')

router.post('/authors', authorValidationRules, authorController.createAuthor);

router.get('/authors/:id', idValidation, authorController.getAuthorById);

module.exports = router;
