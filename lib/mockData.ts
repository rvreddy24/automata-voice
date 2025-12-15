// ========================================
// AUTOMATA VOICE - Mock Data
// Realistic demo data for visual prototype
// ========================================

import {
    User,
    Client,
    CallLog,
    AgentConfig,
    DashboardStats,
    PricingTier,
    AdminStats,
    ClientListItem,
} from '@/types';

// ========================================
// Mock Users
// ========================================

export const mockUsers: User[] = [
    {
        id: 'user-001',
        email: 'admin@automatavoice.com',
        role: 'admin',
        avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AV',
        createdAt: new Date('2024-01-01'),
        lastLoginAt: new Date(),
    },
    {
        id: 'user-002',
        email: 'drsmith@dentalcare.com',
        role: 'client',
        clientId: 'client-001',
        avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=DS',
        createdAt: new Date('2024-06-15'),
        lastLoginAt: new Date(),
    },
];

export const mockCurrentUser: User = mockUsers[1]; // Default to client user

// ========================================
// Mock Clients
// ========================================

export const mockClients: Client[] = [
    {
        id: 'client-001',
        companyName: 'Smile Dental Care',
        email: 'drsmith@dentalcare.com',
        phone: '+1 (555) 123-4567',
        website: 'https://smiledentalcare.com',
        address: '123 Main St, Los Angeles, CA 90001',
        industry: 'Healthcare - Dental',
        subscriptionStatus: 'active',
        subscriptionTier: 'professional',
        stripeCustomerId: 'cus_mockstripe001',
        createdAt: new Date('2024-06-15'),
        updatedAt: new Date('2024-12-10'),
    },
    {
        id: 'client-002',
        companyName: 'Johnson & Associates Law',
        email: 'info@johnsonlaw.com',
        phone: '+1 (555) 234-5678',
        website: 'https://johnsonlaw.com',
        industry: 'Legal',
        subscriptionStatus: 'active',
        subscriptionTier: 'starter',
        createdAt: new Date('2024-08-20'),
        updatedAt: new Date('2024-12-01'),
    },
    {
        id: 'client-003',
        companyName: 'Premier Real Estate',
        email: 'contact@premierrealty.com',
        phone: '+1 (555) 345-6789',
        website: 'https://premierrealty.com',
        industry: 'Real Estate',
        subscriptionStatus: 'trial',
        subscriptionTier: 'professional',
        createdAt: new Date('2024-12-01'),
    },
    {
        id: 'client-004',
        companyName: 'Metro Auto Shop',
        email: 'service@metroauto.com',
        phone: '+1 (555) 456-7890',
        industry: 'Automotive',
        subscriptionStatus: 'suspended',
        subscriptionTier: 'starter',
        createdAt: new Date('2024-07-10'),
        updatedAt: new Date('2024-11-15'),
    },
];

export const mockCurrentClient: Client = mockClients[0];

// ========================================
// Mock Call Logs
// ========================================

