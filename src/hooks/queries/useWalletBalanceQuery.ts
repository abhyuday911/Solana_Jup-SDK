import { useQuery } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { RpcConnection } from "@/lib/solana";

export function useWalletBalanceQuery(publicKey: PublicKey | null) {
  return useQuery({
    queryKey: ["walletBalance", publicKey?.toBase58()],
    queryFn: async () => {
      if (!publicKey) return 0;
      const balance = await RpcConnection.getBalance(publicKey);
      return balance / 1e9;
    },
    enabled: !!publicKey,
    staleTime: 30 * 1000, // 30 seconds for balance
  });
}
