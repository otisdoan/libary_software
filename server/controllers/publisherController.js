const publisherService = require('../services/publisherService');

const publisherController = {
    createPublisher: async (req, res) => {
        try {
            const publisher = await publisherService.createPublisher(req.body);
            res.status(201).json(publisher);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    getAllPublishers: async (req, res) => {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10));
            const sortField = req.query.sortField || 'createdAt';
            const searchText = req.query.searchText || '';

            const result = await publisherService.getAllPublishers(page, size, sortField, searchText);

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updatePublisher: async (req, res) => {
        try {
            const updatedPublisher = await publisherService.updatePublisher(req.params.id, req.body);
            if (!updatedPublisher) {
                return res.status(404).json({error: 'Publisher not found'});
            }
            res.json(updatedPublisher);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    deletePublisher: async (req, res) => {
        try {
            const deletedPublisher = await publisherService.deletePublisher(req.params.id);
            if (!deletedPublisher) {
                return res.status(404).json({error: 'Publisher not found'});
            }
            res.status(204).end();
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    getPublisherById: async (req, res) => {
        try {
            const publisher = await publisherService.getPublisherById(req.params.id);
            if (!publisher) {
                return res.status(404).json({error: 'Publisher not found'});
            }
            res.json(publisher);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
};

module.exports = publisherController;