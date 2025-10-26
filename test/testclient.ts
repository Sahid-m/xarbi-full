import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";
// import { wrapFetchWithPayment } from "x402-fetch";
import { ARBITRUM_SEPOLIA_CHAIN_ID } from "../arb-x402/src/x402";
import {
  createX402PaymentPayload,
  encodePaymentHeader,
  generateNonce,
} from "../arb-x402/src/x402-eip3009";
import type {
  PaymentSwapQuoteAttestation,
  X402PaymentRequirement,
} from "../arb-x402/src/x402-types";

export class X402QuoteClient {
  //   private fetchWithPayment: typeof fetch;
  private account: ReturnType<typeof privateKeyToAccount>;
  private privateKey: `0x${string}`;

  constructor() {
    // Create wallet account for payments
    this.privateKey =
      "0xb5a938d0f474ec85540c2f8fc1011bdae5f5b76f5e89f511eb930df7b946b446";
    this.account = privateKeyToAccount(this.privateKey);

    // Wrap fetch with x402 payment capabilities
    // this.fetchWithPayment = wrapFetchWithPayment(fetch, this.account);
  }

  /**
   * Get a quote from the x402-compliant quote service
   * This will automatically handle the 402 Payment Required response and make the payment
   */
  async getResponse(intent: any): Promise<PaymentSwapQuoteAttestation> {
    try {
      console.log("Requesting response from x402 service...");

      // First, try without payment to get the 402 response
      const response = await fetch("http://localhost:3000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(intent),
      });

      if (response.status === 402) {
        const paymentRequired = (await response.json()) as {
          x402Version: number;
          accepts: X402PaymentRequirement[];
          error?: string;
        };

        console.log("Payment required for quote generation");

        if (!paymentRequired.accepts || paymentRequired.accepts.length === 0) {
          throw new Error("No payment requirements provided");
        }

        const requirement = paymentRequired.accepts[0];

        if (!requirement) {
          console.log("INVALID PAYMENT REQUEST FROM SERVER");
          //   return;
        }
        console.log(
          `Amount: ${requirement.maxAmountRequired} (${
            parseFloat(requirement.maxAmountRequired) / 1_000_000
          } USDC)`
        );
        console.log(`Recipient: ${requirement.payTo}`);

        // Create EIP-3009 payment authorization
        console.log("Creating EIP-3009 payment authorization...");

        const now = Math.floor(Date.now() / 1000);
        const authorization = {
          from: this.account.address,
          to: requirement.payTo as `0x${string}`,
          value: requirement.maxAmountRequired,
          validAfter: now - 60, // Valid from 1 minute ago
          validBefore: now + requirement.maxTimeoutSeconds,
          nonce: generateNonce(),
        };

        // Sign the authorization
        const paymentPayload = await createX402PaymentPayload(
          authorization,
          requirement.asset as `0x${string}`,
          requirement.extra?.name || "TestUSDC",
          requirement.extra?.version || "1",
          ARBITRUM_SEPOLIA_CHAIN_ID,
          ENV.PRIVATE_KEY
        );

        // Encode as base64 for X-PAYMENT header
        const paymentHeader = encodePaymentHeader(paymentPayload);
        console.log("Payment authorization created and signed");

        // Make the request again with the real payment header
        const paidResponse = await fetch("http://localhost:3001/quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Payment": paymentHeader,
          },
          body: JSON.stringify(intent),
        });

        if (!paidResponse.ok) {
          const errorData = (await paidResponse.json()) as { error?: string };
          throw new Error(
            `Quote request failed: ${
              errorData.error || paidResponse.statusText
            }`
          );
        }

        const attestation =
          (await paidResponse.json()) as PaymentSwapQuoteAttestation;
        console.log("Quote received successfully with verified payment");
        return attestation;
      } else if (response.ok) {
        // Quote was successful without payment
        const attestation =
          (await response.json()) as PaymentSwapQuoteAttestation;
        console.log("Quote received successfully and no payment required");
        return attestation;
      } else {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(
          `Quote request failed: ${errorData.error || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Failed to get quote:", error);
      throw error;
    }
  }

  /**
   * Test the payment flow by making a request that will trigger a 402 response
   */
  async testPaymentFlow(): Promise<void> {
    console.log("Testing x402 payment flow with EIP-3009 signatures...");

    try {
      console.log("before");
      // Make a request without payment first to see the 402 response
      const response = await fetch("http://localhost:3007/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 402) {
        const paymentRequired = (await response.json()) as {
          x402Version: number;
          accepts: X402PaymentRequirement[];
        };
        console.log("Received 402 Payment Required");
        console.log(
          "Payment Requirements:",
          JSON.stringify(paymentRequired, null, 2)
        );

        if (!paymentRequired.accepts || paymentRequired.accepts.length === 0) {
          throw new Error("No payment requirements provided");
        }

        const requirement = paymentRequired.accepts[0];

        if (!requirement) {
          console.log("INVALID PAYMENT REQQUIREMENT");
          return;
        }
        console.log("\nCreating EIP-3009 payment authorization...");

        const now = Math.floor(Date.now() / 1000);
        const authorization = {
          from: this.account.address,
          to: requirement.payTo as `0x${string}`,
          value: requirement.maxAmountRequired,
          validAfter: now - 60,
          validBefore: now + requirement.maxTimeoutSeconds,
          nonce: generateNonce(),
        };

        // Sign the authorization
        const paymentPayload = await createX402PaymentPayload(
          authorization,
          requirement.asset as `0x${string}`,
          requirement.extra?.name || "TestUSDC",
          requirement.extra?.version || "1",
          ARBITRUM_SEPOLIA_CHAIN_ID,
          this.privateKey
        );

        const paymentHeader = encodePaymentHeader(paymentPayload);
        console.log("Payment authorization signed successfully");
        console.log(
          "Payload structure:",
          JSON.stringify(paymentPayload, null, 2)
        );

        // Make the request again with the real payment header
        const paidResponse = await fetch("http://localhost:3000/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Payment": paymentHeader,
          },
        });

        if (paidResponse.ok) {
          console.log("\nPayment flow successful with EIP-3009 signature");
        } else {
          console.error("\nPayment flow failed");
          const errorText = await paidResponse.text();
          console.error("Error details:", errorText);
        }
      }
    } catch (error) {
      console.error("Test failed:", error);
    }
  }

  getAccount() {
    return this.account;
  }
}
