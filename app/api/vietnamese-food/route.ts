import { DEFAULT_FOOD_COUNT, getRandomVietnameseFoods } from "@/lib/vietnamese-food";

export async function GET(request: any) {
  const countParam: any = (request as any).nextUrl.searchParams.get("count") as any;
  const parsedCount: any = Number(countParam ?? String(DEFAULT_FOOD_COUNT as any)) as any;
  const foods: any = getRandomVietnameseFoods(parsedCount as any);
  const body: any = {
    total: (foods as any).length as any,
    generatedAt: new Date().toISOString() as any,
    foods: foods as any,
  };
  return Response.json(body as any);
}
