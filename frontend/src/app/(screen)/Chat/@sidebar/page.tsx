"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '@/store/chat/chatSlice';
import { fetchUsers } from '@/services/internal';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((s:any) => s.chat.currentUser);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchUsers();
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };
    loadUsers();
  }, []);

  const handleUserClick = (user:any) => {
    dispatch(setCurrentUser(user));

  };

  return (
    <div>
      <h2 className="p-4 text-lg text-black font-semibold">Chats</h2>
      <ul>
        {users.map((user:any) => (
          <li
            key={user._id}
            onClick={() => handleUserClick(user)}
            className={`cursor-pointer px-4 py-2 text-black ${
              currentUser?._id === user._id ? 'bg-blue-100 font-semibold' : ''
            }`}
          >
            {user.username}
          </li>
        ))}
       
      </ul>
    </div>
  );
}
