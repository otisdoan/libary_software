
import instance from "./axiosClient";

export const categoryApi = {
    getAllCategories: async (page, size, sortField) => {
        const response = await instance.get('/api/categories/', {
            params: { page, size, field: sortField },
        });
        return response.data;
    },
    createCategory: async (data) => {
        const response = await instance.post('/api/categories/', data)
        return response.data;
    },
    deleteCategory: async (id) => {
        const response = await instance.delete(`/api/categories/${id}`)
        return response.data;
    }, 
    updateCategory: async (id, name) => {
        const response = await instance.put(`/api/categories/${id}`, name)
        return response.data;
    }
}