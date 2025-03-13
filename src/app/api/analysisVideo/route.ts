import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const length = searchParams.get("videoLength");

  return NextResponse.json({
    length
  });

}