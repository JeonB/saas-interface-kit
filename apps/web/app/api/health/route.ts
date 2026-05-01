import { NextResponse } from "next/server";

const BODY = { status: "ok" as const };

export function GET() {
  return NextResponse.json(BODY, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
