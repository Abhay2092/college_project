import React from 'react';
import { useAuth } from '../context/AuthContext';
import { cases } from '../data/mockData';
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();

  // Filter cases based on role
  const myCases = cases.filter(c => {
    if (user.role === 'Admin') return true;
    if (user.role === 'Judge') return c.assignedJudgeId === user.id;
    if (user.role === 'Lawyer') return c.assignedLawyerId === user.id;
    if (user.role === 'Person') return c.clientId === user.id;
    return false;
  });

  const activeCases = myCases.filter(c => c.status === 'Active').length;
  const pendingCases = myCases.filter(c => c.status === 'Pending').length;
  const closedCases = myCases.filter(c => c.status === 'Closed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <span className="text-sm text-gray-500">Welcome back, {user.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Cases" 
          value={myCases.length} 
          icon={FileText} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Active Cases" 
          value={activeCases} 
          icon={Clock} 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="Pending Review" 
          value={pendingCases} 
          icon={AlertTriangle} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Closed Cases" 
          value={closedCases} 
          icon={CheckCircle} 
          color="bg-emerald-500" 
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Recent Cases</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Case Title</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Next Hearing</th>
                <th className="px-6 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myCases.slice(0, 5).map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{c.title}</p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{c.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      c.status === 'Active' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      c.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {c.nextHearing || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.role}
                  </td>
                </tr>
              ))}
              {myCases.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No cases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
