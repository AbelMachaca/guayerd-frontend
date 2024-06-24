
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

import AuthProvider from './context/AuthContext.jsx';
//import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from './components/Dashboard.jsx';

import RoleRoute from './components/RoleRoute.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

import PublicRoute from './components/PublicRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
     <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/dashboard" element={<RoleRoute role="student"><Dashboard /></RoleRoute>} />
      <Route path="/admin" element={<RoleRoute role="admin"><AdminDashboard/></RoleRoute>} />
    </Routes>
  </Router>
  </AuthProvider>
  
)
