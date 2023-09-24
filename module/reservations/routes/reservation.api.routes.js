// group.api.routes.js

const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservation-controller');
const { createReservationValidationRules } = require('../validation/reservation-validation');

router.post('/reservations', createReservationValidationRules, reservationController.createReservation);


module.exports = router;

