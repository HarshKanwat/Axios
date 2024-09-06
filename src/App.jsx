// src/App.jsx
import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleEdit = (user) => {
    setCurrentUser(user);
  };

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setCurrentUser(null);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleSave = (user) => {
    setCurrentUser(null);
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm currentUser={currentUser} onSave={handleSave} />
      <UserList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
