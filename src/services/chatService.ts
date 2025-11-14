import api from './api'; 

export const getChats = async () => {
  const res = await api.get("/chats/");
  return res.data;
};

export const createChat = async (content) => {
  const res = await api.post("/chats/create/", { content });
  return res.data;
};