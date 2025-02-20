import instance from "./axiosClient";

export const authorApi = {
    getAllAuthor: async (page, size, sortField) => {
        const response = await instance.get('/api/authors/get-all', {
            params: { page, size, field: sortField }
        });
        return response.data;
    }
}

