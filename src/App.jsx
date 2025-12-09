import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CaseManagement from './pages/CaseManagement';
import UserManagement from './pages/UserManagement';
import NewCase from "./pages/NewCase";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes with Layout */}
          <Route 
            path="/" 
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />

            {/* CASE ROUTES */}
            <Route path="cases" element={<CaseManagement />} />
            <Route path="cases/new" element={<NewCase />} />   {/* <-- FIXED PLACE */}

            {/* USERS ROUTE */}
            <Route path="users" element={<UserManagement />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
