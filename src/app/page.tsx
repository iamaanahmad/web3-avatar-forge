'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  suggestAvatarVariations,
  type SuggestAvatarVariationsInput,
  type SuggestAvatarVariationsOutput,
} from '@/ai/flows/suggest-avatar-variations';
import { AvatarEditor } from '@/components/avatar-editor';
import { AvatarViewer } from '@/components/avatar-viewer';
import { Button } from '@/components/ui/button';
import type { AvatarTraits } from '@/lib/types';
import { INITIAL_TRAITS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Wallet } from 'lucide-react';

export default function Home() {
  const [traits, setTraits] = useState<AvatarTraits>(INITIAL_TRAITS);
  const [suggestions, setSuggestions] = useState<AvatarTraits[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(traits, null, 2));
    toast({
      title: 'Copied to Clipboard',
      description: 'Avatar configuration JSON has been copied.',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Web3 Avatar Forge</h1>
          </div>
          <Button variant="outline">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="lg:col-span-1 h-full flex flex-col gap-8">
             <AvatarEditor
                traits={traits}
                setTraits={setTraits}
                suggestions={suggestions}
                onSuggest={handleSuggest}
                isLoading={isLoading}
              />
          </div>

          <div className="lg:col-span-2 h-full flex flex-col items-center justify-center gap-6">
            <div className="w-full max-w-xl aspect-square">
              <AvatarViewer traits={traits} />
            </div>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleCopyJson}>Copy JSON</Button>
              <Button variant="outline" disabled>Save to IPFS</Button>
              <Button variant="secondary" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
                Mint Avatar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
