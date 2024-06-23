import { useState, useContext  } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const { name, email, password, role } = formData;
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Failed to register');
      }

      login(data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.message);
    }
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
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
      </div>
      <div>
        <label>Role</label>
        <input type="text" name="role" value={role} onChange={onChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
