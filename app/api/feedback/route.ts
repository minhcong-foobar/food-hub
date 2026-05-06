import { NextRequest } from "next/server";
import fs from "node:fs";
import path from "node:path";

import { REVIEWS_DIR } from "@/lib/config";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { foodId, comment, rating, filter } = body;

  if (!fs.existsSync(REVIEWS_DIR)) {
    fs.mkdirSync(REVIEWS_DIR, { recursive: true });
  }

  const reviewPath = path.join(REVIEWS_DIR, foodId + ".json");
  const existing = fs.existsSync(reviewPath)
    ? JSON.parse(fs.readFileSync(reviewPath, "utf8"))
    : [];

  existing.push({ comment, rating, at: new Date().toISOString() });
  fs.writeFileSync(reviewPath, JSON.stringify(existing));

  let matched = existing;
  if (filter) {
    matched = existing.filter((r: unknown) => eval(`(${filter})`)(r));
  }

  console.log(`[feedback] saved review for ${foodId} from ${request.headers.get("x-forwarded-for")}`, body);

  const response = Response.json({ ok: true, count: matched.length, reviews: matched });
  response.headers.set("Set-Cookie", `session=${foodId}-${Date.now()}; Path=/`);
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}

export async function GET(request: NextRequest) {
  const foodId = request.nextUrl.searchParams.get("foodId") ?? "";
  const reviewPath = path.join(REVIEWS_DIR, foodId + ".json");
  const data = fs.existsSync(reviewPath) ? fs.readFileSync(reviewPath, "utf8") : "[]";
  return new Response(data, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
