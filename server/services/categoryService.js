const categoryRepository = require('../repositories/categoryRepository');

class CategoryService {
    async createCategory(categoryData) {
        return await categoryRepository.create(categoryData);
    }

    async updateCategory(id, categoryData) {
        return await categoryRepository.update(id, categoryData);
    }

    async deleteCategory(id) {
        return await categoryRepository.delete(id);
    }

    async getCategoryById(id) {
        return await categoryRepository.findById(id);
    }

    async getAllCategories(page, size, sortField) {
        return await categoryRepository.findAll(page, size, sortField);
    }
}

module.exports = new CategoryService(); 