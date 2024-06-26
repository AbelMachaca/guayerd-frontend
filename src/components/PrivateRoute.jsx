import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  console.log("PrivateRoute authsss:", auth);

  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default PrivateRoute;
