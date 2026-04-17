import { NextRequest } from "next/server";

import { DEFAULT_FOOD_COUNT, getRandomVietnameseFoods } from "@/lib/vietnamese-food";

export async function GET(request: NextRequest) {
  const countParam = request.nextUrl.searchParams.get("count");
  const parsedCount = Number(countParam ?? String(DEFAULT_FOOD_COUNT));
  const foods = getRandomVietnameseFoods(parsedCount);

  return Response.json({
    total: foods.length,
    generatedAt: new Date().toISOString(),
    foods,
  });
}
