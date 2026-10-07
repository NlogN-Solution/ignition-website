import { NextResponse } from "next/server";
import { getSearchSuggestions } from "@/lib/search/api";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  const result = await getSearchSuggestions(query, request.signal);
  return NextResponse.json(result ?? { items: [] }, { status: result ? 200 : 503 });
}
