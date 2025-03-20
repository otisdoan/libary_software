import instance from "./axiosClient"

export const bookApi = {
    getAllBook: async (page, size, sortField, searchText) => {
        const response = await instance.get('/api/books/', {
            params: { page, size, field: sortField, searchText },
        });
        return response.data;
    },
    createBook: async (data) => {
        const response = await instance.post('/api/books/', data);
        return response.data;
    },
    updateBook: async (id, data) => {
        const response = await instance.put(`/api/books/${id}`, data);
        return response.data;
    },
    deleteBook: async (id) => {
        const response = await instance.delete(`/api/books/${id}`);
        return response.data;
    },
    getBookById: async (id) => {
        const response = await instance.get(`/api/books/${id}`);
        return response.data;
    },
    searchBookByCategory: async (data) => {
        const response = await instance.get('/api/books/search/category', {
            "categories": data
        });
        return response.data;
    },
    searchBookByTitle: async (data) => {
        const response = await instance.get('/api/books/search/title', 
            { params: {title: data} }
        )
        return response.data;
    } 
}