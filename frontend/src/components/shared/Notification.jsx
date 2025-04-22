"use client"

import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notifications = useSelector((state) => state.dashboard?.notifications);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications?.map((note, idx) => (
        <div
          key={idx}
          className="bg-green-100 text-green-800 px-4 py-2 rounded-xl shadow"
        >
          {note}
        </div>
      ))}
    </div>
  );
};

export default Notification;
