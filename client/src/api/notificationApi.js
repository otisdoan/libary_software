import instance from "./axiosClient"

export const notificationApi = {
    getAllNotification: async (id, page, size) => {
        const response = await instance.get(`/api/notifications/${id}`, {
            params: {page, size}
        });
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