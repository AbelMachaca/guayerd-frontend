import { useEffect, useState } from 'react';
import UserForm from './UserForm';

import UserCreateForm from './UserCreateForm';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [creatingUser, setCreatingUser] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (res.ok) {
        await fetchUsers(); // Recargar usuarios después de editar
        setEditingUser(null);
      } else {
        const data = await res.json();
        console.error('Failed to update user:', data);
      }
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.Id !== id));
      } else {
        console.error('Failed to delete user:', data);
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleCreate = async (id, formData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchUsers(); // Recargar usuarios después de crear
        setCreatingUser(false);
      } else {
        const data = await res.json();
        console.error('Failed to create user:', data);
      }
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      {editingUser ? (
        <UserForm
          user={editingUser}
          onSave={handleEdit}
          onCancel={() => setEditingUser(null)}
        />
      ) :  creatingUser ? (

        <UserCreateForm
          onSave={handleCreate}
          onCancel={() => setCreatingUser(false)}
        />
      ) : (
        <>
         <button onClick={() => setCreatingUser(true)}>Create New User</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.Id}>
                <td>{user.Name}</td>
                <td>{user.Email__c}</td>
                <td>{user.Role__c}</td>
                <td>
                  <button onClick={() => setEditingUser(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.Id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </div>
  );
};

export default UserManagement;

