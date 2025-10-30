// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const fileUrl = searchParams.get("url");

//   if (!fileUrl) {
//     return NextResponse.json({ error: "URL is required" }, { status: 400 });
//   }

//   try {
//     const response = await fetch(fileUrl);
//     if (!response.ok) {
//       throw new Error("Failed to fetch file");
//     }

//     const blob = await response.blob();

//     return new Response(blob, {
//       headers: {
//         "Content-Type": "image/png",
//         "Content-Disposition": 'attachment; filename="qr_code.png"',
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Proxy error" }, { status: 500 });
//   }
// }

// app/api/proxy/file/route.ts
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
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const filename = fileUrl.split("/").pop() || "file";

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 });
  }
}