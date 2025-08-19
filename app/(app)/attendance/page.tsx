"use client";
import { useEffect, useState } from "react";
import { demoEmployees, demoAttendance, type Attendance } from "@/lib/data";
import Table from "@/components/Table";

export default function Attendance() {
  const [rows, setRows] = useState<Attendance[]>([]);
  const [emp, setEmp] = useState(demoEmployees[0]?.id || "E1");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [time, setTime] = useState<string>("09:30");
  const [action, setAction] = useState<"in"|"out">("in");

  useEffect(()=>{
    const saved = localStorage.getItem("attendance");
    if (saved) setRows(JSON.parse(saved));
    else setRows(demoAttendance);
  }, []);

  useEffect(()=>{
    localStorage.setItem("attendance", JSON.stringify(rows));
  }, [rows]);

  const punch = () => {
    const idx = rows.findIndex(r=>r.empId===emp && r.date===date);
    if (idx===-1) {
      setRows(prev=>[...prev, { empId: emp, date, in: action==="in"?time:undefined, out: action==="out"?time:undefined, hours: 0 }]);
    } else {
      const r = {...rows[idx]};
      if (action==="in") r.in = time;
      else { r.out = time; if (r.in && r.out) {
        const h1 = Number(r.in.split(":")[0])*60 + Number(r.in.split(":")[1]);
        const h2 = Number(time.split(":")[0])*60 + Number(time.split(":")[1]);
        r.hours = Math.max(0, (h2-h1)/60);
      }}
      const clone = [...rows]; clone[idx]=r; setRows(clone);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Attendance</h2>
      <div className="card">
        <div className="grid md:grid-cols-5 gap-3">
          <select className="input" value={emp} onChange={e=>setEmp(e.target.value)}>
            {demoEmployees.map(e=>(<option key={e.id} value={e.id}>{e.code} - {e.firstName}</option>))}
          </select>
          <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
          <input className="input" type="time" value={time} onChange={e=>setTime(e.target.value)} />
          <select className="input" value={action} onChange={e=>setAction(e.target.value as any)}>
            <option value="in">Punch In</option>
            <option value="out">Punch Out</option>
          </select>
          <button className="btn" onClick={punch}>Save</button>
        </div>
      </div>
      <Table head={["Emp","Date","In","Out","Hours"]}
        rows={rows.map(r=>[r.empId, r.date, r.in||"-", r.out||"-", (r.hours||0).toFixed(2)])} />
      <div className="text-xs text-white/60">Demo mode: attendance saved to your browser only.</div>
    </div>
  );
}