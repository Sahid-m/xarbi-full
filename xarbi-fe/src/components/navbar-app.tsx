"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Home, LayoutDashboard, Wallet2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/wallet", label: "Wallet", icon: Wallet2 },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50",
                "border-b border-[hsl(var(--border))]/50",
                "bg-[hsl(var(--background))]/60 backdrop-blur-xl",
                "shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                {/* Brand */}
                <Link
                    href="/"
                    className="text-xl font-semibold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent"
                >
                    Xarbi
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                    isActive
                                        ? "bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))]"
                                        : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))]"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </motion.nav>
    );
}
