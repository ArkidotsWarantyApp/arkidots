import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard';
import UserManagement from './components/users/UserManagement';
import Settings from './pages/Settings';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode; adminOnly?: boolean }> = ({ 
  element, 
  adminOnly = false 
}) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{element}</>;
};

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<Dashboard />} />} 
        />
        <Route 
          path="/users" 
          element={<ProtectedRoute element={<UserManagement />} adminOnly={true} />} 
        />
        <Route 
          path="/settings" 
          element={<ProtectedRoute element={<Settings />} adminOnly={true} />} 
        />
        
        {/* Default route */}
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;