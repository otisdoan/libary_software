import instance from "./axiosClient"

export const publisherApi = {
    getAllPublisher: async (page, size, sortField) => {
        const response = await instance.get('/api/publishers/get-all', {
            params: { page, size, field: sortField }
        });
        return response.data;
    }
}