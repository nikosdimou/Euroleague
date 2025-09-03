import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">🏀 Basket Admin</h1>
        <nav className="space-y-3">
          <Link href="/dashboard" className="block hover:text-blue-400">Dashboard</Link>
          <Link href="/dashboard/teams" className="block hover:text-blue-400">Teams</Link>
          <Link href="/dashboard/players" className="block hover:text-blue-400">Players</Link>
          <Link href="/dashboard/logout" className="block hover:text-blue-400">Logout</Link>
          
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-white text-black">{children}</main>
    </div>
  );
}
