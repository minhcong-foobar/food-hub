"use client";

import { useState } from "react";

import { DEFAULT_FOOD_COUNT, type VietnameseFood } from "@/lib/vietnamese-food";

type FoodResponse = {
  total: number;
  generatedAt: string;
  foods: VietnameseFood[];
};

const regionStyle: Record<VietnameseFood["region"], string> = {
  North:
    "bg-linear-to-r from-sky-500/15 via-cyan-500/10 to-blue-500/15 text-sky-900 ring-sky-300/70",
  Central:
    "bg-linear-to-r from-orange-500/15 via-amber-500/10 to-yellow-500/15 text-amber-900 ring-amber-300/70",
  South:
    "bg-linear-to-r from-emerald-500/15 via-lime-500/10 to-green-500/15 text-emerald-900 ring-emerald-300/70",
};

type FoodGridProps = {
  initialFoods: VietnameseFood[];
};

export default function FoodGrid({ initialFoods }: FoodGridProps) {
  const [foods, setFoods] = useState(initialFoods);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleShuffle() {
    try {
      setIsRefreshing(true);
      setError(null);

      const response = await fetch(`/api/vietnamese-food?count=${DEFAULT_FOOD_COUNT}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load food list right now.");
      }

      const data: FoodResponse = await response.json();
      setFoods(data.foods);
    } catch {
      setError("Could not fetch foods. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300 uppercase">
            Food Hub
          </p>
          <h1 className="text-4xl leading-tight font-black tracking-tight sm:text-5xl">
            Random Vietnamese Food
          </h1>
          <p className="max-w-2xl text-zinc-300">
            Explore a fresh mix of iconic dishes from North, Central, and South
            Vietnam. Hover on each card for playful motion and glow.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void handleShuffle()}
          disabled={isRefreshing}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-cyan-400/60 bg-cyan-500/10 px-5 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400/20 hover:shadow-[0_12px_30px_-12px_rgba(34,211,238,0.8)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isRefreshing ? "Shuffling..." : "Shuffle Foods"}
        </button>
      </header>

      {error ? (
        <div className="rounded-2xl border border-red-400/40 bg-red-500/10 px-6 py-5 text-red-100">
          <p>{error}</p>
        </div>
      ) : null}

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <article
            key={food.id}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xs transition-all duration-400 hover:-translate-y-2 hover:border-cyan-400/70 hover:shadow-[0_28px_65px_-28px_rgba(34,211,238,0.75)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
              <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-cyan-400/20 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-fuchsia-400/20 blur-2xl" />
            </div>

            <div className="relative z-10 flex h-full flex-col gap-4">
              <div className="flex items-start justify-between">
                <p className="text-4xl leading-none transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                  {food.emoji}
                </p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${regionStyle[food.region]}`}
                >
                  {food.region}
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
                  {food.name}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-300">
                  {food.shortDescription}
                </p>
              </div>

              <p className="mt-auto rounded-xl border border-zinc-700/60 bg-zinc-950/70 px-3 py-2 text-sm text-zinc-200 transition-colors duration-300 group-hover:border-cyan-300/60 group-hover:text-zinc-100">
                <span className="font-semibold text-cyan-300">Fun fact:</span>{" "}
                {food.funFact}
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
