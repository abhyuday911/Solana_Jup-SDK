export const DataCard = () => {
  return (
    <div className="relative flex flex-col justify-between gap-2 overflow-hidden rounded-xl border border-neutral-850 p-4">
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-neutral-400">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="outline-none cursor-pointer text-neutral-400 underline decoration-neutral-600 decoration-dashed decoration-from-font underline-offset-4 text-sm"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:rr:"
              data-state="closed"
              tabIndex={-1}
            >
              Position PNL (7D)
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-1 text-neutral-400 hover:text-neutral-200 text-sm"
            >
              <span className="iconify inline-block shrink-0 ph--arrows-left-right-bold" />
            </button>
          </div>
          <span className="iconify ph--currency-dollar-bold" />
        </span>

        <div className="flex items-baseline gap-1.5">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r12:"
            data-state="closed"
            className="outline-none"
            tabIndex={-1}
          >
            <div className="flex items-center gap-1">
              <span
                className="relative inline-flex items-center rounded-sm text-sm underline decoration-dashed decoration-from-font underline-offset-4 text-rose"
                data-num="-0.6083109151472285"
              >
                <span translate="no">-$0.60831</span>
              </span>
            </div>
          </button>
          <span className="text-sm text-neutral-400">(-16.23%)</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-neutral-400">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:rs:"
            data-state="closed"
            className="outline-none"
            tabIndex={-1}
          >
            <span className="underline decoration-neutral-600 decoration-dashed decoration-from-font underline-offset-4">
              Net APY
            </span>
          </button>
          <span className="iconify ph--percent" />
        </span>
        <span className="text-sm text-neutral-200">+12.45%</span>
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-neutral-400">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:rt:"
            data-state="closed"
            className="outline-none"
            tabIndex={-1}
          >
            <span className="underline decoration-neutral-600 decoration-dashed decoration-from-font underline-offset-4">
              Liq. Price/Offset
            </span>
          </button>
          <span className="iconify ph--align-left" />
        </span>

        <span className="text-sm text-neutral-200">
          <span
            className="relative inline-flex items-center rounded-sm"
            data-num="116.3973688068535"
          >
            <span translate="no">116.40 USDC</span>
          </span>{" "}
          / 7.58%
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-neutral-400">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:ru:"
              data-state="closed"
              className="outline-none"
              tabIndex={-1}
            >
              <span className="underline decoration-neutral-600 decoration-dashed decoration-from-font underline-offset-4">
                Position Health
              </span>
            </button>
            <span className="iconify ph--shield-check" />
          </span>

          <span className="flex items-center gap-2 text-neutral-200">
            <span className="text-orange-400 text-sm">Very Risky</span>
            <span className="text-sm">73.93%</span>
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={73.93322845554225}
            aria-valuetext="74%"
            data-state="loading"
            data-value="73.93322845554225"
            data-max="100"
            className="relative h-1.5 w-full overflow-hidden rounded-xl bg-orange-400/20"
            style={{ transform: "translateY(0px)" }}
          >
            <div
              data-state="loading"
              data-value="73.93322845554225"
              data-max="100"
              className="h-full w-full bg-orange-500"
              style={{ transform: "translateX(-26.0668%)" }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>73.93%</span>
            <span>Max: L.T. 80%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
