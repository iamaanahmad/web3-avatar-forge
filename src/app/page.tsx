'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  suggestAvatarVariations,
  type SuggestAvatarVariationsInput,
  type SuggestAvatarVariationsOutput,
} from '@/ai/flows/suggest-avatar-variations';
import { uploadToIpfs, type UploadToIpfsInput, type UploadToIpfsOutput } from '@/ai/flows/upload-to-ipfs';
import { AvatarEditor } from '@/components/avatar-editor';
import { AvatarViewer } from '@/components/avatar-viewer';
import { Button } from '@/components/ui/button';
import type { AvatarTraits } from '@/lib/types';
import { INITIAL_TRAITS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Wallet, LogOut, UploadCloud, Loader2, Copy, CopyCheck, MessageSquareQuote } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors'
import { saveAvatar } from '@/services/firestore';
import { useMintAvatar } from '@/hooks/use-mint-avatar';
import { logCopyCode, logMintEvent, logTraitSelection } from '@/services/analytics';


export default function Home() {
  const [traits, setTraits] = useState<AvatarTraits>(INITIAL_TRAITS);
  const [suggestions, setSuggestions] = useState<AvatarTraits[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isJsonCopied, setIsJsonCopied] = useState(false);
  const [isJsxCopied, setIsJsxCopied] = useState(false);
  const { toast } = useToast();
  const prevTraitsRef = useRef<AvatarTraits>(traits);

  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const { mint, isPending: isMinting, isSuccess: isMinted, error: mintError, data: mintData } = useMintAvatar();


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
    logCopyCode('json');
    toast({
      title: 'Copied to Clipboard',
      description: 'Avatar configuration JSON has been copied.',
    });
    setIsJsonCopied(true);
    setTimeout(() => setIsJsonCopied(false), 2000);
  };
  
  const handleCopyJsx = () => {
    const jsxString = `<AvatarViewer traits={${JSON.stringify(traits, null, 2)}} />`;
    navigator.clipboard.writeText(jsxString);
    logCopyCode('jsx');
    toast({
      title: 'Copied to Clipboard',
      description: 'Avatar viewer JSX component has been copied.',
    });
    setIsJsxCopied(true);
    setTimeout(() => setIsJsxCopied(false), 2000);
  };

  const handleUploadAndSave = async () => {
    if (!isConnected || !address) {
      toast({
        variant: 'destructive',
        title: 'Not Connected',
        description: 'Please connect your wallet to save your avatar.',
      });
      return;
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

  const handleMint = async () => {
    toast({
      title: 'Preparing to Mint',
      description: 'Saving metadata to IPFS first...',
    });
    const ipfsCid = await handleUploadAndSave();

    if (ipfsCid && address) {
      logMintEvent('mint_initiated', { wallet: address, ipfsCid });
       toast({
        title: 'Ready to Mint (Simulated)',
        description: 'Please confirm the transaction in your wallet.',
      });
      await mint({ recipient: address, tokenURI: `ipfs://${ipfsCid}` });
    }
  }
  
  useEffect(() => {
    if(isMinted) {
       logMintEvent('mint_success', { wallet: address, transactionHash: mintData?.hash });
       toast({
        title: 'Minting Successful! (Simulated)',
        description: `Your avatar has been minted. Tx Hash: ${mintData?.hash.substring(0, 10)}...`,
      });
    }
    if (mintError) {
       logMintEvent('mint_failure', { wallet: address, error: mintError.message });
       toast({
        variant: 'destructive',
        title: 'Minting Failed (Simulated)',
        description: mintError.message || 'An unknown error occurred.',
      });
    }
  }, [isMinted, mintError, toast, address, mintData]);

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


  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="https://i.ibb.co/23rpP45B/BCO-3d4f1176-0dce-46c0-8fae-27b0347d5053.png" alt="Web3 Avatar Forge Logo" width={40} height={40} className="rounded-md" />
          </div>
          <div className='flex items-center gap-4'>
            <Button variant="ghost" size="sm" onClick={() => window.open('https://github.com/FirebaseExtended/codelabs-genkit-nextjs-web3-avatar/issues/new', '_blank')}>
                <MessageSquareQuote className="mr-2 h-4 w-4" />
                Feedback
            </Button>
            {isConnected ? (
              <div className="flex items-center gap-4">
                <p className="text-sm font-mono">{`${address?.substring(0,6)}...${address?.substring(address.length - 4)}`}</p>
                <Button variant="outline" size="sm" onClick={() => disconnect()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => connect({ connector: injected() })}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
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
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button onClick={handleCopyJson}>
                {isJsonCopied ? <CopyCheck className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {isJsonCopied ? 'Copied!' : 'Copy JSON'}
              </Button>
               <Button onClick={handleCopyJsx}>
                {isJsxCopied ? <CopyCheck className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {isJsxCopied ? 'Copied!' : 'Copy JSX'}
              </Button>
               <Button onClick={handleUploadAndSave} disabled={isSaving || !isConnected}>
                <UploadCloud className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save to IPFS & Firebase'}
              </Button>
              <Button variant="secondary" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isMinting || !isConnected} onClick={handleMint}>
                 {isMinting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isMinting ? 'Minting...' : 'Mint Avatar'}
              </Button>
            </div>
             {isMinted && mintData?.hash && (
              <p className="text-green-500 text-sm mt-2">
                Success! View simulated transaction: <code className='font-mono bg-muted p-1 rounded-sm'>{mintData.hash.substring(0,12)}...</code>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
