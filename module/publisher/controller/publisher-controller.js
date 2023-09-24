// PublisherController.js

const publisherService = require('../service/publisher-service');
const { validationResult } = require('express-validator');

exports.createPublisher = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const publisherData = {
            name: req.body.name,
            establishDate: req.body.establishDate,
            stillWorking: req.body.stillWorking
        };

        const PublisherId = await publisherService.createPublisher(publisherData);
        return res.status(201).json({ id: PublisherId });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.getPublisherById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
        const publisherId = req.params.id;
        const publisher = await publisherService.getPublisherById(publisherId);

        if (!publisher) {
            return res.status(404).json({ message: "Publisher not found" });
        }

        return res.status(200).json(publisher);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


