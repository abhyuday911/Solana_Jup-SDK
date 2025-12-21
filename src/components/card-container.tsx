"use client";

import { useSearchParams } from "next/navigation";
import { usePosition } from "@/hooks/usePosition";

import { CustomCard } from "./ui/custom/card";
import { DataCard } from "./ui/custom/data-card";

const CardContainer = () => {
  const searchParams = useSearchParams();

  const vaultIdParam = searchParams.get("vaultId");
  const positionIdParam = searchParams.get("positionId");

  const vaultId = vaultIdParam ? parseInt(vaultIdParam) : 1;
  const positionId = positionIdParam ? parseInt(positionIdParam) : 330;

  const {
    formatted: positionData,
    loading,
    error,
  } = usePosition(vaultId, positionId);

  console.log("CardContainer Debug:", { positionData, loading, error });

  if (loading) {
    return (
      <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-[#19242e] bg-[#0B121A] h-[195px] animate-pulse">
          <div className="border-b border-neutral-850 p-4 h-[45px]" />
          <div className="border-b border-neutral-850 p-4 h-[85px]" />
          <div className="p-4 grid grid-cols-2 gap-4 h-[63px]">
            <div className="bg-[#0d1520] rounded-lg" />
            <div className="bg-[#0d1520] rounded-lg" />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#19242e] bg-[#0B121A] h-[195px] animate-pulse">
          <div className="border-b border-neutral-850 p-4 h-[45px]" />
          <div className="border-b border-neutral-850 p-4 h-[85px]" />
          <div className="p-4 grid grid-cols-2 gap-4 h-[63px]">
            <div className="bg-[#0d1520] rounded-lg" />
            <div className="bg-[#0d1520] rounded-lg" />
          </div>
        </div>

        <div className="relative flex flex-col justify-between gap-2 overflow-hidden rounded-xl border border-neutral-850 p-4 h-[195px] bg-[#0B121A] animate-pulse">
          <div className="w-full h-6 bg-[#0d1520] rounded" />
          <div className="w-full h-6 bg-[#0d1520] rounded" />
          <div className="w-full h-6 bg-[#0d1520] rounded" />
          <div className="w-full h-16 bg-[#0d1520] rounded mt-auto" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-500/10 rounded-xl">
        Error loading position data: {error?.message || "Unknown error"}
      </div>
    );
  }

  const data = positionData || {
    collateralAmount: 0,
    collateralUSD: 0,
    debtAmount: 0,
    debtUSD: 0,
    solPrice: 0,
  };

  const collateralAmountFormatted =
    data.collateralAmount >= 1
      ? data.collateralAmount.toFixed(2)
      : data.collateralAmount.toFixed(6);
  const collateralUSDFormatted = `$${data.collateralUSD.toFixed(2)}`;
  const debtAmountFormatted = data.debtAmount.toFixed(2);
  const debtUSDFormatted = `$${data.debtUSD.toFixed(2)}`;

  return (
    <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2">
      <CustomCard
        title="Supplied Collateral"
        tokenSymbol="SOL"
        tokenAmount={data.collateralAmount}
        tokenAmountFormatted={collateralAmountFormatted}
        usdValue={data.collateralUSD}
        usdValueFormatted={collateralUSDFormatted}
        tokenIcon="https://cdn.instadapp.io/icons/jupiter/tokens/sol.png"
        tokenName="Wrapped SOL"
        apyFormatted="7.2%"
        type="collateral"
        borrowed={data.debtAmount}
        supplied={data.collateralAmount}
        suppliedUsd={data.collateralUSD}
        solPrice={data.solPrice}
      />
      <CustomCard
        title="Borrowed Debt"
        tokenSymbol="USDC"
        tokenAmount={data.debtAmount}
        tokenAmountFormatted={debtAmountFormatted}
        usdValue={data.debtUSD}
        usdValueFormatted={debtUSDFormatted}
        tokenIcon="https://cdn.instadapp.io/icons/jupiter/tokens/usdc.png"
        tokenName="USD Coin"
        apyFormatted="5.1%"
        type="debt"
        borrowed={data.debtAmount}
        supplied={data.collateralAmount}
        suppliedUsd={data.collateralUSD}
        solPrice={data.solPrice}
      />
      <DataCard
        suppliedAmount={data.collateralAmount || 0}
        suppliedToken="SOL"
        suppliedAPY={7.2}
        borrowedAmount={data.debtAmount || 0}
        borrowedToken="USDC"
        borrowedAPY={5.1}
        solPrice={data.solPrice}
      />
    </div>
  );
};

export default CardContainer;
