# Orbit Relay CLI

**Orbit Relay CLI** is a command-line tool that makes token airdrops simple, affordable, and accessible. Whether you're distributing to Saga Chapter 2 holders, NFT/cNFT holders, SPL token holders, or using a CSV file, Orbit Relay CLI streamlines the process and cuts costs.

## Features

- 🚀 **Simplified Airdrops**: Easy token airdrops for all, no technical skills needed.
- 💸 **ZK Compression**: Cut costs on large airdrops by reducing account usage. [More info](https://www.zkcompression.com/).

## Requirements

- Ensure you have Node >= v20.9.0 and pnpm >= v9.13.2 installed on your machine.
- You will need an RPC that supports both ZK Compression and the DAS API. If you don't have one, you can get one for free at https://www.helius.dev
- You will need a valid Solana filesystem wallet. If you don't have one yet, visit the [Solana documentation](https://docs.solanalabs.com/cli/wallets/file-system) for details. The CLI will use this wallet for signing transactions, covering transaction fees, and as the owner of the token you wish to distribute.

## Installation

### Using npm

```bash
npm install -g orbit-relay-cli
```

### Build from source using pnpm

```bash
git clone https://github.com/didier3529/Orbit-Relay-2.0.git
cd Orbit-Relay-2.0
pnpm install && pnpm build
cd packages/cli
pnpm link --global
orbit-relay --help
```

## Example

To perform an airdrop, use the following command and follow the steps:

```bash
orbit-relay --keypair /path/to/your/airdrop_wallet.json --url "https://mainnet.helius-rpc.com/?api-key=<YOUR_API_KEY>"
```

Replace `/path/to/your/airdrop_wallet.json` with the path to your Solana filesystem wallet that holds the token you wish to distribute and some SOL to pay for the transaction fees. Replace `https://mainnet.helius-rpc.com/?api-key=<YOUR_API_KEY>` with your RPC URL and API key.
