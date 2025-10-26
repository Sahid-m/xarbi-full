import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ethers } from "ethers";
import { NextResponse } from "next/server";

// Temporary wallet generator (later, integrate real signing key management)
function createWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    publicKey: wallet.address,
    privateKey: wallet.privateKey,
  };
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  let wallet = await prisma.wallet.findUnique({ where: { clerkId: userId } });

  if (!wallet) {
    const generated = createWallet();
    wallet = await prisma.wallet.create({
      data: {
        clerkId: userId,
        user: {
          connect: { clerkId: userId },
        },
        publicKey: generated.publicKey,
        privateKey: generated.privateKey,
      },
    });
  }

  return NextResponse.json(wallet);
}
