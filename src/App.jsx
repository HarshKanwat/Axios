// src/App.jsx
import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
  };

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleSave = (user) => {
    if (user.id) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
        .then(response => {
          setUsers(users.map(u => (u.id === user.id ? response.data : u)));
          setCurrentUser(null);
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      axios.post('https://jsonplaceholder.typicode.com/users', user)
        .then(response => {
          setUsers([...users, response.data]);
          setCurrentUser(null);
        })
        .catch(error => console.error('Error adding user:', error));
    }
  };

  const handleAddUser = () => {
    setCurrentUser(null);
  };

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={handleAddUser}>Add User</button>
      <UserForm currentUser={currentUser} onSave={handleSave} />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
