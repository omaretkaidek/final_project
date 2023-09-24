// publisherService.js

const reservationModel = require('../model/reservation-model');

async function createReservation(reservationData) {
    return await reservationModel.createReservation(reservationData);
}

module.exports = {
    createReservation,
};

