import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals.js';
import Menu from "./pages/menu.jsx";
import Login from "./pages/login.jsx";
import Usuarios from "./pages/usuarios.jsx";
import Graficas from "./pages/graficas.jsx";
import Alertas from "./pages/Alertas.jsx";
import Reportes from "./pages/reportes.jsx";
import Bombas from "./pages/BombasInfo.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route 
          path="/menu" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Menu onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/usuarios" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Usuarios />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/graficas" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Graficas />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reportes" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Reportes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/alertas" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Alertas />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/agregar-bomba" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Bombas />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
