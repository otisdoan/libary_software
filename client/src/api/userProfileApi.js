import instance from "./axiosClient"

export const useProfileApi = {
    getUserProfile: async (id) => {
        const response = await instance.get(`/api/user-profile/${id}`);
        return response.data;
    },
    upDateProfile: async (id, data) => {
        const response = await instance.put(`/api/user-profile/${id}`, data);
        return response.data;
    }
}