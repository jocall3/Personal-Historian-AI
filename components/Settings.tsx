
import React from 'react';
import { UserProfile, TokenAccount, TokenTransaction } from '../types';

interface SettingsProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  wallet: TokenAccount;
  setWallet: React.Dispatch<React.SetStateAction<TokenAccount>>;
  transactions: TokenTransaction[];
}

const Settings: React.FC<SettingsProps> = ({ user, wallet, setWallet, transactions }) => {
  const mintTokens = () => {
    const amount = 500;
    setWallet(prev => ({ ...prev, balance: prev.balance + amount }));
    alert(`Simulated Mint: ${amount} HST added to your account via the Historian Mint Rail.`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Identity & Governance</h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-700/50 bg-slate-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={user.avatarUrl} alt="" className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-slate-700 p-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-white">{user.name}</h3>
                  <p className="text-slate-400 text-sm">Personal Archivist Level 4</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-slate-600 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-700 transition-colors">
                Update Identity
              </button>
            </div>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Digital Fingerprint</label>
                <div className="flex items-center space-x-2 bg-slate-900 px-3 py-2 rounded-lg border border-slate-700">
                  <i className="fa-solid fa-fingerprint text-cyan-500"></i>
                  <span className="text-xs font-mono text-slate-300 truncate">{user.digitalIdentityId}</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Public Signing Key</label>
                <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-700">
                  <span className="text-[10px] font-mono text-slate-500 break-all leading-relaxed">
                    ed25519:6Q8XjG2K9mPz5TqW8yR...4vL3sN1fJ7c9B0m2H
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <div className="flex items-center space-x-2 text-emerald-400 mb-2 font-bold text-sm">
                  <i className="fa-solid fa-shield-check"></i>
                  <span>Zero-Knowledge Proofs Active</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Your data remains encrypted. Agents only process "hashes" of your memories for insights.</p>
              </div>
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <div className="flex items-center space-x-2 text-blue-400 mb-2 font-bold text-sm">
                  <i className="fa-solid fa-scale-balanced"></i>
                  <span>AI Governance Compliance</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">User consent is programmatically enforced at the protocol level.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">HST Wallet</h2>
          <button onClick={mintTokens} className="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest bg-cyan-500/10 px-3 py-1.5 rounded-lg transition-colors">
            <i className="fa-solid fa-coins mr-1"></i> Mint HST
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-3xl shadow-xl shadow-indigo-900/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <i className="fa-solid fa-credit-card text-2xl text-white/80"></i>
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">HST Network</span>
              </div>
              <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-1">Available Balance</p>
              <p className="text-4xl font-bold text-white tabular-nums">{wallet.balance} <span className="text-lg font-medium opacity-70">HST</span></p>
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center text-white/60 text-[10px] font-mono">
                <span>4421 •••• •••• 9012</span>
                <i className="fa-brands fa-nfc-symbol text-lg"></i>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-800/50 border border-slate-700 rounded-3xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Recent Transactions</h3>
              <i className="fa-solid fa-list-ul text-slate-500"></i>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[300px] scrollbar-thin">
              {transactions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <i className="fa-solid fa-receipt text-slate-700 text-3xl mb-3"></i>
                  <p className="text-slate-500 text-sm">No transaction history found on-chain.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-700/50">
                  {transactions.map(txn => (
                    <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-slate-700/20 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          txn.type === 'mint' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          <i className={`fa-solid ${txn.type === 'mint' ? 'fa-arrow-down' : 'fa-arrow-up'} text-sm`}></i>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-200">{txn.description}</p>
                          <p className="text-[10px] text-slate-500 font-mono uppercase">{txn.id} • {new Date(txn.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className={`text-sm font-bold tabular-nums ${
                        txn.type === 'mint' ? 'text-emerald-400' : 'text-slate-200'
                      }`}>
                        {txn.type === 'mint' ? '+' : '-'}{txn.amount} HST
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
