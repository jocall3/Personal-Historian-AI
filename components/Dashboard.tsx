
import React from 'react';
import { Memory, Tag } from '../types';

interface DashboardProps {
  memories: Memory[];
  tags: Tag[];
  onProcess: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ memories, tags, onProcess }) => {
  const stats = [
    { label: 'Total Memories', value: memories.length, icon: 'fa-book', color: 'text-blue-400' },
    { label: 'Analyzed', value: memories.filter(m => (m.aiGeneratedInsights?.length || 0) > 0).length, icon: 'fa-brain', color: 'text-cyan-400' },
    { label: 'Artifacts', value: memories.reduce((acc, m) => acc + m.assets.length, 0), icon: 'fa-images', color: 'text-emerald-400' },
    { label: 'Networks', value: new Set(memories.flatMap(m => m.peopleIds || [])).size, icon: 'fa-users', color: 'text-amber-400' },
  ];

  const recentMemories = [...memories].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Memory Matrix</h2>
          <p className="text-slate-400">Your life story, indexed and understood by your agents.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-cyan-900/20">
            <i className="fa-solid fa-plus mr-2"></i> New Entry
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center ${stat.color}`}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white">Recent Artifacts</h3>
            <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest">View All</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {recentMemories.map(memory => (
              <div key={memory.id} className="group bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={memory.assets[0]?.thumbnailUrl || 'https://picsum.photos/400/200'} 
                    alt={memory.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {memory.tagIds?.map(tid => {
                      const tag = tags.find(t => t.id === tid);
                      return tag ? (
                        <span key={tid} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/60 backdrop-blur-md text-white border border-white/10 uppercase tracking-tighter">
                          {tag.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">{memory.title}</h4>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">{memory.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {new Date(memory.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <button 
                      onClick={() => onProcess(memory.id)}
                      className="text-cyan-400 hover:text-cyan-300 p-1.5 rounded-lg bg-cyan-400/5 transition-colors"
                      title="Run AI Analysis"
                    >
                      <i className="fa-solid fa-sparkles text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">AI Recommendations</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <i className="fa-solid fa-lightbulb"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 mb-1">Reconnect with Sarah</p>
                  <p className="text-xs text-slate-500 leading-relaxed">It's been 3 years since your trip to Kyoto together. Share a memory?</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 mb-1">Growth Pattern Found</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Agent Mnemosyne noted a significant shift in your career sentiment since 2021.</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 rounded-xl border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors">
              Explore All Insights
            </button>
          </div>

          <div className="bg-gradient-to-br from-cyan-600 to-indigo-700 rounded-2xl p-6 shadow-xl shadow-cyan-900/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">Historical Ledger</h3>
            <p className="text-cyan-100/70 text-sm mb-4 relative z-10">Securely backup your entire memory vault to the decentralized grid.</p>
            <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-black/20 relative z-10 hover:bg-slate-100 transition-colors">
              Initiate Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
