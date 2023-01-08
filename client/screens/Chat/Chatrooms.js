import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../../authContext';
import { fetchChatHistory, sendMessage } from '../../services/chatService';

const ChatHistory = (props) => {
  const { chatroom_id, isOpen, setIsOpen, recipient } = props;
  const auth = useContext(AuthContext);
  const token = auth.user.token;
  const [chatHistory, setChatHistory] = useState([]);
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (chatroom_id != null) {
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
            sendMessage(token, recipient, messageContent);
            setMessageContent('');
          }}
        />
      </View>
    </Modal>
  );
};

export const Chatrooms = (props) => {
  const { chatrooms, currentUser } = props;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatroomId, setChatroomId] = useState(null);
  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    const tryGetChatrooms = async  () => {
      try {
        const value = JSON.parse(await AsyncStorage.getItem('@user'))
        console.log(value)

        if (value !== null) {
          setUser({
            ...value
          })
        }
      } catch(e) {
        console.log(e)
      }
    }

    tryGetUser();

    // const timer = setTimeout(() => setShow(true), delay * 5000);

    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    // return () => {
    //   clearTimeout(timer1);
    // };

  }, []);

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
              setRecipient(chatroom_name[0]);
            }}
          >
            <Text>{chatroom_name}</Text>
          </div>
        );
      })}
      <ChatHistory chatroom_id={chatroomId} isOpen={isChatOpen} setIsOpen={setIsChatOpen} recipient={recipient} />
    </div>
  );
};
