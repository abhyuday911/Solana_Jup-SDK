# Jupiter Lend Page Replication

This project is a Next.js application that replicates the functionality of the Jupiter Lend/Borrow page. It is built using the `@jup-ag/lend` SDK and supports core lending operations on Solana. The UI for the implemented components is a **pixel-perfect clone** of the provided sample.

## [Deployemnt link ](https://solana-jup.vercel.app/)

## Videos

**Deposite Workflow Video:**

https://github.com/user-attachments/assets/52834e9d-62a8-4dcf-8f0d-254926bfb0d0

**Withdraw, Borrow & Repay Workflow Video:**

https://github.com/user-attachments/assets/4dc59292-01e9-4882-beea-6db5e60e8c85

**Fetching Different Positions through searchParams:**

https://github.com/user-attachments/assets/0b19f76c-3787-46ab-a0dd-60e3dc5f57ce

## Features

### 1. Load User Position

- Fetches and displays user position data using `getCurrentPosition` from `@jup-ag/lend/borrow`.
- Shows collateral, debt, LTV, and other health metrics.
- Uses `vaultId` and `positionId` from URL parameters.

### 2. Core Operations

Supports the four main lending operations based on user input:

| Operation    | Condition         | Meaning           |
| ------------ | ----------------- | ----------------- |
| **Deposit**  | `col_amount > 0`  | Add collateral    |
| **Withdraw** | `col_amount < 0`  | Remove collateral |
| **Borrow**   | `debt_amount > 0` | Increase debt     |
| **Payback**  | `debt_amount < 0` | Reduce debt       |

Uses `getOperateIx` to generate instructions and manages transactions via standard Solana wallet adapters.

### 3. Interaction

- Interactive UI to switch between Deposit/Withdraw and Borrow/Repay modes.
- Input fields for amounts with validation.
- Connect Wallet integration for signing transactions.
- **Custom Wallet Button**: The wallet connection button has been customized to be an exact clone of the Jupiter interface.
- **Robust Error Handling**: Comprehensive handling of edge cases including insufficient funds, wallet not connected, and network errors.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [https://solana-jup.vercel.app/?vaultId=1&positionId=5996](https://solana-jup.vercel.app/?vaultId=1&positionId=5996) with your browser to see the result.

## Test Links

You can verify the functionality with different `vaultId` and `positionId` query parameters:

- [https://solana-jup.vercel.app/?vaultId=1&positionId=370](https://solana-jup.vercel.app/?vaultId=1&positionId=370)
- [https://solana-jup.vercel.app/?vaultId=1&positionId=330](https://solana-jup.vercel.app/?vaultId=1&positionId=330)
- [https://solana-jup.vercel.app/?vaultId=1&positionId=1111](https://solana-jup.vercel.app/?vaultId=1&positionId=1111)
- [https://solana-jup.vercel.app/?vaultId=1&positionId=1917](https://solana-jup.vercel.app/?vaultId=1&positionId=1917)

## Tech Stack

- **Framework**: Next.js 16
- **SDK**: `@jup-ag/lend`
- **Solana Integration**: `@solana/wallet-adapter`
- **Styling**: Tailwind CSS
