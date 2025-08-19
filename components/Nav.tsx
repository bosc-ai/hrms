"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import { motion } from "framer-motion";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/employees", label: "Employees" },
  { href: "/attendance", label: "Attendance" },
  { href: "/leave", label: "Leave" },
  { href: "/payroll", label: "Payroll" }
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 p-4 gap-2">
      <div className="glass py-4 px-5 flex items-center justify-between">
        <Brand />
        <form action="/api/logout" method="post">
          <button className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10">Logout</button>
        </form>
      </div>
      <nav className="mt-2 space-y-2">
        {links.map(l => {
          const active = pathname.startsWith(l.href);
          return (
            <motion.div key={l.href} whileHover={{ scale: 1.02 }}>
              <Link href={l.href} className={`glass block px-4 py-3 ${active ? "ring-2 ring-brand-500/60" : ""}`}>
                {l.label}
              </Link>
            </motion.div>
          );
        })}
    </nav>
    </aside>
  );
}