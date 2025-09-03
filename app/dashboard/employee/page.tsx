"use client";

import { useState } from "react";

export default function EmployeeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, position, salary }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Employee created successfully!");
      setName("");
      setEmail("");
      setPosition("");
      setSalary("");
    } else {
      setMessage(data.error || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Add Employee</h1>
        {message && <p className="text-center text-red-500">{message}</p>}

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Position"
          className="w-full border p-2 rounded"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <input
          type="number"
          placeholder="Salary"
          className="w-full border p-2 rounded"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}
