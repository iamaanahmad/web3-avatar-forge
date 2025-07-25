'use server';

import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';
import type { TraitCategory } from '@/lib/types';

export async function logTraitSelection(category: TraitCategory, traitId: string) {
    try {
        const analyticsInstance = await analytics;
        if (analyticsInstance) {
            logEvent(analyticsInstance, 'select_trait', {
                trait_category: category,
                trait_id: traitId,
            });
        }
    } catch (e) {
        console.error("Analytics error: ", e);
    }
}

export async function logCopyCode(format: 'json' | 'jsx') {
    try {
        const analyticsInstance = await analytics;
        if (analyticsInstance) {
            logEvent(analyticsInstance, 'copy_code', {
                code_format: format,
            });
        }
    } catch (e) {
        console.error("Analytics error: ", e);
    }
}

export async function logMintEvent(eventName: 'mint_initiated' | 'mint_success' | 'mint_failure', extra_data: object = {}) {
    try {
        const analyticsInstance = await analytics;
        if (analyticsInstance) {
            logEvent(analyticsInstance, eventName, extra_data);
        }
    } catch (e) {
        console.error("Analytics error: ", e);
    }
}
