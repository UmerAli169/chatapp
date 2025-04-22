// src/views/chat/MessageBubble.jsx
import React from 'react';

const MessageBubble = ({ message }) => {
  return (
    <div className="message-bubble">
      <strong>{message.sender}</strong>: {message.text}
    </div>
  );
};

export default MessageBubble;
