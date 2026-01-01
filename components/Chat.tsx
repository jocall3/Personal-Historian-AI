
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Memory } from '../types';

interface ChatProps {
  history: ChatMessage[];
  onSendMessage: (text: string) => void;
  memories: Memory[];
}

const Chat: React.FC<ChatProps> = ({ history, onSendMessage, memories }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex-1 overflow-y-auto space-y-6 pb-6 scrollbar-thin">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-cyan-400 mb-6 shadow-xl border border-slate-700">
              <i className="fa-solid fa-robot text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Historian Oracle</h3>
            <p className="text-slate-400 max-w-md">
              Ask me about your past. "What happened in the summer of 2019?" or "When was the last time I saw Sarah?"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              {["Tell me about my Japan trip.", "Who is John Doe?", "Find travel memories.", "Recap my 2022 career."].map(suggestion => (
                <button 
                  key={suggestion}
                  onClick={() => onSendMessage(suggestion)}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800 transition-all text-left"
                >
                  <i className="fa-solid fa-comment-dots mr-2 text-cyan-500"></i>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`
                max-w-[85%] rounded-3xl p-5 shadow-lg border
                ${msg.role === 'user' 
                  ? 'bg-cyan-600 border-cyan-500 text-white rounded-tr-none' 
                  : 'bg-slate-800 border-slate-700 text-slate-200 rounded-tl-none'}
              `}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    {msg.role === 'user' ? 'You' : 'Historian AI'} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                
                {msg.relatedMemoryIds && msg.relatedMemoryIds.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3">Linked Memories</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.relatedMemoryIds.map(id => {
                        const memory = memories.find(m => m.id === id);
                        return memory ? (
                          <button key={id} className="flex items-center space-x-2 bg-slate-900/50 hover:bg-slate-900 p-2 rounded-xl border border-white/5 transition-colors group">
                            <img src={memory.assets[0]?.thumbnailUrl} alt="" className="w-6 h-6 rounded-md object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            <span className="text-xs font-medium text-slate-300">{memory.title}</span>
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 p-4 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-3xl shadow-2xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <button type="button" className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors">
            <i className="fa-solid fa-paperclip text-lg"></i>
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search your consciousness..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 text-sm py-2"
          />
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="w-10 h-10 flex-shrink-0 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-cyan-900/20"
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
