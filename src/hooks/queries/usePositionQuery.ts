import { useQuery } from "@tanstack/react-query";
import { getCurrentPosition } from "@jup-ag/lend/borrow";
import { RpcConnection } from "@/lib/solana";
import BN from "bn.js";

export type PositionState = {
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

export interface FormattedPosition {
  collateralAmount: number;
  debtAmount: number;
  solPrice: number;
  collateralUSD: number;
  debtUSD: number;
}

export function usePositionQuery(vaultId: number, positionId: number) {
  return useQuery({
    queryKey: ["position", vaultId, positionId],
    queryFn: async () => {
      const state = await getCurrentPosition({
        vaultId,
        positionId,
        connection: RpcConnection,
      });
      return state as PositionState;
    },
    select: (data) => {
      if (!data) return null;
      
      const solPrice = 200; // Mock price as per original hook
      const collateralAmount = data.colRaw.toNumber() / 1_000_000_000;
      const debtAmount = data.debtRaw.toNumber() / 1_000_000_000;
      
      return {
        ...data,
        formatted: {
          collateralAmount,
          debtAmount,
          solPrice,
          collateralUSD: collateralAmount * solPrice,
          debtUSD: debtAmount, // usdc is 1:1
        } as FormattedPosition
      };
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
