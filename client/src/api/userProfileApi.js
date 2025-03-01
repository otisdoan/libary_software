import instance from "./axiosClient"

export const useProfileApi = {
    getUserProfile: async (id) => {
        const response = await instance.get(`/api/user-profile/${id}`);
        return response.data;
    }
}