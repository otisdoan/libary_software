const publisherRepository = require('../repositories/publisherRepository');
class PublisherService {
    async createPublisher(publisherData) {
        const existingPublisher = await publisherRepository.existByName(publisherData.name);
        if (existingPublisher) {
            throw new Error('Publisher with this name already exists');
        }
        return await publisherRepository.create(publisherData);
    }

    async getPublisherById(publisherId) {
        return await publisherRepository.findById(publisherId);
    }
    async getAllPublishers(page, size, sortField, searchText) {
        return await publisherRepository.findAllPaginated(page, size, sortField, searchText);
    }
    async updatePublisher(publisherId, updateData) {
        if (updateData.name) {
            const existingPublisher = await publisherRepository.existByName(updateData.name);
            if (existingPublisher && existingPublisher.id !== publisherId) {
                throw new Error('Publisher with this name already exists');
            }
        }
        return await publisherRepository.update(publisherId, updateData);
    }
    async deletePublisher(publisherId) {
        return await publisherRepository.delete(publisherId);
    }
}
module.exports = new PublisherService();
