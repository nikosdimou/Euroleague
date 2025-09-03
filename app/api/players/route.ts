import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all players with team info
export async function GET() {
  const players = await prisma.player.findMany({
    include: { team: true },
  });
  return NextResponse.json(players);
}

// POST create new player
export async function POST(req: Request) {
  const body = await req.json();
  const player = await prisma.player.create({
    data: {
      name: body.name,
      position: body.position,
      number: body.number,
      image: body.image,
      teamId: body.teamId,
    },
  });
  return NextResponse.json(player);
}
