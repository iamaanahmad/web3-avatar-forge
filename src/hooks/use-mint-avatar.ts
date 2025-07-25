'use client';
import { useWriteContract } from 'wagmi';
import { erc721ABI } from '@/lib/abi';
import { sepolia } from 'wagmi/chains';

// This is a placeholder address. Replace it with your deployed contract address.
const AVATAR_NFT_CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890';

interface MintAvatarArgs {
  recipient: `0x${string}`;
  tokenURI: string;
}

export function useMintAvatar() {
  const { data: hash, error, isPending, writeContractAsync } = useWriteContract();

  const mint = async ({ recipient, tokenURI }: MintAvatarArgs) => {
    try {
      await writeContractAsync({
        address: AVATAR_NFT_CONTRACT_ADDRESS,
        abi: erc721ABI,
        functionName: 'safeMint',
        args: [recipient, tokenURI],
        chainId: sepolia.id, // Or the chain you deployed to
      });
    } catch (e) {
      console.error("Minting error:", e);
    }
  };

  return {
    mint,
    hash,
    isPending,
    isSuccess: !!hash && !error,
    error,
  };
}
