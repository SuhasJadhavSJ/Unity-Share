// import React, { useState } from 'react';
// import Sidebar from '../components/chatUI/Sidebar';
// import ChatWindow from '../components/chatUI/ChatWindow';
// import './Chat.css';

// function Chat() {
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [chats, setChats] = useState({
//     'John Doe': [{ text: 'Hi, how are you?', sender: 'John Doe' }],
//     'Jane Smith': [{ text: 'Let\'s meet tomorrow', sender: 'Jane Smith' }]
//   });

//   const handleContactClick = (contact) => {
//     setSelectedContact(contact);
//   };

//   const handleSendMessage = (message) => {
//     if (selectedContact && message.trim()) {
//       setChats({
//         ...chats,
//         [selectedContact]: [...(chats[selectedContact] || []), { text: message, sender: 'You' }]
//       });
//     }
//   };

//   return (
//     <div className="chat-app">
//       <Sidebar contacts={Object.keys(chats)} onContactClick={handleContactClick} />
//       <ChatWindow
//         selectedContact={selectedContact}
//         messages={chats[selectedContact] || []}
//         onSendMessage={handleSendMessage}
//       />
//     </div>
//   );
// }

// export default Chat;
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/chatUI/Sidebar';
import ChatWindow from '../components/chatUI/ChatWindow';
import './Chat.css';

function Chat() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Fetch contacts when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/user/contacts');
        const data = await response.json();
        setContacts(data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Fetch messages for the selected contact
  useEffect(() => {
    if (selectedContact) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`/messages/${selectedContact}`);
          const data = await response.json();
          setMessages(data.messages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  }, [selectedContact]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleSendMessage = async (message) => {
    if (selectedContact && message.trim()) {
      try {
        // Send the message to the backend
        await fetch('/messages/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipient: selectedContact,
            message: message,
          }),
        });

        // Update the local messages state
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message, sender: 'You', timestamp: new Date().toISOString() },
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="chat-app">
      <Sidebar
        contacts={contacts}
        onContactClick={handleContactClick}
        activeContact={selectedContact}
      />
      <ChatWindow
        selectedContact={selectedContact}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default Chat;
