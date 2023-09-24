// PublisherModel.js

const knex = require('knex')(require('../../../knexfile'));

const tableName = 'publishers';

const PublisherModel = {
    async createPublisher(publisherData) {
        return await knex(tableName).insert(publisherData);
    },

    async getPublisherById(publisherId) {
        return await knex(tableName).where({ publisherId }).first();
    },

    async namePublisherExists(name) {
        const publisher = await knex(tableName).where({ name }).first();
        return Boolean(publisher); 
    },
};

module.exports = PublisherModel;