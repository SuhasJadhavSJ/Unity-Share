// import React, { useState, useEffect, useRef } from 'react';
// import './ChatWindow.css';

// function ChatWindow({ selectedContact, messages, onSendMessage }) {
//   const [message, setMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   const handleSendClick = () => {
//     if (message.trim()) {
//       onSendMessage(message);
//       setMessage('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendClick();
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         {selectedContact ? `Chatting with ${selectedContact}` : 'Select a contact to start chatting'}
//       </div>
//       <div className="chat-messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`chat-message ${msg.sender === 'You' ? 'user' : 'friend'}`}>
//             <span>{msg.text}</span>
//             <span className="timestamp">{msg.timestamp}</span>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       {selectedContact && (
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type a message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//           />
//           <button onClick={handleSendClick}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatWindow;

import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';

function ChatWindow({ selectedContact, messages, onSendMessage }) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendClick = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        {selectedContact ? `Chatting with ${selectedContact}` : 'Select a contact to start chatting'}
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === 'You' ? 'user' : 'friend'}`}>
            <span>{msg.text}</span>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {selectedContact && (
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSendClick}>Send</button>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
