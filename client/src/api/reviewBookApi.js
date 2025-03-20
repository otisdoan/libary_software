import instance from "./axiosClient"

export const reviewBookApi = {
    creatReview: async (data) => {
        const response = await instance.post('/api/review/create', data);
        return response.data;
    }
}