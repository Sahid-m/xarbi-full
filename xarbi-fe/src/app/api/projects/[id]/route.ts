import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { name, description, pricePerHit } = body;

  const project = await prisma.project.update({
    where: { id: params.id },
    data: { name, description, pricePerHit: parseFloat(pricePerHit) },
  });

  return NextResponse.json(project);
}
