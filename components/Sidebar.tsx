
import React from 'react';
import { UserProfile, TokenAccount } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentView: UserProfile['preferences']['defaultView'];
  setCurrentView: (view: UserProfile['preferences']['defaultView']) => void;
  user: UserProfile;
  wallet: TokenAccount;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentView, setCurrentView, user, wallet }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge' },
    { id: 'timeline', label: 'Timeline', icon: 'fa-timeline' },
    { id: 'chat', label: 'AI Historian', icon: 'fa-robot' },
    { id: 'search', label: 'Vault Search', icon: 'fa-vault' },
    { id: 'agentLogs', label: 'Agent Activity', icon: 'fa-microchip' },
    { id: 'notifications', label: 'Insights', icon: 'fa-brain' },
    { id: 'settings', label: 'Identity & Wallet', icon: 'fa-fingerprint' },
  ] as const;

  return (
    <aside className={`
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      fixed lg:relative z-40 w-64 h-full bg-slate-950 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0
    `}>
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <i className="fa-solid fa-scroll text-slate-950 text-xl"></i>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Historian AI</h1>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${currentView === item.id 
                    ? 'bg-cyan-500/10 text-cyan-400 shadow-inner' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
                `}
              >
                <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
                <span>{item.label}</span>
                {currentView === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Digital Passport</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs text-slate-400 truncate font-mono">{user.digitalIdentityId}</p>
          </div>

          <div className="flex items-center space-x-3 px-2">
            <img src={user.avatarUrl} alt="User" className="w-10 h-10 rounded-full bg-slate-800 p-0.5 border border-cyan-500/20" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
            <button className="text-slate-500 hover:text-slate-200 transition-colors">
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
