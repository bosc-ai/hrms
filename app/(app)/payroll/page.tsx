"use client";
import { useState } from "react";
import { demoEmployees, computePayroll } from "@/lib/data";
import Table from "@/components/Table";

export default function Payroll() {
  const [month, setMonth] = useState<number>(new Date().getMonth()+1);
  const rows = demoEmployees.map(e=>{
    const slip = computePayroll(e, month);
    return [e.code || "", `${e.firstName} ${e.lastName||""}`, slip.gross.toLocaleString(), slip.deductions.toLocaleString(), slip.net.toLocaleString(), slip.deductionsBreakup.pfEmp, slip.deductionsBreakup.esiEmp, slip.deductionsBreakup.pt];
  });
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payroll</h2>
      <div className="card grid md:grid-cols-4 gap-3 items-end">
        <div>
          <div className="text-sm text-white/60 mb-1">Month</div>
          <input className="input" type="number" min={1} max={12} value={month} onChange={e=>setMonth(Number(e.target.value))}/>
        </div>
        <div className="text-white/60 text-sm md:col-span-3">Demo calculation: PF/ESI/PT basics. Extend for TDS, LOP, gratuity, etc.</div>
      </div>
      <Table head={["Code","Employee","Gross (₹)","Deductions (₹)","Net (₹)","PF","ESI","PT"]} rows={rows as any}/>
    </div>
  );
}