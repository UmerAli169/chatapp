"use client";
import { useSelector } from 'react-redux';

export default function ChatWindow() {
  const currentUser = useSelector((state: any) => state.chat.currentUser);
  if (!currentUser) {
    return <div>Select a chat to start messaging!</div>;
  }

  return (
    <div>
      <h1>Chat with {currentUser.username}</h1>
    </div>
  );
}
