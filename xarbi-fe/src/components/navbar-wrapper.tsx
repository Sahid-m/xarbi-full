"use client";

import Navbar from "@/components/navbar-app";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
    const pathname = usePathname();

    // Hide on landing page `/`
    if (pathname === "/") return null;

    return <Navbar />;
}
