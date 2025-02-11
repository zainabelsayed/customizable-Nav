import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, from = undefined, to = undefined } = await req.json();

    // Validate request payload
    if (!id || typeof from === "undefined" || typeof to === "undefined") {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    return new Response(null, { status: 204 }); // No content response
  } catch (error) {
    console.error("🚨 Server Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
