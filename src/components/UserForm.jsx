// components/UserForm.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.Id || '',
        name: user.Name || '',
        email: user.Email__c || '',
        role: user.Role__c || ''
      });
    }
  }, [user]);

  const { name, email, role } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    onSave(formData.id, formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={onChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} required />
      </div>
      <div>
        <label>Role</label>
        <input type="text" name="role" value={role} onChange={onChange} required />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default UserForm;
