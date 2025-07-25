# Web3 Avatar Forge

Welcome to the Web3 Avatar Forge! This application is a powerful playground and starting point for creating customizable, trait-based SVG avatars, integrating with Web3 wallets, and minting them as NFTs. It's built with Next.js, React, ShadCN UI, Tailwind CSS, and Genkit.

This project serves as a comprehensive demo and a boilerplate for developers looking to build applications with interoperable, user-owned digital identities.

## Features

-   **🎨 Avatar Builder UI**: A clean, intuitive, and responsive interface for customizing avatars based on various traits like hair, eyes, accessories, and background.
-   **🤖 AI-Powered Suggestions**: Utilizes Genkit to connect to the Gemini API, providing users with creative avatar variations based on their current selections.
-   **🔗 Web3 Integration**: Seamless wallet connection using `wagmi`, supporting MetaMask and other wallets.
-   **💾 Decentralized & Centralized Storage**:
    -   Saves avatar metadata to a Firebase Firestore database.
    -   Includes a (simulated) flow to upload metadata to IPFS, preparing it for decentralized storage.
-   **🖼️ NFT Minting Flow**: A complete, (simulated) end-to-end flow for minting the configured avatar as an ERC-721 NFT on the Sepolia testnet.
-   **🚀 Developer Playground**:
    -   **Copy JSON**: Instantly copy the avatar's trait configuration as a JSON object.
    -   **Copy JSX**: Copy a pre-formatted React `<AvatarViewer />` component snippet to easily integrate the avatar into other dApps.
-   ** modular & Reusable Components**: Built with `<AvatarEditor />` and `<AvatarViewer />` components that can be adapted for other projects.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   A Web3 wallet (e.g., MetaMask) configured for the Sepolia testnet.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd web3-avatar-forge
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

4.  **Run the Genkit development server (in a separate terminal):**
    This enables the AI suggestion functionality.
    ```bash
    npm run genkit:watch
    ```

## Avatar Trait System

The avatar customization is based on a simple and extensible trait system.

### Metadata Schema

Each avatar's configuration is stored using the following JSON structure. This is the object that gets saved to Firestore and uploaded to IPFS.

```json
{
  "wallet": "0x123...",
  "traits": {
    "hair": "hair1",
    "eyes": "eyes1",
    "accessories": "none",
    "background": "bg1"
  },
  "ipfs_cid": "Qm..."
}
```

-   `wallet`: The blockchain address of the avatar's owner.
-   `traits`: An object containing the selected `id` for each trait category.
-   `ipfs_cid`: The Content Identifier for the metadata file on IPFS.

### Trait Definitions

The available options for each trait are defined in `src/lib/constants.ts`. You can easily extend this by:

1.  Creating a new SVG component for your trait in `src/components/icons.tsx`.
2.  Adding a new entry to the appropriate options array in `src/lib/constants.ts`.

## How to Integrate the Avatar into Your dApp

One of the key features of this project is the ability to easily reuse the generated avatars.

### Using the "Copy JSX" Feature

1.  Customize your desired avatar in the **Web3 Avatar Forge** application.
2.  Click the **"Copy JSX"** button.
3.  This copies a React component snippet to your clipboard, which looks like this:
    ```jsx
    <AvatarViewer traits={{
      "hair": "hair2",
      "eyes": "eyes3",
      "accessories": "acc1",
      "background": "bg4"
    }} />
    ```
4.  Paste this code into your React application. You will also need to copy over the `AvatarViewer` component and its dependencies (`/src/components/avatar-viewer.tsx`, `src/components/icons.tsx`, `/src/lib/constants.ts`, and `/src/lib/types.ts`).

### Example: Profile Card

Here's how you could use the copied JSX in a simple user profile card component:

```jsx
// YourProfilePage.jsx
import { AvatarViewer } from './path/to/AvatarViewer';

const UserProfileCard = ({ userAddress, avatarTraits }) => {
  return (
    <div className="profile-card">
      <div className="avatar-container">
        {/* Paste the copied JSX here, using props */}
        <AvatarViewer traits={avatarTraits} />
      </div>
      <h3>{userAddress}</h3>
      {/* ...other profile info */}
    </div>
  );
};

export default UserProfileCard;
```

This modular approach allows for the creation of interoperable digital identities that can be displayed consistently across different applications in the Web3 ecosystem.
