// src/views/chat/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentGroup } from '../../store/chat/chatSlice'; // Action to set current group
import { fetchGroups } from '../../services/internal';

const Sidebar = () => {
  const [groups, setGroups] = useState([]);
  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => state?.chat?.currentGroup);

  useEffect(() => {
    const loadGroups = async () => {
      const fetchedGroups = await fetchGroups();
      setGroups(fetchedGroups);
    };

    loadGroups();
  }, []);

  const handleGroupClick = (group) => {
    dispatch(setCurrentGroup(group));
  };

  return (
    <div className="sidebar">
      <h2>Your Groups</h2>
      <ul>
        {groups.map((group) => (
          <li
            key={group.id}
            onClick={() => handleGroupClick(group)}
            className={group.id === currentGroup.id ? 'active' : ''}
          >
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
