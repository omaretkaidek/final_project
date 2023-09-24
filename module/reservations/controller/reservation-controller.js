// PublisherController.js

const reservationService = require('../service/reservation-service');
const { validationResult } = require('express-validator');


exports.createReservation = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
        const reservationData = req.body; // Get the reservation details from the request body
        const newReservation = await reservationService.createReservation(reservationData);
        res.status(201).json(newReservation); // Return the created reservation
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).send({ message: 'Error creating reservation' });
    }
};



