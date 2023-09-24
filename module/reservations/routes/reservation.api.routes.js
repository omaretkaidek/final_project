// group.api.routes.js

const express = require('express');
const router = express.Router();
const reservationController = require('../controller/publisher-controller');
const { createReservationValidationRules } = require('../validation/reservation-validation');

router.post('/reservations', createReservationValidationRules, reservationController.createReservation);


module.exports = router;

