
import React from 'react';
import { Notification } from '../types';

interface NotificationsProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const NotificationsList: React.FC<NotificationsProps> = ({ notifications, setNotifications }) => {
  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Historian Insights</h2>
          <p className="text-slate-400">Knowledge derived from your digital footprint.</p>
        </div>
        <button 
          onClick={clearAll}
          className="text-xs font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors"
        >
          Clear Memory Cache
        </button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/30 border border-slate-700 border-dashed rounded-3xl">
            <i className="fa-solid fa-inbox text-slate-700 text-4xl mb-4 block"></i>
            <p className="text-slate-500">All insights processed. Your mental vault is clear.</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div 
              key={notif.id} 
              onClick={() => markAsRead(notif.id)}
              className={`
                group relative p-6 rounded-3xl border transition-all cursor-pointer
                ${notif.read 
                  ? 'bg-slate-800/20 border-slate-800' 
                  : 'bg-slate-800/60 border-slate-700 hover:border-cyan-500/50 shadow-lg shadow-cyan-900/10'}
              `}
            >
              <div className="flex gap-5">
                <div className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110
                  ${notif.type === 'agent' ? 'bg-indigo-500/10 text-indigo-400' :
                    notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                    notif.type === 'transaction' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-cyan-500/10 text-cyan-400'}
                `}>
                  <i className={`fa-solid ${
                    notif.type === 'agent' ? 'fa-microchip' :
                    notif.type === 'success' ? 'fa-check-circle' :
                    notif.type === 'transaction' ? 'fa-receipt' :
                    'fa-info-circle'
                  } text-xl`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {notif.type} • {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${notif.read ? 'text-slate-500' : 'text-slate-200 font-medium'}`}>
                    {notif.message}
                  </p>
                  <div className="mt-4 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest">Explore Connection</button>
                    <span className="text-slate-700">•</span>
                    <button className="text-[10px] font-bold text-slate-500 hover:text-slate-400 uppercase tracking-widest">Archive</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
