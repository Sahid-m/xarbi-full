// lib/sendTransaction.ts
import { ethers } from "ethers";

const RPC_URL =
  process.env.ARB_SEPOLIA_RPC ??
  "https://arb-sepolia.g.alchemy.com/v2/1-dRxwkuqxEuhOE5lvNiK";

// Minimal ERC-20 ABI
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address to, uint256 amount) returns (bool)",
];

export type SendResult =
  | {
      success: true;
      txHash: string;
      receipt: any;
      gasUsed: string; // in units
      feePaidEth: string; // human readable ETH value paid for gas
    }
  | {
      success: false;
      error: string;
    };

/**
 * Send tokens (ERC-20) or native ETH from a private key to a recipient.
 * IMPORTANT: Run on server only. Never expose the privateKey in client code.
 */
export async function sendFromPrivateKey({
  privateKey,
  recipient,
  tokenAddress,
  amount,
}: {
  privateKey: string;
  recipient: string;
  tokenAddress?: string | null;
  amount: string;
}): Promise<SendResult> {
  try {
    if (!privateKey) return { success: false, error: "Missing privateKey" };
    if (!recipient) return { success: false, error: "Missing recipient" };
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
      return { success: false, error: "Invalid amount" };

    // Provider & wallet
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    let wallet: ethers.Wallet;
    try {
      wallet = new ethers.Wallet(privateKey, provider);
    } catch {
      return { success: false, error: "Invalid private key" };
    }

    // Validate addresses
    if (!ethers.isAddress(recipient))
      return { success: false, error: "Invalid recipient address" };
    if (tokenAddress && !ethers.isAddress(tokenAddress))
      return { success: false, error: "Invalid token address" };

    // Fetch current gas data
    const feeData = await provider.getFeeData();
    const maxFeePerGas = feeData.maxFeePerGas ?? feeData.gasPrice;
    const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? undefined;

    // TOKEN TRANSFER BRANCH (ERC-20)
    if (tokenAddress) {
      // inside sendFromPrivateKey(...) where tokenAddress is truthy
      // assumes provider, wallet, feeData, maxFeePerGas, maxPriorityFeePerGas are already defined

      // Minimal ERC-20 ABI (ensure "transfer" exists here)
      const ERC20_ABI = [
        "function balanceOf(address) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
        "function transfer(address to, uint256 amount) returns (bool)",
      ];

      // create contract instance for readonly calls
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

      // get decimals & symbol
      const decimals = await contract.decimals().catch(() => 18);
      const symbol = await contract.symbol().catch(() => "TOKEN");

      const senderAddress = await wallet.getAddress();
      const rawBalance: bigint = await contract.balanceOf(senderAddress);
      const amountUnits = ethers.parseUnits(amount, decimals);

      if (amountUnits > rawBalance) {
        return {
          success: false,
          error: `Insufficient ${symbol} balance (have ${ethers.formatUnits(
            rawBalance,
            decimals
          )})`,
        };
      }

      // Build calldata manually via Interface
      const iface = new ethers.Interface(ERC20_ABI);
      const data = iface.encodeFunctionData("transfer", [
        recipient,
        amountUnits,
      ]);

      // Estimate gas at provider level (include `from`)
      let gasEstimate: bigint;
      try {
        gasEstimate = await provider.estimateGas({
          to: tokenAddress,
          data,
          from: senderAddress,
        });
      } catch (err) {
        // fallback to a conservative gas estimate if provider estimation fails
        console.warn("estimateGas failed, falling back to default:", err);
        gasEstimate = BigInt(120_000); // conservative default for ERC-20 transfer on L2
      }

      const gasLimit = gasEstimate + BigInt(5000);

      if (!maxFeePerGas) {
        return { success: false, error: "Unable to determine gas price" };
      }

      const gasCost = gasLimit * maxFeePerGas;
      const ethBalance: bigint = await provider.getBalance(senderAddress);

      if (ethBalance < gasCost) {
        return {
          success: false,
          error: `Not enough ETH to cover gas (~${ethers.formatEther(
            gasCost
          )} ETH required)`,
        };
      }

      // Send raw transaction using signer (wallet)
      const txResp = await wallet.sendTransaction({
        to: tokenAddress,
        data,
        gasLimit,
        ...(maxFeePerGas
          ? { maxFeePerGas, maxPriorityFeePerGas }
          : { gasPrice: feeData.gasPrice }),
      });

      const receipt = await txResp.wait();

      const gasUsed = receipt.gasUsed ?? BigInt(0);
      const effectiveGasPrice =
        receipt.effectiveGasPrice ?? feeData.gasPrice ?? BigInt(0);
      const feePaid = gasUsed * effectiveGasPrice;

      return {
        success: true,
        txHash: txResp.hash,
        receipt,
        gasUsed: gasUsed.toString(),
        feePaidEth: ethers.formatEther(feePaid),
      };
    }

    // NATIVE ETH TRANSFER BRANCH
    const senderAddress = await wallet.getAddress();
    const amountWei = ethers.parseEther(amount);
    const ethBalance: bigint = await provider.getBalance(senderAddress);

    const unsignedTx = { to: recipient, value: amountWei };
    const gasEstimate = await provider.estimateGas(unsignedTx);
    const gasLimit = gasEstimate + BigInt(2100);

    if (!maxFeePerGas)
      return { success: false, error: "Unable to determine gas price" };

    const totalCost = amountWei + gasLimit * maxFeePerGas;
    if (ethBalance < totalCost) {
      return {
        success: false,
        error: `Insufficient ETH: need ${ethers.formatEther(
          totalCost
        )}, have ${ethers.formatEther(ethBalance)}`,
      };
    }

    const txResp = await wallet.sendTransaction({
      to: recipient,
      value: amountWei,
      gasLimit,
      ...(maxFeePerGas
        ? { maxFeePerGas, maxPriorityFeePerGas }
        : { gasPrice: feeData.gasPrice }),
    });

    const receipt = await txResp.wait();
    const gasUsed = receipt.gasUsed ?? BigInt(0);
    const effectiveGasPrice =
      receipt.effectiveGasPrice ?? feeData.gasPrice ?? BigInt(0);
    const feePaid = gasUsed * effectiveGasPrice;

    return {
      success: true,
      txHash: txResp.hash,
      receipt,
      gasUsed: gasUsed.toString(),
      feePaidEth: ethers.formatEther(feePaid),
    };
  } catch (err: any) {
    console.error("Transaction Error:", err);
    return { success: false, error: err?.message ?? String(err) };
  }
}
