import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // To get chatId from the URL
import './ChatWindow.css';

function ChatWindow() {
  const { chatId } = useParams(); // Fetch the chat ID from the URL
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const authToken = localStorage.getItem('authToken');
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken || !userId) {
      navigate('/login'); // Redirect to login if no user session
      return;
    }

    fetchChatData();
  }, [chatId, authToken, userId, navigate]);

  const fetchChatData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      if (data) {
        setRecipientName(data.recipientName); // Set recipient name
        setChatMessages(data.messages); // Set messages
      }
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const response = await fetch('http://localhost:5000/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ chatId, userId, message }),
      });

      if (response.ok) {
        setMessage('');
        fetchChatData(); // Re-fetch chat after sending a new message
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{recipientName}</h2>
      </div>
      <div className="chat-history">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === userId ? 'sent' : 'received'}`}
          >
            <p>{msg.text}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
