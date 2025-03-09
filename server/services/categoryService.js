const categoryRepository = require('../repositories/categoryRepository');

class CategoryService {
    async createCategory(categoryData) {
        const existingCategory = await categoryRepository.existByName(categoryData.name);
        if (existingCategory) {
            throw new Error('Category with this name already exists');
        }
        return await categoryRepository.create(categoryData);
    }

    async updateCategory(id, categoryData) {
        if (categoryData.name) {
            const existingCategory = await categoryRepository.existByName(categoryData.name);
            if (existingCategory && existingCategory._id.toString() !== id) {
                throw new Error('Category with this name already exists');
            }
        }
        return await categoryRepository.update(id, categoryData);
    }

    async deleteCategory(id) {
        return await categoryRepository.delete(id);
    }

    async getCategoryById(id) {
        return await categoryRepository.findById(id);
    }

    async getAllCategories(page, size, sortField, searchText) {
        return await categoryRepository.findAll(page, size, sortField, searchText);
    }
}

module.exports = new CategoryService();