"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login"); // redirect to login
    router.refresh();
  }

  return (
    <nav className=" p-4 flex justify-end shadow-md">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-medium"
      >
        Logout
      </button>
    </nav>
  );
}
