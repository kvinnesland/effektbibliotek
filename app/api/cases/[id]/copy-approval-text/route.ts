import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildApprovalText } from "@/lib/usage-approval";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: RouteContext) {
  const session = await getSession();
  if (!session.userEmail) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }

  const { id } = await params;

  const c = await prisma.case.findUnique({
    where: { id },
    include: { owner: { select: { name: true, email: true } } },
  });

  if (!c) {
    return NextResponse.json({ error: "Case ikke funnet" }, { status: 404 });
  }

  if (!c.usageApprovalToken) {
    return NextResponse.json({ error: "Mangler godkjenningstoken" }, { status: 500 });
  }

  if (c.usageApprovalStatus === "not_requested") {
    await prisma.case.update({
      where: { id },
      data: { usageApprovalStatus: "open" },
    });
  }

  const appUrl = new URL(request.url).origin;

  const text = buildApprovalText({
    ownerName: c.owner.name,
    ownerEmail: c.owner.email,
    caseTitle: c.title,
    caseId: c.id,
    token: c.usageApprovalToken,
    appUrl,
  });

  return NextResponse.json({ text });
}
