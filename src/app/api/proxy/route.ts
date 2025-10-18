import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");

  if (!fileUrl) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }

    const blob = await response.blob();

    return new Response(blob, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="qr_code.png"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
