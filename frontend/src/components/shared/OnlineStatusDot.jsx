import React from "react";

const OnlineStatusDot = ({ online }) => {
  return (
    <span
      className={`w-2.5 h-2.5 rounded-full inline-block ${online ? "bg-green-500" : "bg-gray-400"}`}
    ></span>
  );
};

export default OnlineStatusDot;