import instance from "./axiosClient";

export const authorApi = {
    getAllAuthor: async (page, size, sortField) => {
        const response = await instance.get('/api/authors/', {
            params: { page, size, field: sortField }
        });
        return response.data;
    },
    updateAuthor: async (id, data) => {
        const response = await instance.put(`/api/authors/update/${id}`, data);
        return response.data;
    },
    deleteAuthor: async (id) => {
        const response = await instance.delete(`/api/authors/delete/${id}`);
        return response.data;
    },
    createAuthor: async (data) => {
        const response = await instance.post('/api/authors/create', data);
        return response.data;
    }
}

