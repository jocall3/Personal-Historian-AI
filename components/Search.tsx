
import React, { useState, useMemo } from 'react';
import { Memory, Tag, Location } from '../types';

interface SearchProps {
  memories: Memory[];
  tags: Tag[];
  locations: Location[];
}

const Search: React.FC<SearchProps> = ({ memories, tags, locations }) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredMemories = useMemo(() => {
    return memories.filter(m => {
      const matchQuery = !query || 
        m.title.toLowerCase().includes(query.toLowerCase()) || 
        m.summary.toLowerCase().includes(query.toLowerCase()) ||
        m.description?.toLowerCase().includes(query.toLowerCase());
      
      const matchTag = !selectedTag || m.tagIds?.includes(selectedTag);
      const matchLoc = !selectedLocation || m.locationId === selectedLocation;

      return matchQuery && matchTag && matchLoc;
    });
  }, [memories, query, selectedTag, selectedLocation]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6">Vault Discovery</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Keyword Search</label>
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search consciousness..." 
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tag Classification</label>
            <select 
              value={selectedTag || ''} 
              onChange={(e) => setSelectedTag(e.target.value || null)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer"
            >
              <option value="">All Contexts</option>
              {tags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Geo-Coordinates</label>
            <select 
              value={selectedLocation || ''} 
              onChange={(e) => setSelectedLocation(e.target.value || null)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer"
            >
              <option value="">Anywhere on Earth</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMemories.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center text-slate-600 mx-auto mb-6">
              <i className="fa-solid fa-ghost text-2xl"></i>
            </div>
            <p className="text-slate-500 text-sm">No memories match your neural filters.</p>
          </div>
        ) : (
          filteredMemories.map(memory => (
            <div key={memory.id} className="group bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all flex flex-col">
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                {memory.assets[0] ? (
                  <img src={memory.assets[0].thumbnailUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700">
                    <i className="fa-solid fa-image text-3xl"></i>
                  </div>
                )}
                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 uppercase tracking-tighter">
                  {memory.sentiment || 'Analyzing...'}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">{memory.title}</h4>
                <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">{memory.summary}</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {new Date(memory.timestamp).toLocaleDateString()}
                  </span>
                  <i className="fa-solid fa-chevron-right text-slate-600 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all"></i>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
