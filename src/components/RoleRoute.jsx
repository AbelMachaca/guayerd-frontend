import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

const RoleRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  console.log("RoleRoute role", auth.role)
  console.log("RoleRoute auth:", auth); // Añadir este log para depurar
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (auth.role !== role) {
    if (auth.role === 'admin') {
      return <Navigate to="/admin" />;
    } else if (auth.role === 'mentor') {
      return <Navigate to="/mentor" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
};

RoleRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string.isRequired
};

export default RoleRoute;



/* import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

import { jwtDecode } from "jwt-decode";


const RoleRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  console.log("asd eeeee",auth);
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (decoded.user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

RoleRoute.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.node.isRequired
  };

export default RoleRoute;

 */




/* import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';
const RoleRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  console.log("asd",auth);
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (auth.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

RoleRoute.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.node.isRequired
  };

export default RoleRoute; */
