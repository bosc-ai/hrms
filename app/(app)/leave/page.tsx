"use client";
import { useEffect, useState } from "react";
import { demoEmployees, demoLeaves, type Leave } from "@/lib/data";
import Table from "@/components/Table";

export default function LeavePage() {
  const [list, setList] = useState<Leave[]>([]);
  const [form, setForm] = useState<Partial<Leave>>({ empId: demoEmployees[0]?.id, type: "SICK", start: new Date().toISOString().slice(0,10), end: new Date().toISOString().slice(0,10), days: 1, status:"PENDING" });

  useEffect(()=>{
    const saved = localStorage.getItem("leaves");
    if (saved) setList(JSON.parse(saved));
    else setList(demoLeaves);
  }, []);

  useEffect(()=>{
    localStorage.setItem("leaves", JSON.stringify(list));
  }, [list]);

  const apply = () => {
    if (!form.empId || !form.type || !form.start || !form.end) return;
    const start = new Date(form.start as string);
    const end = new Date(form.end as string);
    const days = Math.floor((end.getTime()-start.getTime())/(24*3600*1000))+1;
    setList(prev => [...prev, { id: `L${prev.length+1}`, empId: form.empId as string, type: form.type as any, start: form.start as string, end: form.end as string, days, reason: form.reason||"", status:"PENDING" }]);
  };

  const setStatus = (id: string, status: "APPROVED"|"REJECTED") => {
    setList(prev => prev.map(l => l.id===id ? { ...l, status } : l));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Leave</h2>
      <div className="card">
        <div className="grid md:grid-cols-6 gap-3">
          <select className="input" value={form.empId} onChange={e=>setForm(f=>({...f, empId:e.target.value}))}>
            {demoEmployees.map(e=>(<option key={e.id} value={e.id}>{e.code} - {e.firstName}</option>))}
          </select>
          <select className="input" value={form.type} onChange={e=>setForm(f=>({...f, type:e.target.value as any}))}>
            <option value="SICK">Sick</option>
            <option value="CASUAL">Casual</option>
            <option value="EARNED">Earned</option>
          </select>
          <input className="input" type="date" value={form.start as string} onChange={e=>setForm(f=>({...f, start:e.target.value}))}/>
          <input className="input" type="date" value={form.end as string} onChange={e=>setForm(f=>({...f, end:e.target.value}))}/>
          <input className="input" placeholder="Reason" value={form.reason||""} onChange={e=>setForm(f=>({...f, reason:e.target.value}))}/>
          <button className="btn" onClick={apply}>Apply</button>
        </div>
      </div>
      <Table head={["Emp","Type","From → To","Days","Status","Actions"]}
        rows={list.map(l=>[l.empId, l.type, `${l.start} → ${l.end}`, l.days, l.status,
          l.status==="PENDING" ? (
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1 rounded-lg bg-emerald-500/80" onClick={()=>setStatus(l.id,"APPROVED")}>Approve</button>
              <button className="text-xs px-3 py-1 rounded-lg bg-rose-500/80" onClick={()=>setStatus(l.id,"REJECTED")}>Reject</button>
            </div>
          ) : "-" ])} />
      <div className="text-xs text-white/60">Demo mode: leave data saved to your browser only.</div>
    </div>
  );
}