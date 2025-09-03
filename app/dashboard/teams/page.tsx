"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTeamPage() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    image: "",
  });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/dashboard"); // redirect back to dashboard
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">➕ Add New Team</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4 bg-white shadow p-6 rounded-xl">
        <input
          type="text"
          placeholder="Team Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          className="w-full border p-2 rounded"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2  rounded-full"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Team
        </button>
      </form>
    </div>
  );
}
