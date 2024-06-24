import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    role: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded Token:', decoded);
        setAuth({
          token,
          isAuthenticated: true,
          user: decoded.user,
          role: decoded.user.role,
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
        setAuth({
          token: null,
          isAuthenticated: false,
          user: null,
          role: null,
        });
      }
    } else {
      setAuth({
        token: null,
        isAuthenticated: false,
        user: null,
        role: null,
      });
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token on Login:', decoded);
      setAuth({
        token,
        isAuthenticated: true,
        user: decoded.user,
        role: decoded.user.role,
      });
    } catch (error) {
      console.error('Failed to decode token on login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      token: null,
      isAuthenticated: false,
      user: null,
      role: null,
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Muestra un indicador de carga mientras se decodifica el token
  }

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
