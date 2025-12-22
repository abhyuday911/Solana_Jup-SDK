import { Connection } from '@solana/web3.js';
export const RpcConnection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, "confirmed")
