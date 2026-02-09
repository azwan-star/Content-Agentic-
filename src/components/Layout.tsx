import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, PenTool, Calendar, Settings, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/review', icon: PenTool, label: 'Review' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-slate-800/50 bg-slate-950/50 backdrop-blur-xl fixed h-full z-50 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Ghost className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            GhostWrite
          </span>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? 'text-white bg-slate-800/50 shadow-inner' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-slate-800/50 rounded-xl border border-slate-700/50"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className="w-5 h-5 relative z-10" />
                <span className="font-medium relative z-10 hidden lg:block">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500" />
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-white">Demo User</p>
              <p className="text-xs text-slate-500">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 z-50 px-6 py-4 flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              p-2 rounded-lg transition-colors
              ${isActive ? 'text-indigo-400 bg-indigo-400/10' : 'text-slate-400'}
            `}
          >
            <item.icon className="w-6 h-6" />
          </NavLink>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-20 lg:ml-64 p-6 md:p-12 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
