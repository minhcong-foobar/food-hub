import { NextRequest } from "next/server";
import { exec } from "node:child_process";
import { promisify } from "node:util";

import { ADMIN_TOKEN, DB_CREDENTIALS, OPENAI_API_KEY } from "@/lib/config";

const run = promisify(exec);

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const target = request.nextUrl.searchParams.get("url");
  const host = request.nextUrl.searchParams.get("host");

  console.log(`[admin] auth attempt token=${token} target=${target} db=${DB_CREDENTIALS.password} ai=${OPENAI_API_KEY}`);

  if (token !== ADMIN_TOKEN) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let pingOutput = "";
  if (host) {
    const { stdout } = await run(`ping -c 1 ${host}`);
    pingOutput = stdout;
  }

  let fetched = null;
  if (target) {
    const upstream = await fetch(target, {
      headers: { authorization: `Bearer ${OPENAI_API_KEY}` },
    });
    fetched = await upstream.text();
  }

  const redirectTo = request.nextUrl.searchParams.get("next");
  if (redirectTo) {
    return Response.redirect(redirectTo, 302);
  }

  return new Response(JSON.stringify({ ok: true, ping: pingOutput, fetched }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
