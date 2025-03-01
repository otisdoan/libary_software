const authorService = require('../services/authorService');

const authorController = {
    createAuthor: async (req, res) => {
        try {
            const author = await authorService.create(req.body);
            res.status(201).json(author);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllAuthors: async (req, res) => {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10));
            const sortField = req.query.sortField || 'createdAt';
            const searchText = req.query.searchText || '';

            const result = await authorService.getAllAuthors(page, size, sortField, searchText);

            res.json(result); // Return the paginated authors
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAuthorById: async (req, res) => {
        try {
            const author = await authorService.getAuthorById(req.params.id);
            if (!author) {
                return res.status(404).json({ error: 'Author not found' });
            }
            res.json(author);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateAuthor: async (req, res) => {
        try {
            const updatedAuthor = await authorService.update(req.params.id, req.body);
            if (!updatedAuthor) {
                return res.status(404).json({ error: 'Author not found' });
            }
            res.json(updatedAuthor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            const deletedAuthor = await authorService.delete(req.params.id);
            if (!deletedAuthor) {
                return res.status(404).json({ error: 'Author not found' });
            }
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = authorController;