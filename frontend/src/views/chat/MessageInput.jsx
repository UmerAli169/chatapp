import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '@/services/internal';
import Button from '@/components/shared/Button';
import { FiPaperclip, FiX, FiSend } from 'react-icons/fi';

export default function MessageInput({
  chatId,
  onMessageSent,
  repliedTo = null,
  onCancelReply = () => {},
  currentUser
}) {
  const [content, setContent] = useState('');
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
        file: file ? {
          url: await uploadFileAndGetUrl(file),
          type: file.type,
          name: file.name
        } : null,
        repliedTo: repliedTo?._id,
        sender: currentUser
      };

      const res = await sendMessage(payload);
      onMessageSent(res.data);
      setContent('');
      setFile(null);
      onCancelReply();
    } catch (err) {
      console.error('Send message failed:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  async function uploadFileAndGetUrl(file) {
    // Implementation for file upload
    return URL.createObjectURL(file); // Temporary solution
  }

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {repliedTo && (
        <div className="flex items-center justify-between bg-blue-50 p-2 mb-2 rounded">
          <div className="text-sm text-blue-800 truncate">
            Replying to <span className="font-medium">{repliedTo.sender._id === currentUser._id ? 'yourself' : repliedTo.sender.name}</span>: {repliedTo.content}
          </div>
          <button 
            onClick={onCancelReply}
            className="text-blue-500 hover:text-blue-700"
          >
            <FiX size={18} />
          </button>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100"
        >
          <FiPaperclip size={20} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
        <div className="flex-1 relative">
          <textarea
            ref={textInputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full border border-gray-300 rounded-full py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="1"
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!content.trim() && !file}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <FiSend size={20} />
        </button>
      </div>

      {file && (
        <div className="flex items-center mt-2 text-sm bg-gray-100 p-2 rounded">
          <span className="text-gray-700 truncate flex-1">
            {file.name} ({Math.round(file.size / 1024)} KB)
          </span>
          <button
            onClick={() => setFile(null)}
            className="text-red-500 hover:text-red-700 ml-2"
          >
            <FiX size={18} />
          </button>
        </div>
      )}
    </div>
  );
}