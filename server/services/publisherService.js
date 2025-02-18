const publisherRepository = require('../repositories/publisherRepository');
class PublisherService {
    async createPublisher(publisherData) {
        return await publisherRepository.create(publisherData);
    }
    async getPublisherById(publisherId) {
        return await publisherRepository.findById(publisherId);
    }
    async getAllPublishers(page, size, sortField) {
        return await publisherRepository.findAllPaginated(page, size, sortField);
    }
    async updatePublisher(publisherId, updateData) {
        return await publisherRepository.update(publisherId, updateData);
    }
    async deletePublisher(publisherId) {
        return await publisherRepository.delete(publisherId);
    }
}
module.exports = new PublisherService();
