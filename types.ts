
export type AssetType = 'PHOTO' | 'VIDEO' | 'AUDIO' | 'EMAIL' | 'DOCUMENT' | 'SOCIAL_POST' | 'WEBPAGE_ARCHIVE' | 'OTHER';

export interface Person {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  relationship?: string;
  tags?: string[];
  digitalIdentityId?: string;
}

export interface Location {
  id: string;
  name: string;
  coordinates?: { lat: number; lng: number };
  description?: string;
  type?: 'city' | 'country' | 'landmark' | 'home' | 'work' | 'event_venue';
  tags?: string[];
}

export interface Tag {
  id: string;
  name: string;
  category?: string;
  color?: string;
}

export interface Asset {
  id: string;
  type: AssetType;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  timestamp?: string;
  sourceApp?: string;
  metadata?: Record<string, any>;
  transcription?: string;
  aiAnalyzed?: boolean;
}

export interface Memory {
  id: string;
  title: string;
  summary: string;
  description?: string;
  timestamp: string;
  endDate?: string;
  locationId?: string;
  peopleIds?: string[];
  tagIds?: string[];
  assets: Asset[];
  sentiment?: 'positive' | 'neutral' | 'negative' | 'mixed';
  vrExperienceUrl?: string;
  aiGeneratedInsights?: string[];
  agentProcessingJobId?: string;
  processingCostTokenId?: string;
  status?: 'draft' | 'published' | 'archived';
  visibility?: 'private' | 'shared' | 'public';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  preferences: UserPreferences;
  digitalIdentityId?: string;
  tokenAccountId?: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  defaultView: 'dashboard' | 'timeline' | 'chat' | 'search';
  notificationSettings: {
    memoryAnniversaries: boolean;
    newInsights: boolean;
    agentActivityAlerts: boolean;
    transactionNotifications: boolean;
  };
}

export interface AISettings {
  enableAutoTagging: boolean;
  enableSentimentAnalysis: boolean;
  enableVRSceneGeneration: boolean;
  preferredChatModel: string;
  autoProcessNewMemories: boolean;
  maxMonthlyAICostTokens: number;
}

export interface DigitalIdentity {
  id: string;
  ownerId: string;
  ownerType: 'user' | 'agent';
  publicKey: string;
  privateKeyEncrypted?: string;
  createdAt: string;
  status: 'active' | 'revoked' | 'suspended';
}

export interface Agent {
  id: string;
  name: string;
  type: 'analyzer' | 'curator' | 'remediator' | 'orchestrator';
  description: string;
  status: 'active' | 'suspended' | 'idle';
  skillIds: string[];
  digitalIdentityId: string;
  tokenBalance: number;
}

export interface AgentActivityLog {
  id: string;
  agentId: string;
  timestamp: string;
  action: string;
  relatedEntityId?: string;
  details: Record<string, any>;
  status: 'success' | 'failed' | 'pending';
  costInTokens?: number;
  transactionId?: string;
  signature?: string;
}

export interface TokenAccount {
  id: string;
  ownerId: string;
  ownerType: 'user' | 'agent';
  balance: number;
  currency: 'HST';
}

export interface TokenTransaction {
  id: string;
  timestamp: string;
  senderId: string;
  receiverId: string;
  amount: number;
  currency: 'HST';
  type: 'mint' | 'burn' | 'transfer' | 'fee' | 'reward';
  status: 'completed' | 'failed';
  description: string;
  associatedJobId?: string;
  signature: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'agent' | 'transaction';
  message: string;
  timestamp: string;
  read: boolean;
  relatedEntityId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  relatedMemoryIds?: string[];
}
