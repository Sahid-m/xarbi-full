import express, { type Request, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  build402Response,
  getMerchantKeys,
  LoadedCA,
  verifyMerchant,
} from "./config.js";
import { SettlementService } from "./settlement.js";
import { type EIP3009PaymentPayload } from "./type.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const GAS_PRICE_MULTIPLIER = 1.2;
export const MAX_GAS_PRICE_GWEI = 100;

const app = express();

import dotenv from "dotenv";
dotenv.config();

app.use(express.json());

// Home route - HTML
app.get("/", (req, res) => {
  res.type("html").send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Express on Vercel</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/api-data">API Data</a>
          <a href="/healthz">Health</a>
        </nav>
        <h1>Welcome to Express on Vercel 🚀</h1>
        <p>This is a minimal example without a database or forms.</p>
        <img src="/logo.png" alt="Logo" width="120" />
      </body>
    </html>
  `);
});

app.get("/ca", (req: Request, res: Response) => {
  // send loaded contract address of USDT and wETH

  res.send(JSON.stringify(LoadedCA));
});

app.get("/merchantKey", verifyMerchant, async (req: Request, res: Response) => {
  const merchantId = req.headers["merchant-id"];

  const Keys = await getMerchantKeys(merchantId as string);

  res.json({
    privateKey: Keys.privateKey,
    publicKey: Keys.publicKey,
  });
});

app.post("/settlement", verifyMerchant, async (req: Request, res: Response) => {
  try {
    const merchantId = req.headers["merchant-id"];

    const paymentPayload = req.body as EIP3009PaymentPayload;

    const { privateKey, publicKey } = await getMerchantKeys(
      merchantId as string
    );

    const settlementService = new SettlementService(privateKey);

    const settlementResult = await settlementService.settlePayment(
      LoadedCA.usdc,
      paymentPayload
    );

    if (!settlementResult.success) {
      return res
        .status(402)
        .json(
          build402Response(
            req.url,
            `Settlement failed: ${settlementResult.error}`,
            LoadedCA,
            publicKey
          )
        );
    }

    // ✅ If successful
    return res.status(200).json({
      message: "Settlement successful",
      result: {
        sucess: settlementResult.success,
        transactionHash: settlementResult.transactionHash,
      },
    });
  } catch (error) {
    console.error("❌ Settlement error:", error);
    return res.status(500).json({
      error: "Internal server error during settlement",
      details: (error as Error).message,
    });
  }
});

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
