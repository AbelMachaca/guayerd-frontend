import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';
const PublicRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (auth.isAuthenticated) {
    if (auth.role === 'admin') {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default PublicRoute;
