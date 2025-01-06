# Blockchain-Based Decentralized Review System

A decentralized review system utilizing blockchain technology to ensure transparency, trustworthiness, and data security. Built with Ethereum, IPFS, and Smart Contracts, this system aims to overcome the limitations of traditional centralized review systems.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Functionalities](#functionalities)
- [User Interface](#user-interface)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [How It Works](#how-it-works)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)
- [Acknowledgments](#acknowledgments)
- [License](#license)

---

## Overview

Traditional review systems are prone to issues such as manipulation, fake reviews, and lack of transparency. Our project addresses these challenges by creating a tamper-proof, transparent, and decentralized review system using blockchain technology.

---

## Features

- **Decentralized System**: Eliminates central authority, ensuring data integrity and transparency.
- **Tamper-Proof Storage**: Reviews are stored on IPFS with hashes secured on the Ethereum blockchain.
- **User Incentives**: Reviewers earn points redeemable for rewards, encouraging authentic reviews.
- **Transparent Verification**: All transactions and reviews are publicly verifiable on the blockchain.
- **Flood Control**: Restricts one review per user per product to prevent spamming.

---

## System Architecture

- **Blockchain**: Ethereum-based smart contracts for managing reviews and transactions.
- **IPFS**: Decentralized storage system for efficient and cost-effective data handling.
- **Frontend**: Angular-based web application for a seamless user interface.

---

## Functionalities

1. **Add Product**: Allows product owners to register products with metadata stored on IPFS.
2. **Add Review**: Users can submit detailed reviews with associated ratings.
3. **View Reviews**: Fetches and displays reviews securely stored on the blockchain and IPFS.
4. **User Rewards**: Earn points for leaving reviews, which can be redeemed for benefits.

---

## User Interface

### Dashboard
Overview of added products, reviews, and system statistics.

### Add Places
Allows product owners to add products to the platform.

### View Places
Displays all products with filtering options for categories and names.

### Add Review
Provides an interface for users to add detailed reviews for products.

### User Profile
Displays user-specific activity, including added products and reviews.

### Redeem Points
Allows users to redeem accumulated points for rewards.

---

## Technology Stack

- **Frontend**: Angular
- **Blockchain**: Ethereum
- **Storage**: IPFS
- **Smart Contracts**: Solidity

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harsh9090/blockchain-review-system-2021.git
   cd blockchain-review-system-2021
