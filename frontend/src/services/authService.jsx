import api from "../utils/axiosApi";

const authService = {
  login: async (data) => {
    try {
      const res = await api.post("/login", data);

      return res;
    } catch (error) {
      throw error;
    }
  },
  signup: async (data) => {
    try {
      const res = await api.post("/signup", data);

      return res;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const res = await api.post("/logout");
      return res;
    } catch (error) {
      throw error;
    }
  },
  loadUser: async () => {
    try {
      const res = await api.get("/user");
      return res;
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (data) => {
    try {
      const res = await api.post("/forgot-password", data);
      return res;
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (data) => {
    try {
      const res = await api.patch(`/reset-password/${data.token}`, data);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
