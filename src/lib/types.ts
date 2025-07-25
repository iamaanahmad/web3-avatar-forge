export type TraitCategory = 'hair' | 'eyes' | 'accessories' | 'background';

export interface AvatarTraits {
  hair: string;
  eyes: string;
  accessories: string;
  background: string;
}

export interface TraitOption {
    id: string;
    label:string;
    icon?: React.ElementType;
    color?: string;
}
