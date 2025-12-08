import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FileText, Users, Gavel, Scale } from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const getLinks = () => {
    const common = [
      { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    ];

    switch (user?.role) {
      case 'Admin':
        return [
          ...common,
          { to: '/cases', icon: <FileText size={20} />, label: 'All Cases' },
          { to: '/users', icon: <Users size={20} />, label: 'Manage Users' },
        ];
      case 'Judge':
        return [
          ...common,
          { to: '/cases', icon: <Gavel size={20} />, label: 'My Cases' },
        ];
      case 'Lawyer':
        return [
          ...common,
          { to: '/cases', icon: <Scale size={20} />, label: 'Assigned Cases' },
        ];
      case 'Person':
        return [
          ...common,
          { to: '/cases', icon: <FileText size={20} />, label: 'My Cases' },
        ];
      default:
        return common;
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 bottom-0 z-10">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-lg font-bold tracking-wide text-indigo-400">CMS Portal</span>
      </div>
      <div className="flex-1 py-6 px-3 space-y-1">
        {getLinks().map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {link.icon}
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="p-4 border-t border-slate-800">
        <p className="text-xs text-slate-500 text-center">© 2023 CMS Portal</p>
      </div>
    </aside>
  );
};

export default Sidebar;
