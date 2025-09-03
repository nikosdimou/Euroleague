"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface HeaderProps {
  adminName: string;
}

export default function Header({ adminName }: HeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-lg font-semibold">Hi {adminName}</h1>

      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
