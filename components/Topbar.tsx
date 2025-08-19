"use client";
import { motion } from "framer-motion";
import Brand from "./Brand";

export default function Topbar() {
  return (
    <header className="md:hidden p-4 sticky top-0 z-20">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass px-4 py-3 flex items-center justify-between"
      >
        <Brand />
        <form action="/api/logout" method="post">
          <button className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10">Logout</button>
        </form>
      </motion.div>
    </header>
  );
}