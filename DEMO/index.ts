// index.ts
import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3007;

import { x402Middleware } from "arb-x402";

app.use(
  await x402Middleware({
    merchantId: "332616e7-58d6-4718-885f-246cb7184291",
  })
);

// Middleware to parse JSON
app.use(express.json());

// GET route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Bun + Express + TypeScript!" });
});

// POST route
app.post("/echo", (req: Request, res: Response) => {
  res.json({ youSent: req.body });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
