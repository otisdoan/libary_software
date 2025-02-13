import instance from "./axiosClient";

export const authApi = {
  login: async (email, password) => {
    const response = await instance.post("/api/auth/login", { email, password });
    return response.data;
  },
  register: async (email, password) => {
    const response = await instance.post("/api/auth/register", {email, password})
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
  }
};