export const mockCallLogs: CallLog[] = [
    {
        id: 'call-001',
        clientId: 'client-001',
        callerNumber: '+1 (555) 987-6543',
        callerName: 'Sarah Johnson',
        duration: 184,
        status: 'booked',
        recordingUrl: '/audio/sample-call-1.mp3',
        transcript: `AI: Good morning! Thank you for calling Smile Dental Care. This is Sarah, your virtual assistant. How may I help you today?

Caller: Hi, I need to schedule an appointment for a cleaning.

AI: I'd be happy to help you schedule a cleaning appointment. Let me check our availability. Do you have a preferred day of the week?

Caller: Preferably next Tuesday if possible.

AI: Let me look at Tuesday's schedule. I have openings at 10:00 AM, 2:30 PM, and 4:00 PM. Which time works best for you?

Caller: 2:30 PM sounds perfect.

AI: Excellent! I've scheduled you for a cleaning appointment on Tuesday at 2:30 PM. You'll receive a confirmation text shortly. Is there anything else I can help you with?

Caller: That's all, thank you!

AI: You're welcome! We look forward to seeing you on Tuesday. Have a great day!`,
        summary: 'New patient scheduled cleaning for Tuesday 2:30 PM',
        flagged: false,
        createdAt: new Date('2024-12-14T10:30:00'),
    },
    {
        id: 'call-002',
        clientId: 'client-001',
        callerNumber: '+1 (555) 876-5432',
        callerName: 'Michael Chen',
        duration: 95,
        status: 'inquiry',
        recordingUrl: '/audio/sample-call-2.mp3',
        transcript: `AI: Good afternoon! Smile Dental Care, how can I assist you?

Caller: Hi, I was wondering what your prices are for teeth whitening?

AI: Great question! Our professional teeth whitening treatments start at $299 for an in-office session, which takes about an hour. We also offer take-home whitening kits for $199. Would you like me to schedule a consultation to determine the best option for you?

Caller: Let me think about it and call back. Thanks for the info.

AI: Of course! Take your time. When you're ready, you can call us back or book online. Have a wonderful day!`,
        summary: 'Price inquiry for teeth whitening - $299 in-office, $199 take-home',
        flagged: false,
        createdAt: new Date('2024-12-14T14:15:00'),
    },
    {
        id: 'call-003',
        clientId: 'client-001',
        callerNumber: '+1 (555) 765-4321',
        duration: 23,
        status: 'spam',
        transcript: 'AI: Good morning! Smile Dental Care.\n\nCaller: Hi, this is Tom from Solar Panel Solutions...\n\nAI: I appreciate the call, but we\'re not interested in solicitation calls. Please remove us from your list. Goodbye.',
        summary: 'Solar panel sales call - blocked',
        flagged: false,
        createdAt: new Date('2024-12-14T11:45:00'),
    },
    {
        id: 'call-004',
        clientId: 'client-001',
        callerNumber: '+1 (555) 654-3210',
        callerName: 'Emily Watson',
        duration: 156,
        status: 'booked',
        recordingUrl: '/audio/sample-call-3.mp3',
        transcript: `AI: Thank you for calling Smile Dental Care. This is Sarah speaking.

Caller: Hi, I need to reschedule my appointment.

AI: I can help with that. May I have your name please?

Caller: Emily Watson.

AI: Thank you, Emily. I see you have an appointment scheduled for tomorrow at 9:00 AM. When would you like to reschedule to?

Caller: Can I move it to Friday?

AI: Let me check Friday's availability. I have 11:00 AM and 3:00 PM available. Which works for you?

Caller: 11 AM please.

AI: Done! Your appointment has been rescheduled from Thursday 9:00 AM to Friday at 11:00 AM. You'll receive an updated confirmation. Anything else?

Caller: No, that's perfect. Thank you!`,
        summary: 'Rescheduled from Thursday 9AM to Friday 11AM',
        flagged: false,
        createdAt: new Date('2024-12-13T16:20:00'),
    },
    {
        id: 'call-005',
        clientId: 'client-001',
        callerNumber: '+1 (555) 543-2109',
        callerName: 'Robert Davis',
        duration: 210,
        status: 'booked',
        recordingUrl: '/audio/sample-call-4.mp3',
        summary: 'Emergency toothache - scheduled same-day appointment at 4:30 PM',
        flagged: true,
        flagReason: 'Patient seemed distressed - follow up recommended',
        createdAt: new Date('2024-12-13T13:05:00'),
    },
    {
        id: 'call-006',
        clientId: 'client-001',
        callerNumber: '+1 (555) 432-1098',
        duration: 45,
        status: 'missed',
        summary: 'Call ended before connection established',
        createdAt: new Date('2024-12-12T09:30:00'),
    },
    {
        id: 'call-007',
        clientId: 'client-001',
        callerNumber: '+1 (555) 321-0987',
        callerName: 'Lisa Thompson',
        duration: 178,
        status: 'booked',
        summary: 'New patient consultation for invisalign - scheduled for Monday 10 AM',
        createdAt: new Date('2024-12-12T15:45:00'),
    },
    {
        id: 'call-008',
        clientId: 'client-001',
        callerNumber: '+1 (555) 210-9876',
        duration: 88,
        status: 'inquiry',
        summary: 'Insurance coverage question - referred to billing department',
        createdAt: new Date('2024-12-11T11:20:00'),
    },
    {
        id: 'call-009',
        clientId: 'client-001',
        callerNumber: '+1 (555) 109-8765',
        callerName: 'James Wilson',
        duration: 134,
        status: 'booked',
        summary: 'Root canal follow-up scheduled for next Wednesday 2 PM',
        createdAt: new Date('2024-12-11T14:10:00'),
    },
    {
        id: 'call-010',
        clientId: 'client-001',
        callerNumber: '+1 (555) 098-7654',
        duration: 18,
        status: 'spam',
        summary: 'Robocall detected - auto-terminated',
        createdAt: new Date('2024-12-10T10:00:00'),
    },
];

