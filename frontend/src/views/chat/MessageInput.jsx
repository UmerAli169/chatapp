// src/views/chat/MessageInput.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/services/internal";
import Button from "@/components/shared/Button";

export default function MessageInput({
  chatId,
  onMessageSent,
  repliedTo = null,
  onCancelReply = () => {}
}) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const textInputRef = useRef();
  useEffect(() => {
    textInputRef.current?.focus();
  }, [repliedTo]);

  const handleSend = async () => {
    if (!content.trim() && !file) return;

    try {
      const payload = { 
        chatId, 
        content, 
        file: file 
          ? { 
              url: await uploadFileAndGetUrl(file), 
              type: file.type 
            } 
          : null, 
        repliedTo 
      };

      const res = await sendMessage(payload);
      onMessageSent(res.data);
      setContent("");
      setFile(null);
      onCancelReply();
    } catch (err) {
      console.error("Send message failed:", err);
    }
  };

  async function uploadFileAndGetUrl(file) {
    // e.g. POST to `/upload` → get { url }
    // return (await fetchUpload(...)).url;
    return new Promise((resolve) => {
      setTimeout(() => resolve(URL.createObjectURL(file)), 300);
    });
  }

  return (
    <div className="border-t p-4 flex flex-col">
      {repliedTo && (
        <div className="bg-gray-100 p-2 mb-2 rounded flex justify-between items-center">
          <span className="text-sm text-gray-700">
            Replying to message <strong>{repliedTo}</strong>
          </span>
          <button onClick={onCancelReply} className="text-red-500">
            ×
          </button>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          📎
        </button>
        <input
          ref={textInputRef}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <Button
          label="Send"
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        />
      </div>

      {file && (
        <div className="mt-2 text-sm text-gray-600">
          Attached: {file.name}{" "}
          <button
            onClick={() => setFile(null)}
            className="ml-2 text-red-500"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
