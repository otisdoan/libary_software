import instance from "./axiosClient";

export const authApi = {
  login: async (email, password) => {
    const response = await instance.post("/api/auth/login", { email, password });
    return response.data;
  },
  register: async (email, password) => {
    const response = await instance.post("/api/auth/register", {email, password})
    return response.data;
  }
};
