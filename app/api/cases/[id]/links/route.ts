import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { CaseLinkType } from "@/app/generated/prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: RouteContext) {
  const session = await getSession();
  if (!session.userEmail) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }

  const { id } = await params;

  const c = await prisma.case.findUnique({ where: { id } });
  if (!c) return NextResponse.json({ error: "Case ikke funnet" }, { status: 404 });

  if (c.ownerEmail !== session.userEmail && !session.isAdmin) {
    return NextResponse.json({ error: "Ikke tilgang" }, { status: 403 });
  }

  const body = await request.json();
  const { title, url, type, description } = body;

  if (!title?.trim() || !url?.trim()) {
    return NextResponse.json({ error: "Tittel og URL er påkrevd" }, { status: 400 });
  }

  const link = await prisma.caseLink.create({
    data: {
      caseId: id,
      title: title.trim(),
      url: url.trim(),
      type: type as CaseLinkType | null ?? null,
      description: description?.trim() || null,
      createdByEmail: session.userEmail,
    },
  });

  return NextResponse.json(link, { status: 201 });
}
