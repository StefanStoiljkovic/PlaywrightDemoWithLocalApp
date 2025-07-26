import React, { useState, useEffect } from 'react';

const apiBase = 'http://localhost:4000';

function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // Login handler
  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch(`${apiBase}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      fetchItems(data.token);
    } else {
      alert(data.error || 'Login failed');
    }
  }

  async function fetchItems(authToken) {
    const res = await fetch(`${apiBase}/items`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = await res.json();
    if (res.ok) {
      setItems(data);
    } else {
      alert(data.error || 'Failed to fetch items');
    }
  }

  async function handleAddItem(e) {
    e.preventDefault();
    if (!newItem.trim()) return;
    const res = await fetch(`${apiBase}/items`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ text: newItem }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems([...items, data]);
      setNewItem('');
    } else {
      alert(data.error || 'Add item failed');
    }
  }

  async function handleDelete(id) {
    const res = await fetch(`${apiBase}/items/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setItems(items.filter(item => item.id !== id));
    } else {
      alert('Delete failed');
    }
  }

  async function handleEdit(id) {
    setEditId(id);
    const item = items.find(i => i.id === id);
    setEditText(item.text);
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    const res = await fetch(`${apiBase}/items/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text: editText }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems(items.map(i => i.id === editId ? data : i));
      setEditId(null);
      setEditText('');
    } else {
      alert('Edit failed');
    }
  }

  if (!token) {
    return (
      <div style={{ maxWidth: 300, margin: 'auto', padding: 20 }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          /><br /><br />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          /><br /><br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Your Items</h2>
      <form onSubmit={handleAddItem}>
        <input
          placeholder="New item"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {editId === item.id ? (
              <form onSubmit={handleSaveEdit}>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {item.text} &nbsp;
                <button onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
