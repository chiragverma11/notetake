import api from "../utils/axiosApi";

const authService = {
  login: async (data) => {
    try {
      const res = await api.post("login", data);

      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  signup: async (data) => {
    try {
      const res = await api.post("signup", data);

      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  logout: async () => {
    try {
      const res = await api.post("logout");
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  loadUser: async () => {
    try {
      const res = await api.get("user");
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default authService;
