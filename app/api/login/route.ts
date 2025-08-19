import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { user, pass } = await req.json();
  const U = process.env.AUTH_USER || "bosc";
  const P = process.env.AUTH_PASS || "inex2025";

  if (user === U && pass === P) {
    await createSession({ user, role: "SUPERADMIN" });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok:false, message: "Invalid credentials" }, { status: 401 });
}