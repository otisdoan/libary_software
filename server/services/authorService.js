const authorRepository = require('../repositories/authorRepository');

class AuthorService {
    async create(authorData) {
        const existingAuthor = await authorRepository.existByName(authorData.name);
        if (existingAuthor) {
            throw new Error('Author with this name already exists');
        }
        return await authorRepository.create(authorData);
    }

    async getAuthorById(authorId) {
        return await authorRepository.findById(authorId);
    }

    async getAllAuthors(page, size, sortField, searchText) {
        return await authorRepository.findAllPaginated(page, size, sortField, searchText);
    }

    async update(authorId, updateData) {
        if (updateData.name) {
            const existingAuthor = await authorRepository.existByName(updateData.name);
            if (existingAuthor && existingAuthor.id !== authorId) {
                throw new Error('Author with this name already exists');
            }
        }
        return await authorRepository.update(authorId, updateData);
    }

    async delete(authorId) {
        return await authorRepository.delete(authorId);
    }
}

module.exports = new AuthorService();