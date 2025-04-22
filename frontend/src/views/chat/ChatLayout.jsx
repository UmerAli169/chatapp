import React from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const ChatLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatWindow />
    </div>
  );
};export default ChatLayout;
