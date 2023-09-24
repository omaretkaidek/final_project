// PublisherModel.js

const knex = require('knex')(require('../../../knexfile'));

const tableName = 'reservations';

async function createReservation(reservationData) {
    const [id] = await knex(tableName).insert(reservationData); // MySQL will return the inserted ID
    const [newReservation] = await knex(tableName).where({ reservationId: id }); // Retrieve the inserted reservation using the ID
    return newReservation;
}


module.exports = {
    createReservation,
};