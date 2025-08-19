"use client";
import { motion } from "framer-motion";

export default function Stats({ items }: { items: { label: string, value: string | number }[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.08 }}
          className="card"
        >
          <div className="text-sm text-white/70">{it.label}</div>
          <div className="text-3xl font-bold mt-1">{it.value}</div>
        </motion.div>
      ))}
    </div>
  );
}