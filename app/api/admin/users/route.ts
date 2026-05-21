import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session.userEmail || !session.isAdmin) {
    return NextResponse.json({ error: "Ikke tilgang" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: { email: true, name: true, isAdmin: true, createdAt: true, lastLoginAt: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session.userEmail || !session.isAdmin) {
    return NextResponse.json({ error: "Ikke tilgang" }, { status: 403 });
  }

  const { email, isAdmin } = await request.json();
  if (!email || typeof isAdmin !== "boolean") {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  if (email === session.userEmail) {
    return NextResponse.json({ error: "Du kan ikke endre din egen admin-tilgang" }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { email },
    data: { isAdmin },
    select: { email: true, name: true, isAdmin: true },
  });

  return NextResponse.json(updated);
}
