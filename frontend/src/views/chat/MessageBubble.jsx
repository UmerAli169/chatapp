import React, { useState } from 'react';
import { editMessage, deleteMessage, pinMessage } from '@/services/internal';
import OnlineStatusDot from '@/components/shared/OnlineStatusDot';
import Button from '@/components/shared/Button';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FiPin } from 'react-icons/fi'; // Make sure this import is correct

export default function MessageBubble({ message }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(message.content);

  const handleEdit = async () => {
    try {
      const res = await editMessage(message._id, text);
      setText(res.data.content);
      setEditing(false);
    } catch (err) {
      console.error('Edit failed:', err);
    }
  };

  return (
    <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-shrink-0 pt-1">
        <OnlineStatusDot userId={message.sender._id} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-medium text-gray-900 truncate">
            {message.sender.name}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {message.repliedTo && (
          <div className="border-l-2 border-gray-200 pl-3 py-1 mb-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-600 truncate">
              <span className="font-medium">Replying to:</span> {message.repliedTo.content}
            </p>
          </div>
        )}

        {editing ? (
          <div className="flex flex-col gap-2">
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button 
                label="Cancel" 
                variant="outline" 
                onClick={() => setEditing(false)} 
                className="!px-3 !py-1.5 text-sm"
              />
              <Button 
                label="Save Changes" 
                onClick={handleEdit} 
                className="!px-3 !py-1.5 text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="relative group">
            <div className="bg-white p-3 rounded-lg shadow-xs border border-gray-200">
              <p className="text-gray-800 whitespace-pre-wrap break-words">
                {text}
              </p>
              {message.file && (
                <div className="mt-3">
                  <img
                    src={message.file.url}
                    alt="attachment"
                    className="max-w-full max-h-60 rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
            
            <div className="absolute -top-3 right-2 opacity-0 group-hover:opacity-100 flex gap-1 bg-white rounded-full shadow-xs border border-gray-200 p-1 transition-opacity">
              <button 
                onClick={() => setEditing(true)} 
                className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="Edit message"
              >
                <FiEdit2 size={14} />
              </button>
              <button 
                onClick={() => deleteMessage(message._id)} 
                className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                aria-label="Delete message"
              >
                <FiTrash2 size={14} />
              </button>
              <button 
                onClick={() => pinMessage(message._id)} 
                className="p-1 text-gray-500 hover:text-yellow-600 transition-colors"
                aria-label="Pin message"
              >
                {/* <FiPin size={14} /> */}
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          {message.seenBy?.length > 0 && (
            <span>Seen by {message.seenBy.length}</span>
          )}
          {message.pinned && (
            <span className="flex items-center gap-1 text-yellow-600">
              <FiPin size={12} /> Pinned
            </span>
          )}
        </div>
      </div>
    </div>
  );
}