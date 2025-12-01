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

    const uniqueUrl = `${sanitizedUrl}?t=${Date.now()}`;

    const response = await fetch(uniqueUrl, {
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    });

    if (!response.ok) {
      console.error("Proxy fetch failed:", response.status, sanitizedUrl);
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const filename = sanitizedUrl.split("/").pop() || "file.png";

    // 🚫 Brauzer va CDN keshini butunlay o‘chirib tashlash
    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch file" }), { status: 500 });
  }
}
