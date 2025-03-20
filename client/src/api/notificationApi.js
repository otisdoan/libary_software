import instance from "./axiosClient"

export const notificationApi = {
    getAllNotification: async (id) => {
        const response = await instance.get(`/api/notifications/${id}`);
        return response.data;
    },
    maskAsRead: async (id) => {
        const response = await instance.put(`/api/notifications/${id}/read`);
        return response.data;
    }
}