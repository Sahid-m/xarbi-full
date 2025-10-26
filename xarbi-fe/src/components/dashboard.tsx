"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Check, Code2, Copy, DollarSign, PlusCircle, Sparkles, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function DashboardClient() {
    const [projects, setProjects] = useState<any[]>([])
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(1)
    const [merchantId, setMerchantId] = useState(
        typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : Math.random().toString(36).substring(2, 10),
    )
    const [editingProject, setEditingProject] = useState<any>(null)
    const [form, setForm] = useState({
        name: "",
        description: "",
        pricePerHit: "",
    })
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        fetch("/api/projects")
            .then((r) => r.json())
            .then(setProjects)
            .catch(console.error)
    }, [])

    const resetForm = () => {
        setForm({ name: "", description: "", pricePerHit: "" })
        setEditingProject(null)
        setStep(1)
    }

    const handleDialogOpen = (project?: any) => {
        if (project) {
            setEditingProject(project)
            setForm({
                name: project.name,
                description: project.description || "",
                pricePerHit: project.pricePerHit.toString(),
            })
            setMerchantId(project.merchant_id)
        } else {
            resetForm()
        }
        setOpen(true)
    }

    const handleSave = async () => {
        setLoading(true)

        const payload = {
            name: form.name,
            description: form.description,
            pricePerHit: form.pricePerHit,
            merchantId: merchantId,
        }

        const method = editingProject ? "PATCH" : "POST"
        const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects"

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        if (!editingProject) {

            setMerchantId(
                typeof crypto !== "undefined" && crypto.randomUUID
                    ? crypto.randomUUID()
                    : Math.random().toString(36).substring(2, 10),
            )
        }

        if (!res.ok) {
            toast.error("Failed to save project")
            setLoading(false)
            return
        }

        const data = await res.json()

        if (editingProject) {
            setProjects((prev) => prev.map((p) => (p.id === data.id ? data : p)))
            toast.success("Project updated!")
        } else {
            setProjects((prev) => [data, ...prev])
            toast.success("Project created!")
        }

        setLoading(false)
        setOpen(false)
        resetForm()
    }

    const snippet = `import { x402Middleware } from "arb-x402";

*Your App initialisation*

app.use(await x402Middleware({
    merchantId: "${merchantId}",
}))`

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet)
        setCopied(true)
        toast.success("Code copied to clipboard!")
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="border-b border-border bg-gradient-to-b from-muted/30 to-background">
                <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div className="space-y-4 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-medium text-primary">API Monetization Platform</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">Your API Projects</h1>
                            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                                Transform your APIs into revenue streams. Create projects, set pricing, and start earning with just a
                                few lines of code.
                            </p>
                        </div>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={() => handleDialogOpen()}
                                    size="lg"
                                    className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 gap-2 self-start lg:self-center"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    Create New Project
                                </Button>
                            </DialogTrigger>

                            {/* Wizard Dialog */}
                            <DialogContent className="sm:max-w-2xl bg-card border-border">
                                <DialogHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                                            >
                                                1
                                            </div>
                                            <div className={`h-0.5 w-12 transition-colors ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                                            >
                                                2
                                            </div>
                                            <div className={`h-0.5 w-12 transition-colors ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                                            >
                                                3
                                            </div>
                                        </div>
                                    </div>
                                    <DialogTitle className="text-2xl">
                                        {step === 1 && (editingProject ? "Edit Project Details" : "Create New Project")}
                                        {step === 2 && "Install SDK"}
                                        {step === 3 && "Integrate Your API"}
                                    </DialogTitle>
                                    <DialogDescription className="text-base">
                                        {step === 1 && "Configure your project details and pricing model."}
                                        {step === 2 && "Install our npm package to enable x402 monetization in your application."}
                                        {step === 3 && "Add this middleware to your API routes to start monetizing."}
                                    </DialogDescription>
                                </DialogHeader>

                                {step === 1 && (
                                    <div className="space-y-5 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-medium">
                                                Project Name
                                            </Label>
                                            <Input
                                                id="name"
                                                placeholder="My Awesome API"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className="h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description" className="text-sm font-medium">
                                                Description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Describe what your API does and its key features..."
                                                value={form.description}
                                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                                className="min-h-[100px] resize-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="price" className="text-sm font-medium">
                                                Price per API Call
                                            </Label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    step="0.00001"
                                                    placeholder="0.00100"
                                                    value={form.pricePerHit}
                                                    onChange={(e) => setForm({ ...form, pricePerHit: e.target.value })}
                                                    className="h-11 pl-9"
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground">Set your price in USD per API request</p>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="py-4 space-y-4">
                                        <div className="bg-muted/50 border border-border rounded-lg p-6">
                                            <div className="flex items-start gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <Code2 className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Install via npm</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Add the x402 middleware to your project dependencies
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-card border border-border rounded-md p-4 font-mono text-sm">
                                                npm install arb-x402
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="py-4 space-y-4">
                                        <div className="bg-muted/50 border border-border rounded-lg p-6">
                                            <div className="flex items-start gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                                    <Zap className="w-5 h-5 text-accent" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold mb-1">Add to your API routes</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Copy this code snippet and paste it in your application initialization
                                                    </p>
                                                </div>
                                                <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
                                                    {copied ? (
                                                        <>
                                                            <Check className="w-3.5 h-3.5" />
                                                            Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-3.5 h-3.5" />
                                                            Copy
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                            <pre className="bg-card border border-border rounded-md p-4 overflow-x-auto">
                                                <code className="text-sm font-mono text-foreground">{snippet}</code>
                                            </pre>
                                        </div>
                                    </div>
                                )}

                                <DialogFooter className="flex flex-row justify-between gap-3 pt-4">
                                    {step > 1 && (
                                        <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                                            Back
                                        </Button>
                                    )}
                                    <div className="flex-1" />
                                    {step < 3 ? (
                                        <Button
                                            onClick={() => setStep((s) => s + 1)}
                                            disabled={step === 1 && (!form.name || !form.pricePerHit)}
                                            className="gap-2"
                                        >
                                            Continue
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button onClick={handleSave} disabled={loading} className="gap-2">
                                            {loading ? "Saving..." : editingProject ? "Update Project" : "Finish Setup"}
                                        </Button>
                                    )}
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4">
                        <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
                            <Code2 className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-center">No projects yet</h3>
                        <p className="text-muted-foreground text-center max-w-md mb-8 text-balance">
                            Get started by creating your first project. It only takes a few minutes to set up and start monetizing
                            your API.
                        </p>
                        <Button
                            onClick={() => handleDialogOpen()}
                            size="lg"
                            className="bg-primary hover:bg-primary-glow text-primary-foreground gap-2"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Create Your First Project
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold">All Projects</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {projects.length} {projects.length === 1 ? "project" : "projects"} active
                                </p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((p) => (
                                <Card
                                    key={p.id}
                                    onClick={() => handleDialogOpen(p)}
                                    className="group cursor-pointer bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-200 overflow-hidden"
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <CardTitle className="text-xl mb-1 truncate group-hover:text-primary transition-colors">
                                                    {p.name}
                                                </CardTitle>
                                                <Badge variant="secondary" className="text-xs font-mono">
                                                    ID: {p.id.slice(0, 8)}
                                                </Badge>
                                            </div>
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                                <Code2 className="w-5 h-5 text-primary" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <CardDescription className="text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                                            {p.description || "No description provided"}
                                        </CardDescription>
                                        <div className="flex items-center justify-between pt-3 border-t border-border">
                                            <span className="text-xs text-muted-foreground font-medium">Price per call</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold text-accent">${p.pricePerHit.toFixed(5)}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
