"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    });
    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      const data = await res.json().catch(()=>({message:"Login failed"}));
      setError(data.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md w-full glass p-8"
      >
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-white/60 text-sm mb-6">Sign in to HRMS X</p>
        {error && <div className="mb-3 text-sm text-rose-300">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="input" placeholder="User ID" value={user} onChange={e=>setUser(e.target.value)} />
          <input type="password" className="input" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} />
          <button className="btn w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        </form>
        <div className="text-xs text-white/50 mt-3">Demo creds: <b>bosc</b> / <b>inex2025</b></div>
      </motion.div>
    </div>
  );
}