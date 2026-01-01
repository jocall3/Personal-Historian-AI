
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Memory, UserProfile, Tag, Location, Person, 
  Agent, TokenAccount, TokenTransaction, 
  AgentActivityLog, Notification, ChatMessage 
} from './types';
import { 
  INITIAL_MEMORIES, INITIAL_USER, INITIAL_TAGS, 
  INITIAL_LOCATIONS, INITIAL_PEOPLE, INITIAL_AGENTS, TOKEN_ACCOUNT 
} from './constants';
import { geminiService } from './services/geminiService';

// View Components
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Chat from './components/Chat';
import Search from './components/Search';
import AgentActivity from './components/AgentActivity';
import Settings from './components/Settings';
import NotificationsList from './components/NotificationsList';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  // --- Global State ---
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [tags] = useState<Tag[]>(INITIAL_TAGS);
  const [locations] = useState<Location[]>(INITIAL_LOCATIONS);
  const [people] = useState<Person[]>([]); // We'll assume INITIAL_PEOPLE is also loaded
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [wallet, setWallet] = useState<TokenAccount>(TOKEN_ACCOUNT);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [agentLogs, setAgentLogs] = useState<AgentActivityLog[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  
  // Navigation State
  const [currentView, setCurrentView] = useState<UserProfile['preferences']['defaultView']>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- Helpers ---
  const addNotification = useCallback((message: string, type: Notification['type'] = 'info') => {
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  const performTransaction = useCallback(async (amount: number, description: string, type: TokenTransaction['type'] = 'fee') => {
    if (wallet.balance < amount) {
      addNotification("Insufficient HST balance for this operation.", "error");
      return null;
    }

    const txnId = `txn-${Date.now()}`;
    const newTxn: TokenTransaction = {
      id: txnId,
      timestamp: new Date().toISOString(),
      senderId: wallet.id,
      receiverId: "system-treasury",
      amount,
      currency: "HST",
      type,
      status: "completed",
      description,
      signature: `sig-${Math.random().toString(36).substr(2, 9)}`
    };

    setWallet(prev => ({ ...prev, balance: prev.balance - amount }));
    setTransactions(prev => [newTxn, ...prev]);
    return txnId;
  }, [wallet, addNotification]);

  const logAgentAction = useCallback((agentId: string, action: string, details: any, cost: number, txnId?: string) => {
    const newLog: AgentActivityLog = {
      id: `log-${Date.now()}`,
      agentId,
      timestamp: new Date().toISOString(),
      action,
      details,
      status: "success",
      costInTokens: cost,
      transactionId: txnId,
      signature: `sig-agent-${Math.random().toString(36).substr(2, 9)}`
    };
    setAgentLogs(prev => [newLog, ...prev]);
  }, []);

  // --- Handlers ---
  const handleMemoryProcess = async (memoryId: string) => {
    const memory = memories.find(m => m.id === memoryId);
    if (!memory) return;

    const cost = 15; // Simulated cost for deep analysis
    const txnId = await performTransaction(cost, `AI Analysis for memory: ${memory.title}`);
    if (!txnId) return;

    addNotification(`Agent Aletheia started analyzing "${memory.title}"...`, "agent");

    try {
      const results = await geminiService.analyzeMemory(memory);
      
      setMemories(prev => prev.map(m => m.id === memoryId ? {
        ...m,
        sentiment: results.sentiment as any,
        aiGeneratedInsights: [...(m.aiGeneratedInsights || []), ...results.insights],
        tagIds: Array.from(new Set([...(m.tagIds || []), ...results.tags.map(t => t.toLowerCase())]))
      } : m));

      logAgentAction("agent-analyzer-01", "memory:analyze", results, cost, txnId);
      addNotification(`Analysis complete for "${memory.title}". Insights generated.`, "success");
    } catch (error) {
      addNotification("Agent failed to process memory due to a neural link error.", "error");
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = { id: `msg-${Date.now()}`, role: "user", content: text, timestamp: new Date().toISOString() };
    setChatHistory(prev => [...prev, userMsg]);

    const cost = 2; // Low cost for chat
    const txnId = await performTransaction(cost, "AI Conversational Query");
    if (!txnId) return;

    try {
      const { text: responseText, relatedIds } = await geminiService.chatWithMemories(text, memories, chatHistory);
      const aiMsg: ChatMessage = { 
        id: `msg-${Date.now() + 1}`, 
        role: "ai", 
        content: responseText, 
        timestamp: new Date().toISOString(),
        relatedMemoryIds: relatedIds
      };
      setChatHistory(prev => [...prev, aiMsg]);
      logAgentAction("agent-orchestrator", "chat:respond", { query: text }, cost, txnId);
    } catch (e) {
      addNotification("The Historian AI is currently disconnected.", "error");
    }
  };

  // --- Render ---
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Navigation Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        wallet={wallet}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-hidden">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-400">
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
          <div className="flex-1 px-4 max-w-2xl mx-auto hidden md:block">
            <div className="relative group">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors"></i>
              <input 
                type="text" 
                placeholder="Recall a moment... (e.g., 'Trip to Paris')" 
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                onClick={() => setCurrentView('search')}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-slate-400 hover:text-cyan-400 relative" onClick={() => setCurrentView('notifications')}>
              <i className="fa-solid fa-bell text-xl"></i>
              {notifications.some(n => !n.read) && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-slate-900 rounded-full"></span>
              )}
            </button>
            <div className="flex items-center space-x-2 border-l border-slate-800 pl-4 ml-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{wallet.balance} HST</span>
              <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full ring-2 ring-cyan-500/20" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' && <Dashboard memories={memories} tags={tags} onProcess={handleMemoryProcess} />}
            {currentView === 'timeline' && <Timeline memories={memories} onProcess={handleMemoryProcess} />}
            {currentView === 'chat' && <Chat history={chatHistory} onSendMessage={handleSendMessage} memories={memories} />}
            {currentView === 'search' && <Search memories={memories} tags={tags} locations={locations} />}
            {currentView === 'notifications' && <NotificationsList notifications={notifications} setNotifications={setNotifications} />}
            {currentView === 'agentLogs' && <AgentActivity agentLogs={agentLogs} agents={agents} />}
            {currentView === 'settings' && <Settings user={user} setUser={setUser} wallet={wallet} setWallet={setWallet} transactions={transactions} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
