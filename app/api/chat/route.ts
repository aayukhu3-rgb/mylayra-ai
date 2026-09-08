import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();
  const clean = message.replace("/image", "").trim() || "cute cat in space ultra HD";
  
  // HD Image Generation - 100% Working
  if (message.toLowerCase().includes("/image") || message.toLowerCase().includes("pic")) {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(clean)}?width=1280&height=1280&model=flux&nologo=true&seed=${Date.now()}`;
    return NextResponse.json({ role: "assistant", type: "image", url, prompt: clean });
  }

  return NextResponse.json({ 
    role: "assistant", 
    type: "text", 
    text: `MyLayra V2 ON hai! 🔥\n\nTumne bola: "${message}"\n\nImage ke liye likho: /image cute cat` 
  });
}
