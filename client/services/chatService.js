import axios from 'axios';
const baseUrl = 'http://localhost:4999';

export const getChatRooms = async (jwtToken) => {
  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };
  return await axios.post(`${baseUrl}/chatrooms`, {}, config);
};

export const fetchChatHistory = async (jwtToken, chatroomId) => {
  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };
  return await axios.post(`${baseUrl}/chat_history`, { chatroom_id: chatroomId }, config);
};

export const sendMessage = async (jwtToken, recipient, content) => {
  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };
  return await axios.post(`${baseUrl}/message`, { recipient, content }, config);
};
