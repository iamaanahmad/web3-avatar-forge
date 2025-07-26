
<div align="center">
  <img src="https://i.ibb.co/23rpP45B/BCO-3d4f1176-0dce-46c0-8fae-27b0347d5053.png" alt="Web3 Avatar Forge Logo" width="150" />
  <h1>Web3 Avatar Forge</h1>
  <p><strong>Create, customize, and mint your unique Web3 identity.</strong></p>
  <p>A developer-friendly playground for trait-based SVG avatars, AI-powered suggestions, and simulated NFT minting.</p>
</div>

<div align="center">
  <a href="https://github.com/iamaanahmad/web3-avatar-forge/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/iamaanahmad/web3-avatar-forge?style=for-the-badge" alt="License">
  </a>
  <a href="https://github.com/iamaanahmad/web3-avatar-forge/issues">
    <img src="https://img.shields.io/github/issues/iamaanahmad/web3-avatar-forge?style=for-the-badge" alt="Issues">
  </a>
  <a href="https://github.com/iamaanahmad/web3-avatar-forge/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome">
  </a>
   <a href="https://github.com/iamaanahmad/web3-avatar-forge/stargazers">
    <img src="https://img.shields.io/github/stars/iamaanahmad/web3-avatar-forge?style=for-the-badge" alt="Stars">
  </a>
</div>

## ✨ Features

-   **🎨 Avatar Builder UI**: A clean, intuitive, and responsive interface for customizing avatars based on various traits.
-   **🤖 AI-Powered Suggestions**: Utilizes Genkit to connect to the Gemini API, providing creative avatar variations.
-   **🔗 Web3 Integration**: Seamless wallet connection using `wagmi`, supporting MetaMask and other wallets.
-   **💾 Simulated Decentralized Storage**: Includes a simulated flow to upload metadata to IPFS, preparing it for decentralized storage.
-   **🖼️ Simulated NFT Minting**: A complete, simulated end-to-end flow for minting the configured avatar as an ERC-721 NFT.
-   **🚀 Developer Playground**:
    -   **Copy JSON**: Instantly copy the avatar's trait configuration as a JSON object.
    -   **Copy JSX**: Copy a pre-formatted React `<AvatarViewer />` component snippet to easily integrate the avatar.

## 🛠️ Tech Stack

<div align="center">
  <a href="https://nextjs.org/" target="_blank"><img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"></a>
  <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://firebase.google.com/" target="_blank"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"></a>
  <a href="https://ai.google.dev/edge/genkit" target="_blank"><img src="https://img.shields.io/badge/Genkit-5A34BE?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Genkit"></a>
  <a href="https://wagmi.sh/" target="_blank"><img src="https://img.shields.io/badge/wagmi-black?style=for-the-badge&logo=ethereum&logoColor=white" alt="Wagmi"></a>
</div>

## 🚀 Getting Started

This repository contains the developer playground for the **Web3 Avatar Forge**. The reusable components are published as an NPM package. For instructions on using the package, see the [package README](https://www.npmjs.com/package/@ashqking/web3-avatar-forge).

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   A Web3 wallet (e.g., MetaMask) configured for the Sepolia testnet.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/iamaanahmad/web3-avatar-forge.git
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

## 🧩 How to Integrate the Avatar into Your dApp

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

## 🤝 Contributing

This project is open-source and we welcome contributions! Whether you're a developer, designer, or just have ideas, feel free to get involved.

-   **Report Bugs**: If you find a bug, please [open an issue](https://github.com/iamaanahmad/web3-avatar-forge/issues).
-   **Suggest Features**: Have an idea for a new feature or improvement? [Open an issue](https://github.com/iamaanahmad/web3-avatar-forge/issues) to start a discussion.
-   **Submit Pull Requests**: We're happy to review and merge pull requests that improve the project.

## ❤️ Contributors

A huge thanks to all the people who have contributed to this project.

<a href="https://github.com/iamaanahmad/web3-avatar-forge/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=iamaanahmad/web3-avatar-forge" />
</a>
