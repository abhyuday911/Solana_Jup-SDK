import { useEffect, useState } from "react";
import { getCurrentPosition } from "@jup-ag/lend/borrow";
import { RpcConnection } from "@/lib/solana";
import BN from "bn.js";

type PositionState = {
  tick: number;
  tickId: number;
  colRaw: BN;
  finalAmount: BN;
  debtRaw: BN;
  dustDebtRaw: BN;
  isSupplyOnlyPosition: boolean;
  userLiquidationStatus: boolean;
  postLiquidationBranchId: number;
} | null;

export function usePosition(vaultId: number, positionId: number) {
  const [position, setPosition] = useState<PositionState>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const state = await getCurrentPosition({
          vaultId,
          positionId,
          connection: RpcConnection,
        });
        setPosition(state);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching position:", error);
        setError(error as Error);
        setLoading(false);
      }
    }

    load();
  }, [vaultId, positionId]);

  const formatted = position
    ? {
        collateralAmount: position.colRaw.toNumber() / 1_000_000_000, // sol 9 decimals
        debtAmount: position.debtRaw.toNumber() / 1_000_000_000, // 9 decimals normalized thats how jup deal with usdc
        solPrice: 200, // Mock price
        collateralUSD: (position.colRaw.toNumber() / 1_000_000_000) * 200,
        debtUSD: position.debtRaw.toNumber() / 1_000_000_000, // usdc is 1:1
      }
    : null;

  return { position, formatted, loading, error };
}
