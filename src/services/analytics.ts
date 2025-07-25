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
