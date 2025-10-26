import { X402QuoteClient } from "./testclient";

async function main() {
  const x402Client = new X402QuoteClient();
  await x402Client.testPaymentFlow();
}

await main();
