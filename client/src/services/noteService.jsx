import api from "../utils/axiosApi";

const noteService = {
  fetchNotes: async () => {
    try {
      const res = await api.get("notes");
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  addNote: async (data) => {
    try {
      const res = await api.post("note", data);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteNote: async (id) => {
    try {
      const res = await api.delete(`note/${id}`);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateNote: async (data) => {
    try {
      const res = await api.patch(`note/${data._id}`, data);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default noteService;
