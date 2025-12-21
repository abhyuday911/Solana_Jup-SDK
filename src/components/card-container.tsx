"use client";

import { CustomCard } from "./ui/custom/card";
import { DataCard } from "./ui/custom/data-card";

const CardContainer = () => {
  const loading = false;
  const error = null;

  const positionData = {
    collateralAmount: 23.87,
    collateralUSD: 3401.59,
    debtAmount: 0.0,
    debtUSD: 0.0,
    solPrice: 142.5,
  };

  if (loading) {
    return (
      <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2">
        <div className="animate-pulse bg-[#0d1520] rounded-xl h-32" />
        <div className="animate-pulse bg-[#0d1520] rounded-xl h-32" />
        <div className="animate-pulse bg-[#0d1520] rounded-xl h-32" />
      </div>
    );
  }

  if (error || !positionData) {
    return (
      <div className="text-red-500 p-4 bg-red-500/10 rounded-xl">
        Error loading position data: {error?.message || "Unknown error"}
      </div>
    );
  }

  const collateralAmountFormatted =
    positionData.collateralAmount >= 1
      ? positionData.collateralAmount.toFixed(2)
      : positionData.collateralAmount.toFixed(6);
  const collateralUSDFormatted = `$${positionData.collateralUSD.toFixed(2)}`;
  const debtAmountFormatted = positionData.debtUSD.toFixed(2);
  const debtUSDFormatted = `$${positionData.debtUSD.toFixed(2)}`;

  return (
    <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2">
      <CustomCard
        title="Supplied Collateral"
        tokenSymbol="SOL"
        tokenAmount={positionData.collateralAmount}
        tokenAmountFormatted={collateralAmountFormatted}
        usdValue={positionData.collateralUSD}
        usdValueFormatted={collateralUSDFormatted}
        tokenIcon="https://cdn.instadapp.io/icons/jupiter/tokens/sol.png"
        tokenName="Wrapped SOL"
        apyFormatted="7.2%"
        type="collateral"
        borrowed={positionData.debtAmount}
        supplied={positionData.collateralAmount}
        suppliedUsd={positionData.collateralUSD}
        solPrice={positionData.solPrice}
      />
      <CustomCard
        title="Borrowed Debt"
        tokenSymbol="USDC"
        tokenAmount={positionData.debtUSD}
        tokenAmountFormatted={debtAmountFormatted}
        usdValue={positionData.debtUSD}
        usdValueFormatted={debtUSDFormatted}
        tokenIcon="https://cdn.instadapp.io/icons/jupiter/tokens/usdc.png"
        tokenName="USD Coin"
        apyFormatted="5.1%"
        type="debt"
        borrowed={positionData.debtUSD}
        supplied={positionData.collateralAmount}
        suppliedUsd={positionData.collateralUSD}
        solPrice={positionData.solPrice}
      />
      <DataCard
        suppliedAmount={positionData.collateralAmount || 0}
        suppliedToken="SOL"
        suppliedAPY={7.2}
        borrowedAmount={positionData.debtAmount || 0}
        borrowedToken="USDC"
        borrowedAPY={5.1}
        solPrice={positionData.solPrice}
      />
    </div>
  );
};

export default CardContainer;
