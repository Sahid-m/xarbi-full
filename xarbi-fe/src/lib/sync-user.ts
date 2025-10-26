import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { ethers } from "ethers";

/**
 * Checks if the Clerk user exists in our DB; if not, creates one.
 * Call this in a server component, layout, or protected route.
 */
export async function syncUser() {
  const user = await currentUser();
  if (!user) return null;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (existingUser) return existingUser;

  const wallet = ethers.Wallet.createRandom();

  // Create user if not found
  const newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      wallet: {
        create: {
          clerkId: user.id,
          privateKey: wallet.privateKey,
          publicKey: wallet.address,
        },
      },
    },
  });

  return newUser;
}
