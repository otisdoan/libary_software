import instance from "./axiosClient"

export const notificationApi = {
    getAllNotification: async (id) => {
        const response = await instance.get(`/api/notifications/${id}`);
        return response.data;
    },
    maskAsRead: async (id) => {
        const response = await instance.put(`/api/notifications/${id}/read`);
        return response.data;
    },
    deleteNotification: async (id) => {
        const reponse = await instance.delete(`/api/notifications/${id}`);
        return reponse.data;
    },
    markAllReaded: async (id) => {
        const reponse = await instance.put(`/api/notifications/${id}/read-all`);
        return reponse.data;
    }
}