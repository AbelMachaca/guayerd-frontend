import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token')
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ token, isAuthenticated: true });
    } else {
      setAuth({ token: null, isAuthenticated: false });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
export default AuthProvider;
