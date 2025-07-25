// Implemented Web3 Avatar Forge - Firestore Service
'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import type { AvatarTraits } from '@/lib/types';

interface AvatarMetadata {
    wallet: string;
    traits: AvatarTraits;
    ipfs_cid: string;
}

export async function saveAvatar(metadata: AvatarMetadata) {
    try {
        // Use the wallet address as the document ID to easily retrieve/update.
        const docRef = doc(db, 'avatars', metadata.wallet);
        await setDoc(docRef, metadata);
        console.log("Document written with ID: ", metadata.wallet);
        return { success: true, id: metadata.wallet };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, error: e };
    }
}
