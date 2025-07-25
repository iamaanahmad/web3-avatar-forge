import type { AvatarTraits, TraitOption } from './types';
import { Hair1, Hair2, Hair3, Hair4, Eyes1, Eyes2, Eyes3, Eyes4, Acc1, Acc2, Acc3, NoAccessory } from '@/components/icons';

export const HAIR_OPTIONS: TraitOption[] = [
  { id: 'hair1', label: 'Classic', icon: Hair1 },
  { id: 'hair2', label: 'Spiky', icon: Hair2 },
  { id: 'hair3', label: 'Bun', icon: Hair3 },
  { id: 'hair4', label: 'Headband', icon: Hair4 },
];

export const EYES_OPTIONS: TraitOption[] = [
  { id: 'eyes1', label: 'Default', icon: Eyes1 },
  { id: 'eyes2', label: 'Square', icon: Eyes2 },
  { id: 'eyes3', label: 'Angry', icon: Eyes3 },
  { id: 'eyes4', label: 'Glasses', icon: Eyes4 },
];

export const ACCESSORIES_OPTIONS: TraitOption[] = [
  { id: 'none', label: 'None', icon: NoAccessory },
  { id: 'acc1', label: 'Shades', icon: Acc1 },
  { id: 'acc2', label: 'Monocle', icon: Acc2 },
  { id: 'acc3', label: 'Bandana', icon: Acc3 },
];

export const BACKGROUND_OPTIONS: TraitOption[] = [
  { id: 'bg1', label: 'Dusk', color: '#454862' },
  { id: 'bg2', label: 'Sky', color: '#aaccff' },
  { id: 'bg3', label: 'Mint', color: '#aaffd4' },
  { id: 'bg4', label: 'Rose', color: '#ffb5cb' },
];

export const INITIAL_TRAITS: AvatarTraits = {
  hair: 'hair1',
  eyes: 'eyes1',
  accessories: 'none',
  background: 'bg1',
};
