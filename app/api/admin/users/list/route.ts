import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session.userEmail || !session.isAdmin) {
    return NextResponse.json({ error: "Ikke tilgang" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: { email: true, name: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
}