// ========================================
// Mock Agent Configuration
// ========================================

export const mockAgentConfig: AgentConfig = {
    id: 'config-001',
    clientId: 'client-001',
    greeting: "Good morning! Thank you for calling Smile Dental Care. This is Sarah, your virtual assistant. How may I help you today?",
    voiceId: 'sarah-us',
    personality: 'Friendly, professional, and patient. Always maintains a warm tone.',
    businessHours: {
        enabled: true,
        timezone: 'America/Los_Angeles',
        schedule: [
            { day: 'monday', isOpen: true, openTime: '08:00', closeTime: '18:00' },
            { day: 'tuesday', isOpen: true, openTime: '08:00', closeTime: '18:00' },
            { day: 'wednesday', isOpen: true, openTime: '08:00', closeTime: '18:00' },
            { day: 'thursday', isOpen: true, openTime: '08:00', closeTime: '18:00' },
            { day: 'friday', isOpen: true, openTime: '08:00', closeTime: '17:00' },
            { day: 'saturday', isOpen: true, openTime: '09:00', closeTime: '14:00' },
            { day: 'sunday', isOpen: false, openTime: '00:00', closeTime: '00:00' },
        ],
    },
    forwardingNumber: '+1 (555) 123-4567',
    notificationEmail: 'drsmith@dentalcare.com',
    notificationPhone: '+1 (555) 111-2222',
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-12-01'),
};

// ========================================
// Mock Dashboard Stats
// ========================================

export const mockDashboardStats: DashboardStats = {
    callsHandled: 142,
    callsChange: 12,
    minutesUsed: 340,
    minutesTotal: 500,
    appointmentsBooked: 18,
    appointmentsChange: 8,
    estimatedRevenue: 4500,
    spamBlocked: 23,
};

// ========================================
// Pricing Tiers
// ========================================

export const pricingTiers: PricingTier[] = [
    {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small practices just getting started',
        monthlyPrice: 199,
        yearlyPrice: 159,
        features: [
            '500 minutes per month',
            '1 phone number',
            'Basic call forwarding',
            'Call recordings',
            'Email support',
            'Standard voice options',
        ],
        ctaText: 'Get Started',
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'For growing businesses that need more power',
        monthlyPrice: 499,
        yearlyPrice: 399,
        features: [
            'Unlimited minutes',
            '3 phone numbers',
            'CRM integration (Zapier)',
            'Custom voice cloning',
            'Priority support',
            'Appointment booking',
            'Advanced analytics',
            'SMS notifications',
        ],
        highlighted: true,
        ctaText: 'Start Free Trial',
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For large organizations with custom needs',
        monthlyPrice: 0, // Contact us
        yearlyPrice: 0,
        features: [
            'Everything in Professional',
            'Unlimited phone numbers',
            'White-label solution',
            'Dedicated account manager',
            'Custom integrations',
            'SLA guarantee',
            'On-premise deployment option',
            '24/7 phone support',
        ],
        ctaText: 'Contact Sales',
    },
];

// ========================================
// Mock Admin Stats
// ========================================

export const mockAdminStats: AdminStats = {
    totalClients: 47,
    activeClients: 42,
    totalCalls: 8934,
    totalMinutes: 24567,
    monthlyRevenue: 18650,
    revenueChange: 15,
};

// ========================================
// Mock Client List (for Admin)
// ========================================

export const mockClientList: ClientListItem[] = mockClients.map((client, index) => ({
    ...client,
    callCount: [142, 89, 23, 0][index] || 0,
    minutesUsed: [340, 156, 45, 0][index] || 0,
    lastCallAt: index < 3 ? new Date(Date.now() - Math.random() * 86400000 * 7) : undefined,
}));

// ========================================
// Voice Options
// ========================================

export const voiceOptions = [
    { id: 'sarah-us', name: 'Sarah', accent: 'American', gender: 'Female', preview: '/audio/sarah-preview.mp3' },
    { id: 'ravi-in', name: 'Ravi', accent: 'Indian', gender: 'Male', preview: '/audio/ravi-preview.mp3' },
    { id: 'arthur-uk', name: 'Arthur', accent: 'British', gender: 'Male', preview: '/audio/arthur-preview.mp3' },
];

// ========================================
// Industry Options
// ========================================

export const industryOptions = [
    'Healthcare - Dental',
    'Healthcare - Medical',
    'Legal',
    'Real Estate',
    'Automotive',
    'Home Services',
    'Financial Services',
    'Hospitality',
    'Retail',
    'Other',
];
