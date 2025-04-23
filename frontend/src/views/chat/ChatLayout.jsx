// src/views/chat/ChatLayout.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

const ChatLayout = () => {
  const currentUser = useSelector((state) => state.chat.currentUser);

  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* If no user selected, show placeholder */}
      {currentUser ? (
        <ChatWindow chatId={currentUser._id} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat on the left to start messaging
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
