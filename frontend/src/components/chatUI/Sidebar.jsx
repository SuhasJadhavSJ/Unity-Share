import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate to change routes
import './Sidebar.css';

function Sidebar() {
  const [chatHistory, setChatHistory] = useState([]);
  const userId = localStorage.getItem('user_id');
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken || !userId) {
      navigate('/login');
      return;
    }

    fetchChatHistory();
  }, [userId, authToken, navigate]);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/chat/history/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  return (
    <div className="sidebar">
      <h2>Chat History</h2>
      <div className="chat-list">
        {chatHistory.map((chat) => (
          <div
            key={chat.chatId}
            className="chat-item"
            onClick={() => navigate(`/chat/${chat.chatId}`)}
          >
            <p>{chat.recipientName}</p>
            <small>{chat.lastMessage}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
