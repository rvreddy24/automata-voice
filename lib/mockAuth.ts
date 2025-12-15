// ========================================
// AUTOMATA VOICE - Mock Authentication
// Simulates auth flow using localStorage
// ========================================

import { User, UserRole } from '@/types';
import { mockUsers, mockCurrentUser } from './mockData';

const AUTH_KEY = 'automata_auth';
const USER_KEY = 'automata_user';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

/**
 * Get current auth state from localStorage
 */
export function getAuthState(): AuthState {
    if (typeof window === 'undefined') {
        return { isAuthenticated: false, user: null };
    }

    const isAuth = localStorage.getItem(AUTH_KEY) === 'true';
    const userJson = localStorage.getItem(USER_KEY);

    let user: User | null = null;
    if (userJson) {
        try {
            user = JSON.parse(userJson);
        } catch {
            user = null;
        }
    }

    return {
        isAuthenticated: isAuth,
        user,
    };
}

/**
 * Mock login - sets auth state
 */
export function mockLogin(email: string, _password: string): AuthState {
    // Find user by email or use default
    const user = mockUsers.find((u) => u.email === email) || mockCurrentUser;

    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    console.log('[Mock Auth] User logged in:', user.email, 'Role:', user.role);

    return {
        isAuthenticated: true,
        user,
    };
}

/**
 * Mock logout - clears auth state
 */
export function mockLogout(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);

    console.log('[Mock Auth] User logged out');
}

/**
 * Mock signup - creates session for new user
 */
export function mockSignup(email: string, companyName: string): AuthState {
    const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        role: 'client',
        clientId: `client-${Date.now()}`,
        createdAt: new Date(),
    };

    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));

    console.log('[Mock Auth] New user signed up:', email, 'Company:', companyName);

    return {
        isAuthenticated: true,
        user: newUser,
    };
}

/**
 * Check if user has a specific role
 */
export function hasRole(requiredRole: UserRole): boolean {
    const { user } = getAuthState();
    if (!user) return false;

    // Admin has access to everything
    if (user.role === 'admin') return true;

    return user.role === requiredRole;
}

/**
 * Impersonate a client (Admin only)
 */
export function impersonateClient(clientId: string): void {
    const clientUser = mockUsers.find((u) => u.clientId === clientId);

    if (clientUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(clientUser));
        console.log('[Mock Auth] Impersonating client:', clientId);
    }
}

/**
 * Quick login as admin (for development)
 */
export function devLoginAsAdmin(): AuthState {
    const adminUser = mockUsers.find((u) => u.role === 'admin') || mockUsers[0];

    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(USER_KEY, JSON.stringify(adminUser));

    console.log('[Mock Auth] Dev login as admin');

    return {
        isAuthenticated: true,
        user: adminUser,
    };
}

/**
 * Quick login as client (for development)
 */
export function devLoginAsClient(): AuthState {
    const clientUser = mockUsers.find((u) => u.role === 'client') || mockCurrentUser;

    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(USER_KEY, JSON.stringify(clientUser));

    console.log('[Mock Auth] Dev login as client');

    return {
        isAuthenticated: true,
        user: clientUser,
    };
}
