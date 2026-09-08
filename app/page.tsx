"use client";
import { useState, useRef } from "react";

export default function Page() {
  const [msgs, setMsgs] = useState<any[]>([
    { role: "assistant", text: "Hi! Main MyLayra V2 hu. India ki apni AI. /image likh ke HD photo banao ya + dabake gallery se photo upload karo." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function send(t = input) {
    if (!t.trim()) return;
    setMsgs(m => [...m, { role: "user", text: t }]);
    setInput(""); setLoading(true);
    const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ message: t }) });
    const data = await res.json();
    setMsgs(m => [...m, data]); setLoading(false);
  }

  return (
    <div style={{ height: "100vh", background: "black", color: "white", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 16, display: "flex", justifyContent: "space-between", borderBottom: "1px solid #222" }}>
        <b style={{ fontSize: 20 }}>MyLayra</b>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => alert("Login: NextAuth se Google Login jaldi aayega")} style={{ background: "#2563eb", padding: "8px 18px", borderRadius: 20 }}>Log in</button>
          <button style={{ background: "#27272a", padding: "8px 18px", borderRadius: 20 }}>Sign up</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user"? "flex-end" : "flex-start", background: m.role === "user"? "#27272a" : "#18181b", padding: 12, borderRadius: 16, maxWidth: "85%" }}>
            {m.type === "image"? (
              <>
                <img src={m.url} style={{ borderRadius: 12, width: "100%" }} />
                <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 6 }}>{m.prompt}</p>
                <a href={m.url} target="_blank" style={{ color: "#60a5fa", fontSize: 13 }}>Download HD</a>
              </>
            ) : <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>}
          </div>
        ))}
        {loading && <div style={{ color: "#71717a" }}>MyLayra soch rahi hai...</div>}
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 28, padding: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <input type="file" ref={fileRef} hidden accept="image/*" onChange={e => {
            const f = e.target.files?.[0];
            if (f) send(`Maine ye image upload ki hai: ${f.name}. Iska analysis karo.`);
          }} />
          <button onClick={() => fileRef.current?.click()} style={{ background: "#27272a", width: 40, height: 40, borderRadius: "50%" }}>+</button>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask MyLayra... /image cat in space" style={{ flex: 1, background: "transparent", outline: "none" }} />
          <button onClick={() => send()} style={{ background: "white", color: "black", width: 40, height: 40, borderRadius: "50%" }}>↑</button>
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: "#52525b", marginTop: 8 }}>🖼️ Full HD Pic • 📹 HD Video • 💻 Code</div>
      </div>
    </div>
  );
}
