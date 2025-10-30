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
//       throw new Error(`Failed to fetch: ${response.status}`);
//     }

//     const arrayBuffer = await response.arrayBuffer();
//     const contentType = response.headers.get("content-type") || "application/octet-stream";
//     const filename = fileUrl.split("/").pop() || "file";

//     return new Response(arrayBuffer, {
//       headers: {
//         "Content-Type": contentType,
//         "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
//         "Cache-Control": "public, max-age=31536000, immutable",
//       },
//     });
//   } catch (error) {
//     console.error("Proxy error:", error);
//     return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 });
//   }
// }
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");

  if (!fileUrl) {
    return new Response(JSON.stringify({ error: "URL is required" }), { status: 400 });
  }

  try {
    const sanitizedUrl = decodeURIComponent(fileUrl);
    if (!/^https?:\/\//.test(sanitizedUrl)) {
      return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400 });
    }

    const response = await fetch(sanitizedUrl, {
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
      },
    });

    if (!response.ok) {
      console.error("Proxy fetch failed:", response.status, sanitizedUrl);
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const filename = sanitizedUrl.split("/").pop() || "file.png";

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch file" }), { status: 500 });
  }
}
