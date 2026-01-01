
import React from 'react';
import { AgentActivityLog, Agent } from '../types';

interface AgentActivityProps {
  agentLogs: AgentActivityLog[];
  agents: Agent[];
}

const AgentActivity: React.FC<AgentActivityProps> = ({ agentLogs, agents }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Neural Activity Log</h2>
          <p className="text-slate-400">Monitoring the autonomous operations of your digital historian agents.</p>
        </div>
        <div className="flex -space-x-3">
          {agents.map(agent => (
            <div 
              key={agent.id} 
              className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-cyan-400 ring-2 ring-cyan-500/20 hover:scale-110 transition-transform cursor-help"
              title={`${agent.name}: ${agent.status}`}
            >
              <i className={`fa-solid ${agent.type === 'analyzer' ? 'fa-magnifying-glass-chart' : 'fa-network-wired'} text-xs`}></i>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl overflow-hidden backdrop-blur-sm">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <i className="fa-solid fa-terminal text-cyan-500"></i>
            <span>Live Audit Trail</span>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            Agent Link Active
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Agent</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cost</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Signer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {agentLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <i className="fa-solid fa-wave-square text-slate-700 text-4xl mb-4 block"></i>
                    <p className="text-slate-500 text-sm">Waiting for agents to initiate background tasks...</p>
                  </td>
                </tr>
              ) : (
                agentLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-700/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                          <i className="fa-solid fa-microchip text-sm"></i>
                        </div>
                        <span className="text-sm font-semibold text-slate-200">
                          {agents.find(a => a.id === log.agentId)?.name || 'Orchestrator'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-200 font-mono">{log.action}</span>
                        <span className="text-[10px] text-slate-500 truncate max-w-[200px]">Entity: {log.relatedEntityId || 'global'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-purple-400 tabular-nums">{log.costInTokens} HST</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-emerald-400">
                          <i className="fa-solid fa-key"></i>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          {log.signature?.slice(0, 12)}...
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentActivity;
