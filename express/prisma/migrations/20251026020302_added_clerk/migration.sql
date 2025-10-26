/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_clerkId_key" ON "Wallet"("clerkId");
