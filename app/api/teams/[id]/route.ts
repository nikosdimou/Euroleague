import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const team = await prisma.team.findUnique({
    where: { id: Number(params.id) },
    include: { players: true },
  });
  return NextResponse.json(team);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const team = await prisma.team.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(team);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.team.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
