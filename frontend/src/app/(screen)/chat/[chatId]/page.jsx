"use client";

import { useParams } from "next/navigation";

export default function ChatDetailPage() {
  const params = useParams();
  const chatId = params.chatId;

  return (
    <div>
      <h1 className="text-xl font-semibold">Chat ID: {chatId}</h1>
    </div>
  );
}
