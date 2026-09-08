import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { message } = await req.json();
  const clean = message.replace("/image","").trim();
  if (message.toLowerCase().includes("/image") || message.toLowerCase().includes("cat pic")) {
    const prompt = clean || "cute cat in space, ultra HD";
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1280&height=1280&model=flux&nologo=true&seed=${Date.now()}`;
    return NextResponse.json({ role: "assistant", type: "image", url, prompt });
  }
  // Yaha Groq API lagegi - abhi ke liye real HD image wala part 100% working hai
  // Groq key lagane ke baad yahi se chat bhi real ho jayega
  return NextResponse.json({ role: "assistant", type: "text", text: `MyLayra V2 Advanced Mode ON hai!\n\nTumne bola: "${message}"\n\nAb image ke liye likho: /image ${clean}\n\nChat ke liye GROQ_API_KEY Vercel me add karo, fir main ChatGPT jaisa jawab dunga. HD Image abhi se 100% working hai.` });
}
