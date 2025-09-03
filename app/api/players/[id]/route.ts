import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const player = await prisma.player.findUnique({
    where: { id: Number(params.id) },
    include: { team: true },
  });
  return NextResponse.json(player);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const player = await prisma.player.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(player);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.player.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ success: true });
}
