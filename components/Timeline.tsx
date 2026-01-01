
import React from 'react';
import { Memory } from '../types';

interface TimelineProps {
  memories: Memory[];
  onProcess: (id: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ memories, onProcess }) => {
  const sortedMemories = [...memories].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">Memory River</h2>
        <p className="text-slate-400">The chronological flow of your digital existence.</p>
      </div>

      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-0 md:left-1/2">
        {sortedMemories.map((memory, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={memory.id} className={`relative mb-16 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:left-1/2'}`}>
              {/* Timeline dot */}
              <div className="absolute -left-1.5 md:left-auto md:right-[-7px] top-6 w-3 h-3 bg-cyan-500 rounded-full ring-4 ring-slate-900 z-10"></div>
              {/* Horizontal line connector for desktop */}
              <div className={`hidden md:block absolute top-7 h-0.5 bg-slate-800 w-12 ${isLeft ? 'right-0' : 'left-0'}`}></div>
              
              <div className="pl-8 md:pl-0">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4 border border-slate-700/50">
                  {new Date(memory.timestamp).toLocaleDateString(undefined, { month: 'long', year: 'numeric', day: 'numeric' })}
                </span>
                
                <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-3xl hover:border-slate-500 transition-all group overflow-hidden">
                  {memory.assets[0] && (
                    <div className="aspect-video w-full rounded-2xl mb-6 overflow-hidden border border-white/5 shadow-2xl">
                      <img src={memory.assets[0].thumbnailUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{memory.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{memory.summary}</p>
                  
                  {memory.aiGeneratedInsights && memory.aiGeneratedInsights.length > 0 && (
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-6 text-left">
                      <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <i className="fa-solid fa-brain"></i>
                        <span>AI Insight</span>
                      </div>
                      <p className="text-xs text-slate-300 italic">"{memory.aiGeneratedInsights[0]}"</p>
                    </div>
                  )}

                  <div className={`flex items-center gap-3 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
                    <button 
                      onClick={() => onProcess(memory.id)}
                      className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-all"
                    >
                      <i className="fa-solid fa-sparkles mr-2"></i> Re-Analyze
                    </button>
                    <button className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:border-indigo-500 hover:text-indigo-400 transition-all">
                      <i className="fa-solid fa-eye mr-2"></i> View Full
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-8">
        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full text-slate-500 text-sm font-medium">
          <i className="fa-solid fa-anchor"></i>
          <span>Origin of Identity Reached</span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
