import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log('Auth Context in Dashboardssss:', auth);  // Añadimos este console.log
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1> asd Admin Dashboard</h1>
      <p>Welcome, Admin!</p>

      <p>Welcomhhhe, {auth.user?.name || 'User'}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
