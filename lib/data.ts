export type Employee = {
  id: string;
  code?: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  doj?: string;
  department?: string;
  designation?: string;
  location?: string;
  ctc: number; // rupees per year
  basicPct?: number;
  hraPct?: number;
  esiEligible?: boolean;
  pfApplicable?: boolean;
  state?: string;
  status?: "ACTIVE" | "INACTIVE";
};

export type Attendance = {
  empId: string;
  date: string; // YYYY-MM-DD
  in?: string; // HH:mm
  out?: string;
  hours?: number;
};

export type Leave = {
  id: string;
  empId: string;
  type: "SICK" | "CASUAL" | "EARNED";
  start: string;
  end: string;
  days: number;
  reason?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export const demoEmployees: Employee[] = [
  { id: "E1", code:"EMP001", firstName:"Ravi", lastName:"Kumar", email:"ravi.k@example.com", ctc: 600000, basicPct: 0.4, hraPct:0.4, esiEligible:true, pfApplicable:true, state:"MH", status:"ACTIVE", department:"Engineering", designation:"SDE-1", location:"Mumbai", doj:"2024-04-01" },
  { id: "E2", code:"EMP002", firstName:"Asha", lastName:"Patel", email:"asha.p@example.com", ctc: 840000, basicPct: 0.4, hraPct:0.4, esiEligible:false, pfApplicable:true, state:"MH", status:"ACTIVE", department:"HR", designation:"HR Executive", location:"Pune", doj:"2023-11-15" },
  { id: "E3", code:"EMP003", firstName:"Kiran", lastName:"Singh", email:"kiran.s@example.com", ctc: 480000, basicPct: 0.4, hraPct:0.4, esiEligible:true, pfApplicable:true, state:"MH", status:"ACTIVE", department:"Ops", designation:"Ops Exec", location:"Mumbai", doj:"2025-01-10" }
];

export const demoAttendance: Attendance[] = [
  { empId:"E1", date:"2025-08-19", in:"09:30", out:"18:10", hours:8.67 },
  { empId:"E2", date:"2025-08-19", in:"09:45", out:"18:00", hours:8.25 }
];
export const demoLeaves: Leave[] = [
  { id:"L1", empId:"E3", type:"SICK", start:"2025-08-18", end:"2025-08-19", days:2, reason:"Fever", status:"PENDING" }
];

export function kpi(employees: Employee[], attendance: Attendance[], leaves: Leave[]) {
  const active = employees.filter(e=>e.status!=="INACTIVE").length;
  const today = new Date().toISOString().slice(0,10);
  const punchesToday = attendance.filter(a=>a.date===today).length;
  const pendingLeaves = leaves.filter(l=>l.status==="PENDING").length;
  return { active, punchesToday, pendingLeaves };
}

export function computePayroll(emp: Employee, month: number) {
  const basicPct = emp.basicPct ?? 0.4;
  const hraPct = emp.hraPct ?? 0.4;
  const monthlyCTC = Math.round(emp.ctc/12);
  const basic = Math.round(monthlyCTC * basicPct);
  const hra = Math.round(monthlyCTC * hraPct);
  let special = monthlyCTC - basic - hra;
  if (special < 0) special = 0;

  const pfEmp = emp.pfApplicable===false ? 0 : Math.round(basic*0.12);
  const esiEmp = (emp.esiEligible && monthlyCTC <= 21000) ? Math.round(monthlyCTC*0.0075) : 0;
  const pt = (emp.state || "MH") === "MH" && month === 2 ? 200 : 0;

  const deductions = pfEmp + esiEmp + pt;
  const net = monthlyCTC - deductions;

  return {
    gross: monthlyCTC,
    net,
    deductions,
    components: { basic, hra, special },
    deductionsBreakup: { pfEmp, esiEmp, pt, tds: 0 }
  };
}