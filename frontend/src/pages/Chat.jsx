import React from 'react';
import Sidebar from '../components/chatUI/Sidebar';
import ChatWindow from '../components/chatUI/ChatWindow';

const Chat = () => {
  return (
    <div className="chat-container">
      {/* <Sidebar /> */}
      <ChatWindow />
    </div>
  );
};

export default Chat;
