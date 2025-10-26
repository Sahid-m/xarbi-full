import type { NextFunction, Request, Response } from "express";
// import { VALID_MERCHANT_ID } from "..";
import { prisma } from "./db.js";
import { type ContractAddresses } from "./type.js";

// Contract deployed on Devnet
export const LoadedCA = {
  usdc: "0xf71E017904d653fb6640BA100973d65c9C54988D" as `0x${string}`,
  weth: "0xA8528aBB7546A780C8AAf8Db8F4A909ea3F3b84D" as `0x${string}`,
  quoteRegistry: "0x07E7767F524B0ae75328405D74cB598354eeD287" as `0x${string}`,
  mockAdapter: "0x819d378650F3aE6BB6cAC74f22E2140a87EDB7b5" as `0x${string}`,
  executor: "0x60515165D1663b2EE618CcDC553Eae7f04d9f5A4" as `0x${string}`,
  quoteServiceSigner:
    "0x86C478bdEAfa70c647A72c895e706b7D8757C72d" as `0x${string}`,
};

export const GAS_PRICE_MULTIPLIER = 1.2;
export const MAX_GAS_PRICE_GWEI = 100;
export const REQUIRED_PAYMENT_AMOUNT = BigInt("1000");
export const NETWORK = "arbitrum-sepolia";

export async function verifyMerchant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const merchantId = req.headers["merchant-id"];

  if (!merchantId) {
    return res.status(400).json({ error: "Missing merchant-id header" });
  }

  const merchantID = await prisma.project.findUnique({
    where: {
      merchant_id: merchantId as string,
    },
  });

  if (!merchantID) {
    return res.status(403).json({ error: "Invalid merchant ID" });
  }

  // ✅ Merchant is valid — continue to next middleware or route
  next();
}

export function build402Response(
  resource: string,
  error: string,
  addresses: ContractAddresses,
  merchantAddress: `0x${string}`
) {
  return {
    x402Version: 1,
    error,
    accepts: [
      {
        scheme: "exact",
        network: NETWORK,
        maxAmountRequired: REQUIRED_PAYMENT_AMOUNT.toString(),
        resource,
        description: `Payment required to access ${resource}`,
        mimeType: "application/json",
        payTo: merchantAddress,
        maxTimeoutSeconds: 300,
        asset: addresses.usdc,
        extra: { name: "TestUSDC", version: "1" },
      },
    ],
    facilitator: { url: "http://localhost:3002" },
  };
}

export async function getMerchantKeys(merchantID: string) {
  const Project = await prisma.project.findFirst({
    where: {
      merchant_id: merchantID,
    },
    include: {
      user: {
        select: {
          wallet: {
            select: {
              privateKey: true,
              publicKey: true,
            },
          },
        },
      },
    },
  });

  return {
    privateKey: Project?.user.wallet?.privateKey as `0x${string}`,
    publicKey: Project?.user.wallet?.publicKey as `0x${string}`,
  };
}
