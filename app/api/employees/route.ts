import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, position, salary } = await req.json();

  try {
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        position,
        salary: parseFloat(salary),
      },
    });

    return NextResponse.json(employee);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
