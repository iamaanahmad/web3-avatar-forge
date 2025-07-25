'use client';

import * as React from 'react';
import type { AvatarTraits, TraitCategory } from '@/lib/types';
import { ACCESSORIES_OPTIONS, BACKGROUND_OPTIONS, EYES_OPTIONS, HAIR_OPTIONS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Loader2, Palette, Shirt, Eye, PersonStanding, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { logTraitSelection } from '@/services/analytics';


interface AvatarEditorProps {
  traits: AvatarTraits;
  setTraits: React.Dispatch<React.SetStateAction<AvatarTraits>>;
  suggestions: AvatarTraits[];
  onSuggest: () => void;
  isLoading: boolean;
}

const TRAIT_CATEGORIES: { id: TraitCategory; label: string; icon: React.ElementType, options: any[] }[] = [
  { id: 'hair', label: 'Hair', icon: PersonStanding, options: HAIR_OPTIONS },
  { id: 'eyes', label: 'Eyes', icon: Eye, options: EYES_OPTIONS },
  { id: 'accessories', label: 'Accessories', icon: Shirt, options: ACCESSORIES_OPTIONS },
  { id: 'background', label: 'Background', icon: Palette, options: BACKGROUND_OPTIONS },
];

export function AvatarEditor({ traits, setTraits, suggestions, onSuggest, isLoading }: AvatarEditorProps) {

  const handleTraitSelect = (category: TraitCategory, value: string) => {
    setTraits(prev => ({ ...prev, [category]: value }));
    logTraitSelection(category, value);
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <Tabs defaultValue="hair" className="flex-1 flex flex-col">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-4">
            {TRAIT_CATEGORIES.map(({ id, label, icon: Icon }) => (
              <TabsTrigger key={id} value={id}>
                <Icon className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 -mx-6">
            <div className="px-6">
            {TRAIT_CATEGORIES.map(({ id, options }) => (
              <TabsContent key={id} value={id} className="mt-0">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleTraitSelect(id, option.id)}
                      aria-label={`Select ${option.label}`}
                      className={cn(
                        "aspect-square rounded-lg border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                        traits[id] === option.id ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
                      )}
                    >
                      <div className="w-full h-full p-2" style={{ backgroundColor: option.color }}>
                        {option.icon && <option.icon />}
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            ))}
            </div>
          </ScrollArea>
        </CardContent>

        <Separator className="my-4" />

        <div className="px-6 pb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center"><Sparkles className="h-5 w-5 mr-2 text-primary" /> AI Suggestions</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Let AI suggest some cool variations for you.
          </p>
          <Button onClick={onSuggest} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {isLoading ? 'Generating...' : 'Suggest Variations'}
          </Button>
          
          <ScrollArea className="h-32 mt-4">
            <div className="grid grid-cols-4 gap-2 pr-4">
              {isLoading && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="w-full aspect-square rounded-md" />)}
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setTraits(suggestion)}
                  aria-label={`Select suggestion ${index + 1}`}
                  className="w-full aspect-square rounded-md border-2 border-transparent hover:border-accent transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-background"
                >
                  <div className="relative w-full h-full bg-muted rounded-md overflow-hidden">
                    <div className="absolute inset-0" style={{ backgroundColor: BACKGROUND_OPTIONS.find(bg => bg.id === suggestion.background)?.color }}></div>
                     <div className="absolute inset-0">
                      {React.createElement(HAIR_OPTIONS.find(h => h.id === suggestion.hair)?.icon || 'div')}
                    </div>
                    <div className="absolute inset-0">
                      {React.createElement(EYES_OPTIONS.find(e => e.id === suggestion.eyes)?.icon || 'div')}
                    </div>
                    <div className="absolute inset-0">
                      {React.createElement(ACCESSORIES_OPTIONS.find(a => a.id === suggestion.accessories)?.icon || 'div')}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Tabs>
    </Card>
  );
}
