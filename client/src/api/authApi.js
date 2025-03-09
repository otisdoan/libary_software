import instance from "./axiosClient";

export const authApi = {
  login: async (email, password) => {
    const response = await instance.post("/api/auth/login", { email, password });
    return response.data;
  },
  register: async (email, password) => {
    const response = await instance.post("/api/auth/register", { email, password })
    return response.data;
  },
  activate: async (token) => {
    const response = await instance.post("/api/auth/activate", { token });
    return response.data;
  },
  sendResetPasswordEmail: async (email) => {
    const response = await instance.post("/api/auth/reset-password-email", { email });
    return response.data;
  },
  resetPassword: async (token, newPassword, confirmPassword) => {
    const response = await instance.post(`/api/auth/reset-password`, { token, newPassword, confirmPassword });
    return response.data;
  },
  getAllUser: async (page, size, sortField, searchText) => {
    const response = await instance.get('/api/auth/', {
      params: { page, size, field: sortField, searchText } ,
    });
    return response.data;
  },
  getMyInfo: async () => {
    const response = await instance.get('/api/auth/get-my-info');
    return response.data;
  },
  updateRoleUser: async (id, role) => {
    const response = await instance.put(`/api/auth/assign-role/${id}`, {role})
    return response.data;
  },
  updateStatusUser: async (id, status) => {
    const response = await instance.put(`/api/auth/update-user-status/${id}`, {status})
    return response.data;
  }

};
