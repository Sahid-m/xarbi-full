"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpRight, CheckCircle2, Copy, TrendingUp, Wallet2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getTokenBalance } from "./config"
import { sendFromPrivateKey } from "./transfer"

export default function WalletPage() {
    const [wallet, setWallet] = useState<any>(null)
    const [balance, setBalance] = useState<string>("0.0000")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [withdrawData, setWithdrawData] = useState({ to: "", amount: "" })

    useEffect(() => {
        fetchWallet()
    }, [])

    const fetchWallet = async () => {
        const res = await fetch("/api/wallet")
        const data = await res.json()
        setWallet(data)

        if (data?.publicKey) {
            const bal = await getTokenBalance(process.env.NEXT_PUBLIC_WUSDC_ADDRESS ?? "", data.publicKey)

            setBalance(bal?.balance)
        }
    }

    const handleCopy = () => {
        if (wallet?.publicKey) {
            navigator.clipboard.writeText(wallet.publicKey)
            setCopied(true)
            toast.success("Address copied to clipboard")
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleWithdraw = async () => {
        if (!withdrawData.to || !withdrawData.amount) {
            toast.error("Please enter recipient and amount")
            return
        }

        setLoading(true)



        const data = await sendFromPrivateKey({
            privateKey: wallet.privateKey,
            amount: withdrawData.amount.toString(),
            recipient: withdrawData.to,
            tokenAddress: process.env.NEXT_PUBLIC_WUSDC_ADDRESS ?? ""
        })


        if (data.success) {
            const explorerUrl = `https://sepolia.arbiscan.io/tx/${data.txHash}`;

            toast.success(
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-foreground">
                        🎉 Transaction Successful!
                    </span>
                    <a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent underline underline-offset-2 hover:text-accent/80 break-all"
                    >
                        View on Arbiscan
                    </a>
                </div>
            );
        } else {
            toast.error("Unable to get RPC and transaction failed")
        }
        setLoading(false)
        setOpen(false)
        setWithdrawData({ to: "", amount: "" })
        fetchWallet()
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Wallet</h1>
                    <p className="text-muted-foreground">Manage your funds and view transaction history</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Balance Card */}
                    <Card className="lg:col-span-2 bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-500/10">
                                        <Wallet2 className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Total Balance</CardTitle>
                                        <CardDescription>Arbitrum Sepolia Testnet</CardDescription>
                                    </div>
                                </div>
                                <Button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <ArrowUpRight className="w-4 h-4 mr-2" />
                                    Withdraw
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <p className="text-5xl font-bold text-foreground mb-1">
                                    {balance}
                                    <span className="text-2xl font-semibold text-muted-foreground ml-2">USDC</span>
                                </p>
                                <p className="text-sm text-muted-foreground">≈ ${balance} USD</p>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <Label className="text-xs text-muted-foreground mb-2 block">Wallet Address</Label>
                                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border">
                                    <code className="flex-1 text-sm font-mono text-foreground truncate">
                                        {wallet?.publicKey || "Loading..."}
                                    </code>
                                    <Button variant="ghost" size="sm" onClick={handleCopy} className="shrink-0 h-8 w-8 p-0">
                                        {copied ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <div className="space-y-4">
                        <Card className="bg-card border-border shadow-sm">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded bg-green-500/10">
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                    </div>
                                    <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-foreground">$0.00</p>
                                <p className="text-xs text-muted-foreground mt-1">From API calls</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Withdraw Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                        <DialogDescription>Send USDC from your wallet to another address</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="recipient">Recipient Address</Label>
                            <Input
                                id="recipient"
                                placeholder="0x..."
                                value={withdrawData.to}
                                onChange={(e) => setWithdrawData({ ...withdrawData, to: e.target.value })}
                                className="font-mono text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (USDC)</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="0.00"
                                value={withdrawData.amount}
                                onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground">Available: {balance} USDC</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button onClick={handleWithdraw} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                            {loading ? "Processing..." : "Confirm Withdrawal"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
