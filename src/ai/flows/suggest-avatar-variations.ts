// Implemented Web3 Avatar Forge - Suggest Avatar Variations Genkit Flow

'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests avatar variations based on the user's current selection.
 *
 * - suggestAvatarVariations - A function that takes the current avatar configuration as input and returns suggested variations.
 * - SuggestAvatarVariationsInput - The input type for the suggestAvatarVariations function.
 * - SuggestAvatarVariationsOutput - The output type for the suggestAvatarVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the avatar configuration.
const SuggestAvatarVariationsInputSchema = z.object({
  hair: z.string().describe('The selected hair style.'),
  eyes: z.string().describe('The selected eye style.'),
  accessories: z.string().describe('The selected accessories.'),
  background: z.string().describe('The selected background.'),
});
export type SuggestAvatarVariationsInput = z.infer<typeof SuggestAvatarVariationsInputSchema>;

// Define the output schema for the suggested avatar variations.
const SuggestAvatarVariationsOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      hair: z.string().describe('A suggested hair style variation.'),
      eyes: z.string().describe('A suggested eye style variation.'),
      accessories: z.string().describe('A suggested accessories variation.'),
      background: z.string().describe('A suggested background variation.'),
    })
  ).describe('An array of suggested avatar variations.'),
});
export type SuggestAvatarVariationsOutput = z.infer<typeof SuggestAvatarVariationsOutputSchema>;

// Exported function to suggest avatar variations
export async function suggestAvatarVariations(
  input: SuggestAvatarVariationsInput
): Promise<SuggestAvatarVariationsOutput> {
  return suggestAvatarVariationsFlow(input);
}

// Define the prompt for suggesting avatar variations.
const suggestAvatarVariationsPrompt = ai.definePrompt({
  name: 'suggestAvatarVariationsPrompt',
  input: {schema: SuggestAvatarVariationsInputSchema},
  output: {schema: SuggestAvatarVariationsOutputSchema},
  prompt: `You are an avatar design assistant. Given the current avatar configuration, suggest a few variations that the user might like.

Current Avatar Configuration:
Hair: {{{hair}}}
Eyes: {{{eyes}}}
Accessories: {{{accessories}}}
Background: {{{background}}}

Suggest a few avatar variations with different combinations of hair, eyes, accessories and backgrounds. Return the variations in JSON format.

Consider changes to each trait individually and in combination with others, keeping in mind the overall aesthetic.

{{zodToJsonSchema(SuggestAvatarVariationsOutputSchema)}}`,
});

// Define the Genkit flow for suggesting avatar variations.
const suggestAvatarVariationsFlow = ai.defineFlow(
  {
    name: 'suggestAvatarVariationsFlow',
    inputSchema: SuggestAvatarVariationsInputSchema,
    outputSchema: SuggestAvatarVariationsOutputSchema,
  },
  async input => {
    const {output} = await suggestAvatarVariationsPrompt(input);
    return output!;
  }
);
