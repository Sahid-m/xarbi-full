// lib/prisma.ts
import { PrismaClient } from "./generated/client.js";
// Create a single PrismaClient instance and reuse it between hot reloads in dev
export const prisma = global.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
    });
// Ensure we don’t create multiple instances during development hot reloads
if (process.env.NODE_ENV !== "production")
    global.prisma = prisma;
