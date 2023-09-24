// group.api.routes.js

const express = require('express');
const router = express.Router();
const groupController = require('../controller/publisher-controller');
const { createPublisherValidationRules, idValidation } = require('../validation/publisher-validation');

router.post('/publishers', createPublisherValidationRules, groupController.createPublisher);

router.get('/publishers/:id', idValidation, groupController.getPublisherById);

module.exports = router;

