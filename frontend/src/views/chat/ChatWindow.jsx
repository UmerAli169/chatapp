// src/views/chat/ChatWindow.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { fetchGroupMessages } from '../../services//internal';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const currentGroup = useSelector((state) => state.chat.currentGroup);

  useEffect(() => {
    if (currentGroup) {
      const loadMessages = async () => {
        const fetchedMessages = await fetchGroupMessages(currentGroup.id);
        setMessages(fetchedMessages);
      };

      loadMessages();
    }
  }, [currentGroup]);

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>
      <MessageInput groupId={currentGroup?.id} />
    </div>
  );
};

export default ChatWindow;
