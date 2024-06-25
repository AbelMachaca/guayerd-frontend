import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MentorDashboard = () => {

    const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log('Auth Context in Dashboardssss:', auth);  // Añadimos este console.log
  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <div>
      <h1>Mentor Dashboard</h1>
      <p>Welcome to the mentor dashboard!</p>

      <p>Welcomhhhe, {auth.user?.name || 'User'}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MentorDashboard;
