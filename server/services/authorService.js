const authorRepository = require('../repositories/authorRepository');
class AuthorService {
    async create(authorData) {
        return await authorRepository.create(authorData);
    }
    async getAuthorById(authorId) {
        return await authorRepository.findById(authorId);
    }
    async getAllAuthors(page, size, sortField) {
        return await authorRepository.findAllPaginated(page, size, sortField);
    }
    async update(authorId, updateData) {
        return await authorRepository.update(authorId, updateData);
    }
    async delete(authorId) {
        return await authorRepository.delete(authorId);
    }
}
module.exports = new AuthorService();
