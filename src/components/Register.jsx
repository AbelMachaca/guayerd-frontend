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

  const [message, setMessage] = useState('');

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
        setMessage(data.msg || 'Failed to register');

        console.log("hola",data);
        console.log('Registration failed:', data.msg || 'Failed to register');
        return;
      }

      console.log('Registration successful, token:', data.token);
      console.log('daattttaavbbvcbv:', data);

      login(data.token);
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
        setMessage('Server error');
      console.error('Server error:', err.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
        {message && <p>{message}</p>}
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
