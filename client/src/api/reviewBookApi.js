import instance from "./axiosClient"

export const reviewBookApi = {
    creatReview: async (data) => {
        const response = await instance.post('/api/review/create', data);
        return response.data;
    },
    getAllReview: async (id, page, size, sortField) => {
        const response = await instance.get(`/api/review/get-all/${id}`,{
            params:{ page, size, sortField}
        });
        return response.data;
    },
    updateReview: async (id, data) => {
        const response = await instance.put(`/api/review/update/${id}`,data);
        return response.data;
    }
}