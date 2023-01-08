import { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { AuthContext } from '../../authContext';
import { getChatRooms } from '../../services/chatService';
import { Chatrooms } from './Chatrooms';

const Chat = () => {
  const [chatrooms, setChatrooms] = useState([]);
  console.log('render');

  const auth = useContext(AuthContext);
  const token = auth.user.token;

  useEffect(() => {
    getChatRooms(token).then((resp) => setChatrooms(resp.data));
  }, [getChatRooms, setChatrooms]);

  return <Chatrooms chatrooms={chatrooms} currentUser={auth.user.username}></Chatrooms>;
};

export default Chat;
