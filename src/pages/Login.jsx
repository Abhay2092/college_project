import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  // Helper to fill credentials for demo
  const fillCredentials = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-indigo-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-indigo-100">Sign in to access the Case Management System</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3">
              <AlertCircle className="text-red-500" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8">
            <p className="text-xs text-center text-gray-500 uppercase tracking-wider mb-4">Quick Login (Demo)</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => fillCredentials('admin@cms.com')} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded border border-gray-200 transition-colors">Admin</button>
              <button onClick={() => fillCredentials('judge@cms.com')} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded border border-gray-200 transition-colors">Judge</button>
              <button onClick={() => fillCredentials('lawyer@cms.com')} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded border border-gray-200 transition-colors">Lawyer</button>
              <button onClick={() => fillCredentials('client@cms.com')} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded border border-gray-200 transition-colors">Person</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
