// ========================================
// AUTOMATA VOICE - TypeScript Interfaces
// Ready for Supabase integration
// ========================================

// User Roles
export type UserRole = 'visitor' | 'client' | 'admin';

// Subscription Status
export type SubscriptionStatus = 'trial' | 'active' | 'suspended' | 'cancelled';

// Subscription Tiers
export type SubscriptionTier = 'starter' | 'professional' | 'enterprise';

// Call Status
export type CallStatus = 'booked' | 'inquiry' | 'spam' | 'missed' | 'transferred';

// Voice Options
export type VoiceId = 'sarah-us' | 'ravi-in' | 'arthur-uk';

// ========================================
// Core Entities
// ========================================

/**
 * User entity - represents authenticated users
 * Maps to Supabase auth.users + profiles table
 */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  clientId?: string; // Links to Client if role is 'client'
  avatarUrl?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

/**
 * Client/Business entity
 * Maps to `clients` table in Supabase
 */
export interface Client {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  website?: string;
  address?: string;
  industry?: string;
  subscriptionStatus: SubscriptionStatus;
  subscriptionTier: SubscriptionTier;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Call Log entry
 * Maps to `calls` table in Supabase
 */
export interface CallLog {
  id: string;
  clientId: string;
  callerNumber: string;
  callerName?: string;
  duration: number; // In seconds
  status: CallStatus;
  recordingUrl?: string;
  transcript?: string;
  summary?: string;
  flagged?: boolean;
  flagReason?: string;
  createdAt: Date;
}

/**
 * Agent Configuration
 * Maps to `agent_configs` table in Supabase
 */
export interface AgentConfig {
  id: string;
  clientId: string;
  greeting: string;
  voiceId: VoiceId;
  personality?: string;
  businessHours: BusinessHours;
  forwardingNumber?: string;
  notificationEmail?: string;
  notificationPhone?: string;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Business Hours configuration
 */
export interface BusinessHours {
  enabled: boolean;
  timezone: string;
  schedule: DaySchedule[];
}

export interface DaySchedule {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  isOpen: boolean;
  openTime: string; // "09:00"
  closeTime: string; // "17:00"
}

// ========================================
// Dashboard Stats
// ========================================

export interface DashboardStats {
  callsHandled: number;
  callsChange: number; // Percentage change from previous period
  minutesUsed: number;
  minutesTotal: number;
  appointmentsBooked: number;
  appointmentsChange: number;
  estimatedRevenue: number;
  spamBlocked: number;
}

// ========================================
// Pricing
// ========================================

export interface PricingTier {
  id: SubscriptionTier;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

// ========================================
// Admin Types
// ========================================

export interface AdminStats {
  totalClients: number;
  activeClients: number;
  totalCalls: number;
  totalMinutes: number;
  monthlyRevenue: number;
  revenueChange: number;
}

export interface ClientListItem extends Client {
  callCount: number;
  minutesUsed: number;
  lastCallAt?: Date;
}

// ========================================
// API Response Types
// ========================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ========================================
// Form Types
// ========================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  message: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  companyName: string;
  confirmPassword: string;
}

// ========================================
// Vapi.ai Integration Types (Future)
// ========================================

export interface VapiWebCallConfig {
  assistantId: string;
  apiKey: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export interface WebhookCallPayload {
  callId: string;
  phoneNumber: string;
  duration: number;
  recordingUrl: string;
  transcript: string;
  status: CallStatus;
  timestamp: string;
}
