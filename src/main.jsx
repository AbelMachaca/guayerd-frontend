import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

import AuthProvider from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from './components/Dashboard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
     <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  </Router>
  </AuthProvider>
  </React.StrictMode>
)
