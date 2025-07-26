// This file is the public entry point for the NPM package.
// It exports the components and hooks that will be available to other developers.

export { AvatarViewer } from '../components/avatar-viewer';
export { AvatarEditor } from '../components/avatar-editor';
export { useAvatar } from '../hooks/use-avatar';
export type { AvatarTraits, TraitCategory, TraitOption } from './types';
export { INITIAL_TRAITS } from './constants';
