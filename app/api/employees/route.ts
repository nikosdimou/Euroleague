import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, position, salary } = await req.json();
    console.log("Received data:", { name, email, position, salary });

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Convert salary safely
    let parsedSalary: number | null = null;
    if (salary !== undefined && salary !== "") {
      parsedSalary = parseFloat(salary);
      if (isNaN(parsedSalary)) parsedSalary = null;
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        position: position || null,
        salary: parsedSalary,
      },
    });

    return NextResponse.json(employee);
  } catch (error: any) {
    console.error("Error creating employee:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}
