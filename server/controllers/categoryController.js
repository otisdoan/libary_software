const categoryService = require('../services/categoryService');

class CategoryController {
    async createCategory(req, res) {
        try {
            const category = await categoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateCategory(req, res) {
        try {
            const category = await categoryService.updateCategory(req.params.id, req.body);
            res.json(category);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            await categoryService.deleteCategory(req.params.id);
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getCategoryById(req, res) {
        try {
            const category = await categoryService.getCategoryById(req.params.id);
            res.json(category);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getAllCategories(req, res) {
        try {
            // Get and validate pagination parameters from query parameters
            const page = Math.max(1, parseInt(req.query.page) || 1); 

            const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10)); 
            const sortField = ['createdAt', 'name', 'updatedAt'].includes(req.query.field) 
                ? req.query.field 
                : 'createdAt'; 

            const result = await categoryService.getAllCategories(page, size, sortField);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new CategoryController(); 