// api/chat.ts — Vercel Edge Function proxy para Anthropic API
export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Vercel Edge Runtime expone las env vars en globalThis
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiKey = (globalThis as any).ANTHROPIC_API_KEY as string | undefined
    ?? (globalThis as any).process?.env?.ANTHROPIC_API_KEY as string | undefined;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY no configurada en Vercel" }),
      { status: 500, headers: { "Content-Type": "application/json", ...CORS } }
    );
  }

  try {
    const body = await req.json();

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();

    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: { "Content-Type": "application/json", ...CORS },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json", ...CORS } }
    );
  }
}