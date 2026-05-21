import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: NextRequest, { params }: RouteContext) {
  const session = await getSession();
  if (!session.userEmail) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }

  const { id } = await params;

  const c = await prisma.case.findUnique({ where: { id } });
  if (!c) {
    return NextResponse.json({ error: "Case ikke funnet" }, { status: 404 });
  }

  if (c.ownerEmail !== session.userEmail && !session.isAdmin) {
    return NextResponse.json({ error: "Ikke tilgang" }, { status: 403 });
  }

  await prisma.case.update({
    where: { id },
    data: {
      usageApprovalStatus: "open",
      usageApprovalToken: crypto.randomUUID().replace(/-/g, ""),
    },
  });

  return NextResponse.json({ ok: true });
}
