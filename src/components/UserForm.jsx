// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ currentUser, onSave }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser({ name: '', email: '' });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{user.id ? 'Edit User' : 'Add User'}</h2>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
