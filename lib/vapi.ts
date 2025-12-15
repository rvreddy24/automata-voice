'use client';

import Vapi from '@vapi-ai/web';

// Vapi Public Key (safe for frontend use)
// Using NEXT_PUBLIC_ prefix to expose to browser
const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '5901b813-8b1e-4423-9df6-8a987a0cb3f8';

// Sarah - AI Dental Receptionist Assistant ID (configured in Vapi Dashboard)
export const SARAH_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || 'b6f5994e-734a-4057-bbee-dc91ac116e17';

// Create singleton Vapi instance
let vapiInstance: Vapi | null = null;

export function getVapiInstance(): Vapi {
    if (!vapiInstance) {
        vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    }
    return vapiInstance;
}

// Start a call with Sarah using the pre-configured Assistant ID
export async function startSarahCall(): Promise<void> {
    const vapi = getVapiInstance();
    await vapi.start(SARAH_ASSISTANT_ID);
}

// Stop the current call
export function stopCall(): void {
    const vapi = getVapiInstance();
    vapi.stop();
}

// Export types for event handling
export type VapiEventCallback = {
    onCallStart?: () => void;
    onCallEnd?: () => void;
    onSpeechStart?: () => void;
    onSpeechEnd?: () => void;
    onVolumeLevel?: (level: number) => void;
    onMessage?: (message: unknown) => void;
    onError?: (error: Error) => void;
};

// Setup event listeners
export function setupVapiListeners(callbacks: VapiEventCallback): () => void {
    const vapi = getVapiInstance();

    if (callbacks.onCallStart) {
        vapi.on('call-start', callbacks.onCallStart);
    }
    if (callbacks.onCallEnd) {
        vapi.on('call-end', callbacks.onCallEnd);
    }
    if (callbacks.onSpeechStart) {
        vapi.on('speech-start', callbacks.onSpeechStart);
    }
    if (callbacks.onSpeechEnd) {
        vapi.on('speech-end', callbacks.onSpeechEnd);
    }
    if (callbacks.onVolumeLevel) {
        vapi.on('volume-level', callbacks.onVolumeLevel);
    }
    if (callbacks.onMessage) {
        vapi.on('message', callbacks.onMessage);
    }
    if (callbacks.onError) {
        vapi.on('error', callbacks.onError);
    }

    // Return cleanup function
    return () => {
        if (callbacks.onCallStart) {
            vapi.off('call-start', callbacks.onCallStart);
        }
        if (callbacks.onCallEnd) {
            vapi.off('call-end', callbacks.onCallEnd);
        }
        if (callbacks.onSpeechStart) {
            vapi.off('speech-start', callbacks.onSpeechStart);
        }
        if (callbacks.onSpeechEnd) {
            vapi.off('speech-end', callbacks.onSpeechEnd);
        }
        if (callbacks.onVolumeLevel) {
            vapi.off('volume-level', callbacks.onVolumeLevel);
        }
        if (callbacks.onMessage) {
            vapi.off('message', callbacks.onMessage);
        }
        if (callbacks.onError) {
            vapi.off('error', callbacks.onError);
        }
    };
}
