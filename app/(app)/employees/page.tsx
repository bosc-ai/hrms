"use client";
import { demoEmployees, type Employee } from "@/lib/data";
import Table from "@/components/Table";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Employees() {
  const [list, setList] = useState<Employee[]>([]);
  const [form, setForm] = useState<Partial<Employee>>({ ctc: 600000, basicPct: 0.4, hraPct: 0.4, state:"MH", pfApplicable: true, esiEligible: true });

  useEffect(()=>{
    const saved = localStorage.getItem("employees");
    if (saved) setList(JSON.parse(saved));
    else setList(demoEmployees);
  }, []);

  useEffect(()=>{
    localStorage.setItem("employees", JSON.stringify(list));
  }, [list]);

  const add = () => {
    if (!form.firstName) return;
    setList(prev => [...prev, {
      id: `E${prev.length+1}`,
      firstName: form.firstName!,
      lastName: form.lastName,
      code: form.code,
      email: form.email,
      ctc: Number(form.ctc||0),
      basicPct: Number(form.basicPct||0.4),
      hraPct: Number(form.hraPct||0.4),
      esiEligible: !!form.esiEligible,
      pfApplicable: !!form.pfApplicable,
      state: form.state || "MH",
      status: "ACTIVE"
    }]);
    setForm({ ctc: 600000, basicPct: 0.4, hraPct: 0.4, state:"MH", pfApplicable: true, esiEligible: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Employees</h2>
        <motion.details whileHover={{scale:1.02}} className="glass px-4 py-2">
          <summary className="cursor-pointer">Add Employee</summary>
          <div className="grid md:grid-cols-3 gap-3 mt-3">
            <input className="input" placeholder="Code" value={form.code||""} onChange={e=>setForm(f=>({...f, code:e.target.value}))}/>
            <input className="input" placeholder="First Name" value={form.firstName||""} onChange={e=>setForm(f=>({...f, firstName:e.target.value}))}/>
            <input className="input" placeholder="Last Name" value={form.lastName||""} onChange={e=>setForm(f=>({...f, lastName:e.target.value}))}/>
            <input className="input" placeholder="Email" value={form.email||""} onChange={e=>setForm(f=>({...f, email:e.target.value}))}/>
            <input className="input" placeholder="CTC (₹/yr)" type="number" value={form.ctc||0} onChange={e=>setForm(f=>({...f, ctc:Number(e.target.value)}))}/>
            <input className="input" placeholder="Basic %" type="number" step="0.01" value={form.basicPct||0} onChange={e=>setForm(f=>({...f, basicPct:Number(e.target.value)}))}/>
            <input className="input" placeholder="HRA %" type="number" step="0.01" value={form.hraPct||0} onChange={e=>setForm(f=>({...f, hraPct:Number(e.target.value)}))}/>
            <select className="input" value={form.state||"MH"} onChange={e=>setForm(f=>({...f, state:e.target.value}))}>
              <option>MH</option><option>KA</option><option>DL</option>
            </select>
            <select className="input" value={String(form.pfApplicable)} onChange={e=>setForm(f=>({...f, pfApplicable: e.target.value==="true"}))}>
              <option value="true">PF Yes</option><option value="false">PF No</option>
            </select>
            <select className="input" value={String(form.esiEligible)} onChange={e=>setForm(f=>({...f, esiEligible: e.target.value==="true"}))}>
              <option value="true">ESI Yes</option><option value="false">ESI No</option>
            </select>
          </div>
          <div className="mt-3">
            <button className="btn" onClick={add}>Save</button>
            <span className="text-xs text-white/60 ml-3">Demo mode: stored in your browser only</span>
          </div>
        </motion.details>
      </div>

      <Table head={["Code","Name","Dept","Role","CTC (₹/yr)","PF","ESI"]}
        rows={list.map(e=>[e.code||"", `${e.firstName} ${e.lastName||""}`, e.department||"", e.designation||"", e.ctc.toLocaleString(), e.pfApplicable?"Yes":"No", e.esiEligible?"Yes":"No"])} />
    </div>
  );
}