// src/views/chat/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '@/store/chat/chatSlice';
import { fetchUsers } from '@/services/internal';

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.chat.currentUser);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchUsers();
        // assume your API returns the array directly in res.data
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };
    loadUsers();
  }, []);

  const handleUserClick = (user) => {
    dispatch(setCurrentUser(user));
  };

  return (
    <div className="w-64 bg-white border-r overflow-y-auto">
      <h2 className="p-4 text-lg font-semibold">Chats</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => handleUserClick(user)}
            className={`
              cursor-pointer px-4 py-2 hover:bg-gray-100 
              ${currentUser?._id === user._id ? 'bg-blue-100 font-semibold' : ''}
            `}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
