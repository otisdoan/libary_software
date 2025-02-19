import instance from "./axiosClient"

export const bookApi = {
    getAllBook: async (page, size, sortField) => {
        const response = await instance.get('/api/books/', {
            params: { page, size, field: sortField },
        });
        return response.data;
    },
}