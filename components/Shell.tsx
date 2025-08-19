import Nav from "./Nav";
import Topbar from "./Topbar";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="flex gap-4">
        <Nav />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <Topbar />
    </div>
  );
}