import React from "react";
import Card from "@/components/shared/Card";

const messages = [
  { from: "Alice", msg: "Hey! How’s it going?" },
  { from: "Bob", msg: "Are we meeting today?" },
  { from: "Clara", msg: "Loved your last post!" },
];

const RecentMessages = () => {
  return (
    <Card>
      <h3 className="font-bold mb-2">Recent Messages</h3>
      <ul className="space-y-2">
        {messages.map((msg, idx) => (
          <li key={idx} className="text-sm text-gray-600">
            <span className="font-medium">{msg.from}:</span> {msg.msg}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecentMessages;
