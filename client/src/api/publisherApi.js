import instance from "./axiosClient"

export const publisherApi = {
    getAllPublisher: async (page, size, sortField) => {
        const response = await instance.get('/api/publishers/', {
            params: { page, size, field: sortField }
        });
        return response.data;
    }, 
    updatePublisher: async (id, data) => {
        const response = await instance.put(`/api/publishers/update/${id}`, data);
        return response.data;
    }, 
    createPublisher: async (data) => {
        const response = await instance.post('/api/publishers/create', data);
        return response.data;
    }, 
    deletePublisher: async (id) => {
        const response = await instance.delete(`/api/publishers/delete/${id}`);
        return response.data;
    }
}