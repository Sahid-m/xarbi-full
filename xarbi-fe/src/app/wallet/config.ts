import { ethers } from "ethers";

const RPC_URL = process.env.NEXT_PUBLIC_ARB_SEPOLIA_RPC!;
const provider = new ethers.JsonRpcProvider(RPC_URL, {
  name: "arbitrum-sepolia",
  chainId: 421614,
});

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

export async function getTokenBalance(
  tokenAddress: string,
  userAddress: string
) {
  if (!ethers.isAddress(tokenAddress) || !ethers.isAddress(userAddress)) {
    return;
  }

  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const [rawBalance, decimals, symbol] = await Promise.all([
    contract.balanceOf(userAddress),
    contract.decimals(),
    contract.symbol().catch(() => "TOKEN"),
  ]);

  const formatted = ethers.formatUnits(rawBalance, decimals);
  return {
    tokenAddress,
    symbol,
    rawBalance: rawBalance.toString(),
    balance: formatted,
  };
}
