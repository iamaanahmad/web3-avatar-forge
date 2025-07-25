'use client';

import * as React from 'react';
import type { AvatarTraits } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ACCESSORIES_OPTIONS, BACKGROUND_OPTIONS, EYES_OPTIONS, HAIR_OPTIONS } from '@/lib/constants';

interface AvatarViewerProps {
  traits: AvatarTraits;
}

export function AvatarViewer({ traits }: AvatarViewerProps) {
  const HairComponent = HAIR_OPTIONS.find(h => h.id === traits.hair)?.icon || (() => null);
  const EyesComponent = EYES_OPTIONS.find(e => e.id === traits.eyes)?.icon || (() => null);
  const AccessoriesComponent = ACCESSORIES_OPTIONS.find(a => a.id === traits.accessories)?.icon || (() => null);
  const backgroundColor = BACKGROUND_OPTIONS.find(b => b.id === traits.background)?.color || '#ffffff';

  return (
    <Card className="w-full aspect-square shadow-2xl transition-all duration-500 ease-in-out" style={{ backgroundColor }}>
      <CardContent className="p-0 w-full h-full">
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute w-full h-full transition-all duration-300">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="#f0e2d7" />
                </svg>
            </div>
            <div className="absolute w-full h-full transition-all duration-300">
                <HairComponent />
            </div>
            <div className="absolute w-full h-full transition-all duration-300">
                <EyesComponent />
            </div>
            <div className="absolute w-full h-full transition-all duration-300">
                <AccessoriesComponent />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
