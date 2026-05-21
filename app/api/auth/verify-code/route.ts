import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyOtp, getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = (body.email ?? "").toLowerCase().trim();
  const code = (body.code ?? "").trim();

  if (!email || !code) {
    return NextResponse.json({ error: "Mangler e-post eller kode." }, { status: 400 });
  }

  const record = await prisma.otpCode.findFirst({
    where: {
      email,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return NextResponse.json(
      { error: "Koden er feil eller har utløpt. Prøv igjen eller be om ny kode." },
      { status: 401 }
    );
  }

  const valid = await verifyOtp(code, record.codeHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Koden er feil eller har utløpt. Prøv igjen eller be om ny kode." },
      { status: 401 }
    );
  }

  await prisma.otpCode.update({
    where: { id: record.id },
    data: { usedAt: new Date() },
  });

  const user = await prisma.user.update({
    where: { email },
    data: { lastLoginAt: new Date() },
  });

  const session = await getSession();
  session.userEmail = user.email;
  session.userName = user.name;
  session.isAdmin = user.isAdmin;
  await session.save();

  return NextResponse.json({ ok: true });
}
