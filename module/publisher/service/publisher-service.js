// publisherService.js

const publisherModel = require('../model/publisher-model');

const publisherService = {
    async createPublisher(publisherData) {
        return await publisherModel.createPublisher(publisherData);
    },

    async getPublisherById(publisherId) {
        return await publisherModel.getPublisherById(publisherId);
    },
};

module.exports = publisherService;
