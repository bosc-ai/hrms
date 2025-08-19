import Stats from "@/components/Stats";
import Table from "@/components/Table";
import { demoEmployees, demoAttendance, demoLeaves, kpi } from "@/lib/data";

export default function Dashboard() {
  const K = kpi(demoEmployees, demoAttendance, demoLeaves);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <Stats items={[
        { label: "Active Employees", value: K.active },
        { label: "Today's Punches", value: K.punchesToday },
        { label: "Pending Leaves", value: K.pendingLeaves },
      ]}/>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <div className="font-semibold mb-2">Recent Attendance</div>
          <Table head={["Emp", "Date", "In", "Out", "Hours"]} rows={demoAttendance.map(a=>[a.empId, a.date, a.in||"-", a.out||"-", (a.hours||0).toFixed(2)])}/>
        </div>
        <div className="card">
          <div className="font-semibold mb-2">Pending Leaves</div>
          <Table head={["Emp", "Type", "From → To", "Days", "Status"]} rows={demoLeaves.map(l=>[l.empId, l.type, `${l.start} → ${l.end}`, l.days, l.status])}/>
        </div>
      </div>
    </div>
  );
}