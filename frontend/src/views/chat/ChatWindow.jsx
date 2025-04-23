// src/views/chat/ChatWindow.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, markAsSeen } from '@/services/internal';
import { setMessages, addMessage } from '@/store/chat/chatSlice';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

export default function ChatWindow({ chatId }) {
  const dispatch = useDispatch();
  const messages = useSelector((s) => s.chat.messages);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMessages(chatId);
        dispatch(setMessages(res.data));
        // mark all as seen
        res.data.forEach((msg) => {
          if (!msg.seenBy?.includes(/* current user id from state? */)) {
            markAsSeen(msg._id);
          }
        });
      } catch (err) {
        console.error('Fetch messages failed:', err);
      }
    };
    if (chatId) fetch();
  }, [chatId, dispatch]);

  const handleMessageSent = (msg) => {
    dispatch(addMessage(msg));
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
      </div>
      <MessageInput chatId={chatId} onMessageSent={handleMessageSent} />
    </div>
  );
}
