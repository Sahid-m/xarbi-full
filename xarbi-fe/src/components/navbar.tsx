"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Navbar = () => {
    const { isSignedIn } = useUser();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--background))]/80 backdrop-blur-xl border-b border-[hsl(var(--border))]/50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
                            Xarbi
                        </span>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection("how-it-works")}
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => scrollToSection("features")}
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection("tech-stack")}
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                        >
                            Tech Stack
                        </button>
                    </div>

                    {/* Right Side: CTA or User */}
                    <div className="flex items-center gap-4">
                        {isSignedIn ? (
                            <>
                                <Link href="/dashboard">
                                    <Button className="relative group bg-[hsl(var(--accent))]/80 hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] shadow-lg shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 transition-all">
                                        <span className="flex items-center gap-2">
                                            Dashboard
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </Link>

                                {/* Clerk User Avatar */}
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox:
                                                "w-9 h-9 ring-2 ring-[hsl(var(--primary))]/60 hover:ring-[hsl(var(--primary))] transition-all rounded-full",
                                        },
                                    }}
                                    afterSignOutUrl="/"
                                />
                            </>
                        ) : (
                            <Link href="/dashboard">
                                <Button
                                    className="relative group bg-[hsl(var(--primary))]/80 hover:bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary))]/30 hover:shadow-[hsl(var(--primary))]/50 transition-all"
                                    onClick={() => { }}
                                >
                                    <span className="flex items-center gap-2">
                                        Start Earning
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
