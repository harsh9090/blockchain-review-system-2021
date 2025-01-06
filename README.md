# Blockchain-Based Decentralized Review System

A decentralized review system leveraging blockchain technology to provide a secure, transparent, and tamper-proof platform for online reviews. Built with Ethereum, IPFS, and Smart Contracts, this project addresses the limitations of centralized review systems.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Functionalities](#functionalities)
- [User Interface](#user-interface)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [How It Works](#how-it-works)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)
- [Acknowledgments](#acknowledgments)
- [License](#license)

---

## Overview

Online review systems are often manipulated, leading to a lack of trust and reliability. This project aims to overcome these challenges by using blockchain technology to make reviews immutable, transparent, and trustworthy.

---

## Features

- **Tamper-Proof Reviews**: Data stored using IPFS and verified through Ethereum ensures immutability.
- **Decentralized Architecture**: Removes reliance on a central authority, giving users complete control over their data.
- **User Rewards**: Reviewers earn points for contributions, encouraging participation.
- **Flood Prevention**: Restricts users to one review per product to ensure authenticity.
- **Transparent Verification**: All reviews and transactions are publicly verifiable on the blockchain.

---

## System Architecture

- **Blockchain**: Ethereum serves as the foundation for smart contracts and data verification.
- **IPFS**: Acts as a decentralized file storage system for product and review data.
- **Frontend**: Angular-based interface for seamless interaction with the system.

---

## Functionalities

1. **Add Product**: Product owners can register products with metadata stored securely.
2. **Submit Reviews**: Users can add reviews and ratings for registered products.
3. **View Reviews**: Reviews can be fetched and displayed transparently using blockchain-stored hashes.
4. **Redeem Points**: Reviewers can convert earned points into rewards.

---

## User Interface

- **Dashboard**: Overview of system activities, including added products and reviews.
- **Add Places**: Enables product owners to add products with metadata.
- **View Places**: Displays registered products with filtering options.
- **Add Review**: Interface for users to write detailed reviews.
- **User Profile**: Summarizes user activity, including added products and reviews.
- **Redeem Points**: Allows users to redeem accumulated points for rewards.

---

## Technology Stack

- **Frontend Framework**: Angular for a dynamic user experience.
- **Blockchain**: Ethereum for secure and immutable transactions.
- **Storage**: IPFS for decentralized and cost-effective file storage.
- **Smart Contracts**: Solidity to implement system logic.

---

## Setup Instructions

### Prerequisites

- Install a package manager (e.g., npm or yarn) for managing dependencies.
- Install a blockchain development environment (e.g., Truffle, Hardhat, or Remix IDE) to deploy smart contracts.
- Ensure MetaMask or another Ethereum wallet is configured for testing.

### Steps to Set Up

1. Clone the repository:
   - Download or clone this repository to your local system.

2. Install frontend dependencies:
   - Navigate to the frontend folder and install required dependencies using your package manager.

3. Deploy the smart contract:
   - Use your preferred blockchain development environment to deploy the smart contract (`MyContract.sol`).

4. Update configuration:
   - Add the deployed contract address and required API keys to the frontend configuration.

5. Run the application:
   - Start the development server for the frontend to test the application locally.

---

## How It Works

1. **Product Registration**:
   - Owners register products by uploading metadata to IPFS. The IPFS hash is stored on the blockchain.
2. **Review Submission**:
   - Users add reviews, which are uploaded to IPFS. Their hashes are linked to the product on the blockchain.
3. **Review Display**:
   - Stored hashes are queried from the blockchain to fetch reviews from IPFS for display.

---

## Future Enhancements

- **Enhanced Storage Systems**: Explore faster and more efficient decentralized storage options.
- **AI-Powered Fraud Detection**: Analyze user behavior to identify and mitigate fake reviews.
- **Language Filtering**: Introduce tools to ensure professional language in reviews.

---
