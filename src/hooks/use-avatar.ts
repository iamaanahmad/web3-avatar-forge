'use client';

import { useState, useEffect, useRef } from 'react';
import type { AvatarTraits } from '@/lib/types';
import { INITIAL_TRAITS } from '@/lib/constants';
import {
  suggestAvatarVariations,
  type SuggestAvatarVariationsInput,
  type SuggestAvatarVariationsOutput,
} from '@/ai/flows/suggest-avatar-variations';
import { uploadToIpfs, type UploadToIpfsInput, type UploadToIpfsOutput } from '@/ai/flows/upload-to-ipfs';
import { useToast } from '@/hooks/use-toast';
import { logTraitSelection } from '@/services/analytics';
import { saveAvatar } from '@/services/firestore';

export function useAvatar() {
  const [traits, setTraits] = useState<AvatarTraits>(INITIAL_TRAITS);
  const [suggestions, setSuggestions] = useState<AvatarTraits[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const prevTraitsRef = useRef<AvatarTraits>(traits);

  const handleSuggest = async () => {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const input: SuggestAvatarVariationsInput = traits;
      const result: SuggestAvatarVariationsOutput = await suggestAvatarVariations(input);
      setSuggestions(result.suggestions as AvatarTraits[]);
    } catch (error) {
      console.error('Error fetching avatar suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate AI suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadAndSave = async (address: `0x${string}` | undefined) => {
    if (!address) {
      toast({
        variant: 'destructive',
        title: 'Not Connected',
        description: 'Please connect your wallet to save your avatar.',
      });
      return null;
    }
    setIsSaving(true);
    let ipfsCid = '';
    
    try {
      // 1. Upload to IPFS (simulated)
      toast({
        title: 'Uploading to IPFS...',
        description: 'Please wait while we upload your avatar metadata. (Simulated)',
      });
      const ipfsInput: UploadToIpfsInput = traits;
      const ipfsResult: UploadToIpfsOutput = await uploadToIpfs(ipfsInput);
      ipfsCid = ipfsResult.ipfsCid;

      toast({
        title: 'Upload Successful!',
        description: `(Simulated) IPFS CID: ${ipfsCid.substring(0, 10)}...`,
      });

      // 2. Save to Firestore
      const metadata = {
        wallet: address,
        traits,
        ipfs_cid: ipfsCid,
      }
      await saveAvatar(metadata);
      toast({
        title: 'Avatar Saved',
        description: 'Your avatar configuration has been saved to Firebase.',
      });
      return ipfsCid;

    } catch (error) {
      console.error('Error during save process:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save avatar. Please try again.',
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    const prevTraits = prevTraitsRef.current;
    Object.keys(traits).forEach(key => {
        const traitKey = key as keyof AvatarTraits;
        if (prevTraits[traitKey] !== traits[traitKey]) {
            logTraitSelection(traitKey, traits[traitKey]);
        }
    });
    prevTraitsRef.current = traits;
  }, [traits]);


  return {
    traits,
    setTraits,
    suggestions,
    isLoading,
    isSaving,
    handleSuggest,
    handleUploadAndSave,
  }

}
