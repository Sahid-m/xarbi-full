import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const projects = await prisma.project.findMany({
    where: { user: { clerkId: userId } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { name, description, pricePerHit, merchantId } = await req.json();
  if (!name || name.trim().length === 0) {
    return new Response("Project name required", { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return new Response("User not found", { status: 404 });

  const project = await prisma.project.create({
    data: {
      name,
      description: description,
      userId: user.id,
      projectId: randomUUID(),
      merchant_id: merchantId,
      pricePerHit: parseFloat(pricePerHit),
    },
  });

  return NextResponse.json(project);
}
