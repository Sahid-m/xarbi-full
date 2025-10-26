// lib/prisma.ts
import { PrismaClient } from "./generated/client.js";

// Extend the NodeJS global type so TypeScript knows about our prisma instance.
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a single PrismaClient instance and reuse it between hot reloads in dev
export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// Ensure we don’t create multiple instances during development hot reloads
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
