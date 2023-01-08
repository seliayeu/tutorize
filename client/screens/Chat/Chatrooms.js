import { useContext, useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput } from 'react-native';
import { AuthContext } from '../../authContext';
import { fetchChatHistory } from '../../services/chatService';

const ChatHistory = (props) => {
  const { chatroom_id, isOpen, setIsOpen } = props;
  const auth = useContext(AuthContext);
  const token = auth.user.token;
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (chatroom_id != null) {
      fetchChatHistory(token, chatroom_id).then((resp) => {
        const ch = resp.data;
        ch.sort((a, b) => a.timestamp - b.timestamp);
        console.log(ch);
        setChatHistory(ch);
      });
    }
  }, [fetchChatHistory, setChatHistory, chatroom_id]);

  return (
    <Modal animationType='slide' transparent={false} visible={isOpen} onRequestClose={() => setIsOpen(!isOpen)}>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <Text>Hide Modal</Text>
      </Pressable>
      {chatHistory.map((ch, i) => {
        if (ch.user == auth.user.username) {
          return (
            <div key={i} style={{ marginLeft: 'auto', backgroundColor: 'lightblue' }}>
              {ch.content}
            </div>
          );
        } else {
          return (
            <div key={i} style={{ marginRight: 'auto', backgroundColor: 'lightgray' }}>
              {ch.content}
            </div>
          );
        }
      })}
    </Modal>
  );
};

export const Chatrooms = (props) => {
  const { chatrooms, currentUser } = props;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatroomId, setChatroomId] = useState(null);

  return (
    <div>
      {chatrooms.map((room) => {
        const { id, users } = room;
        const chatroom_name = [...users].filter((e) => e != currentUser);

        return (
          <div
            key={id}
            style={{ border: '1px solid black', padding: '20px' }}
            onClick={() => {
              setIsChatOpen(true);
              setChatroomId(id);
            }}
          >
            <Text>{chatroom_name}</Text>
          </div>
        );
      })}
      <ChatHistory chatroom_id={chatroomId} isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};
