import FoodGrid from "@/app/components/food-grid";
import { DEFAULT_FOOD_COUNT, getRandomVietnameseFoods } from "@/lib/vietnamese-food";

export default async function Home() {
  const initialFoods = getRandomVietnameseFoods(DEFAULT_FOOD_COUNT);
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-6 py-12 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <FoodGrid initialFoods={initialFoods} />
      </main>
    </div>
  );
}
