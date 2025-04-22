"use client"

import React from "react";
import { useSelector } from "react-redux";

const WelcomeBanner = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="bg-blue-100 p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold text-blue-700">
        Welcome back, {user?.username || "Guest"} 👋
      </h1>
      <p className="text-gray-600 mt-1">Let’s catch up on your chats.</p>
    </div>
  );
};

export default WelcomeBanner;
