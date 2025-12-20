import Image from "next/image";
import React from "react";

export const CustomCard = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#19242e] bg-[#0B121A]">
      <div className="flex items-center justify-between border-b border-neutral-850 p-4">
        <span className="text-xs font-medium text-neutral-200">
          Supplied Collateral
        </span>
      </div>
      <div className="flex items-center justify-between border-b border-neutral-850 p-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Image
            className="size-9 sm:size-10"
            height="32"
            width="32"
            alt="Wrapped SOL"
            src="https://cdn.instadapp.io/icons/jupiter/tokens/sol.png"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-neutral-200 sm:text-xl">
              <span
                className="relative items-center rounded-sm inline-block"
                data-num="0.094314852"
              >
                <span translate="no">0.094314 SOL</span>
              </span>
            </span>
            <span
              className="relative inline-flex items-center rounded-sm text-xs text-neutral-400"
              data-num="11.90537039341349"
            >
              <span translate="no">$11.91</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1.5 text-lg font-medium sm:text-xl">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:rn:"
              data-state="closed"
              className="outline-none"
            >
              <div className="flex items-center gap-1">
                <div className="flex items-center -space-x-1.5 empty:hidden">
                  <Image
                    className="size-4"
                    height="32"
                    width="32"
                    alt="Wrapped SOL"
                    src="https://cdn.instadapp.io/icons/jupiter/tokens/sol.png"
                  />
                </div>
                <span className="flex underline decoration-dashed decoration-from-font underline-offset-4 text-emerald-400">
                  6.5%
                </span>
              </div>
            </button>
          </div>
          <button
            type="button"
            className="outline-none inline-flex items-center gap-1 hover:text-neutral-200 ml-auto text-xs text-neutral-400"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:ro:"
            data-state="closed"
          >
            <span className="uppercase"> apy</span>
            <span className="iconify inline-block shrink-0 ph--arrows-left-right-bold"></span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4 sm:gap-4">
        <a
          className="inline-flex items-center justify-center gap-1.5 font-medium transition-colors focus:outline-none focus:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-primary text-neutral-950 hover:bg-primary-300  focus:ring-primary-300 px-4 py-2.5 text-xs rounded-lg"
          href="/lend/borrow/1/nfts/1/actions/deposit"
        >
          <span className="inline-flex empty:hidden"></span>
          <span className="contents truncate">Deposit</span>
          <span className="inline-flex empty:hidden"></span>
        </a>
        <a
          className="inline-flex items-center justify-center gap-1.5 font-medium transition-colors focus:outline-none focus:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-primary/5 text-primary-200 hover:bg-primary/20 focus:ring-primary/10 px-4 py-2.5 text-xs rounded-lg"
          href="/lend/borrow/1/nfts/1/actions/withdraw"
        >
          <span className="inline-flex empty:hidden"></span>
          <span className="contents truncate">Withdraw</span>
          <span className="inline-flex empty:hidden"></span>
        </a>
      </div>
    </div>
  );
};
