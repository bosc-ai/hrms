import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = (process.env.JWT_SECRET || "dev-secret");
const enc = new TextEncoder();

export type UserPayload = {
  user: string;
  role: "SUPERADMIN" | "HRADMIN" | "HR" | "MANAGER" | "EMPLOYEE";
};

export async function createSession(payload: UserPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(enc.encode(SECRET));

  (await cookies()).set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/"
  });
}

export async function destroySession() {
  (await cookies()).set("session", "", { expires: new Date(0), path: "/" });
}

export async function getSession(): Promise<UserPayload | null> {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, enc.encode(SECRET));
    return payload as any;
  } catch {
    return null;
  }
}