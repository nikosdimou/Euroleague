"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Team = {
  id: number;
  name: string;
};

export default function NewPlayerPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [form, setForm] = useState({
    name: "",
    position: "",
    number: "",
    image: "",
    teamId: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then(setTeams);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        number: form.number ? Number(form.number) : null,
        teamId: form.teamId ? Number(form.teamId) : null,
      }),
    });
    router.push("/dashboard"); // redirect back to dashboard
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">➕ Add New Player</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4 bg-white shadow p-6 rounded-xl">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Position (e.g. Forward)"
          className="w-full border p-2 rounded"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />
        <input
          type="number"
          placeholder="Jersey Number"
          className="w-full border p-2 rounded"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          value={form.teamId}
          onChange={(e) => setForm({ ...form, teamId: e.target.value })}
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save Player
        </button>
      </form>
    </div>
  );
}
