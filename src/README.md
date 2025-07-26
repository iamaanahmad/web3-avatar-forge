
<div align="center">
  <img src="https://i.ibb.co/23rpP45B/BCO-3d4f1176-0dce-46c0-8fae-27b0347d5053.png" alt="Web3 Avatar Forge Logo" width="150" />
  <h1>Web3 Avatar Forge</h1>
  <p><strong>Create, customize, and integrate your unique Web3 identity.</strong></p>
  <p>A developer-friendly playground and reusable React component library for trait-based SVG avatars, AI-powered suggestions, and simulated NFT minting.</p>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/@ashqking/web3-avatar-forge">
    <img src="https://img.shields.io/npm/v/@ashqking/web3-avatar-forge?style=for-the-badge" alt="NPM Version">
  </a>
   <a href="https://www.npmjs.com/package/@ashqking/web3-avatar-forge">
    <img src="https://img.shields.io/npm/dt/@ashqking/web3-avatar-forge?style=for-the-badge" alt="NPM Downloads">
  </a>
  <a href="https://github.com/iamaanahmad/web3-avatar-forge/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/iamaanahmad/web3-avatar-forge?style=for-the-badge" alt="License">
  </a>
  <a href="https://github.com/iamaanahmad/web3-avatar-forge/issues">
    <img src="https://img.shields.io/github/issues/iamaanahmad/web3-avatar-forge?style=for-the-badge" alt="Issues">
  </a>
  <a href="https://github.com/iamaanahmad/web3-avatar-forge/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome">
  </a>
</div>

## ✨ Features

-   **🎨 Avatar Builder UI**: A clean, intuitive, and responsive interface (`<AvatarEditor />`) for customizing avatars.
-   **🤖 AI-Powered Suggestions**: Utilizes Genkit to connect to the Gemini API, providing creative avatar variations.
-   **🔗 Web3 Integration**: Seamless wallet connection using `wagmi`, supporting MetaMask and other wallets.
-   **🖼️ Reusable Viewer Component**: An easy-to-use `<AvatarViewer />` component to display configured avatars in any React app.
-   ** NPM Package**: Published on NPM with full TypeScript support for easy integration.
-   **🚀 Developer Playground**:
    -   **Copy JSON**: Instantly copy the avatar's trait configuration as a JSON object.
    -   **Copy JSX**: Copy a pre-formatted React `<AvatarViewer />` component snippet to easily integrate the avatar.

## 🛠️ Tech Stack

<div align="center">
  <a href="https://nextjs.org/" target="_blank"><img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"></a>
  <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://firebase.google.com/" target="_blank"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"></a>
  <a href="https://ai.google.dev/edge/genkit" target="_blank"><img src="https://img.shields.io/badge/Genkit-5A34BE?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Genkit"></a>
  <a href="https://wagmi.sh/" target="_blank"><img src="https://img.shields.io/badge/wagmi-black?style=for-the-badge&logo=ethereum&logoColor=white" alt="Wagmi"></a>
</div>

## 🚀 Getting Started

This repository contains the playground application for the **Web3 Avatar Forge**. The components themselves are published as an NPM package.

### Using the Components in Your Project

1.  **Install the package:**
    ```bash
    npm install @ashqking/web3-avatar-forge
    ```

2.  **Integrate the Avatar Viewer:**
    Use the `<AvatarViewer />` component to display an avatar. You can get the `traits` object from our playground or configure it yourself.

    ```jsx
    import { AvatarViewer } from '@ashqking/web3-avatar-forge';

    const MyProfile = () => {
      const avatarTraits = {
        "hair": "hair2",
        "eyes": "eyes3",
        "accessories": "acc1",
        "background": "bg4"
      };

      return (
        <div>
          <h2>My Avatar</h2>
          <div style={{ width: '200px', height: '200px' }}>
            <AvatarViewer traits={avatarTraits} />
          </div>
        </div>
      );
    }
    ```
    
> **Note**: This package is built with TypeScript and includes full type definitions for a great developer experience.


### Running the Playground Locally

If you want to run the developer playground and contribute to the project:

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
