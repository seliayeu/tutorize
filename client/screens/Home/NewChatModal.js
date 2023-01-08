import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../../authContext';
import { fetchChatHistory, sendMessage } from '../../services/chatService';

export const NewChatModal = (props) => {
  const { isOpen, setIsOpen, recipient } = props;
  const auth = useContext(AuthContext);
  const token = auth.user.token;
  const [chatroomId, setChatroomId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (chatroomId != null) {
      fetchChatHistory(token, chatroom_id).then((resp) => {
        const ch = resp.data;
        ch.sort((a, b) => a.timestamp - b.timestamp);
        console.log(ch);
        setChatHistory(ch);
      });

      const n = setInterval(() => {
        fetchChatHistory(token, chatroom_id).then((resp) => {
          const ch = resp.data;
          ch.sort((a, b) => a.timestamp - b.timestamp);
          console.log(ch);
          setChatHistory(ch);
        });
      }, 1000 * 30);

      return () => clearInterval(n);
    }
  }, [fetchChatHistory, setChatHistory, chatroomId]);

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
      <View style={{ flexDirection: 'row', marginTop: 'auto', alignSelf: 'stretch', padding: '10px' }}>
        <TextInput
          style={{ border: '1px black solid', width: '100%', padding: '10px' }}
          placeholder='Message'
          value={messageContent}
          onChangeText={setMessageContent}
        />
        <Button
          title='send'
          onPress={() => {
            setChatHistory((prev) => [...prev, { content: messageContent, user: auth.user.username }]);
            sendMessage(token, recipient, messageContent).then((resp) => {
              const new_chatroom_id = resp.data.id;
              setChatroomId(new_chatroom_id);
            });
            setMessageContent('');
          }}
        />
      </View>
    </Modal>
  );
};
