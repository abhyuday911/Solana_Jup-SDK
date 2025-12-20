import { BorrowActions } from "@/components/borrow-actions";
import { HomeBorowHead } from "@/components/borrow-head";
import { CustomCard } from "@/components/ui/custom/card";
import { DataCard } from "@/components/ui/custom/data-card";

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-full flex-1 flex-col gap-4 md:py-10 lg:gap-8 xl:max-w-7xl pt-12.5 md:pt-12.5">
      <div className="flex flex-col gap-4 px-2 pt-2 sm:gap-6 sm:px-4 sm:pt-4">
        <HomeBorowHead />
        <div
          id="cardContainer"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <CustomCard />
          <CustomCard />
          <DataCard />
        </div>
        <BorrowActions />
      </div>
    </section>
  );
}
