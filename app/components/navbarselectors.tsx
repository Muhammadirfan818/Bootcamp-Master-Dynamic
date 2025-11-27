"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";

interface NavbarSelectorProps {
    navbarData?: any;
    navbar2Data?: any;
}

export default function NavbarSelector({ navbarData, navbar2Data }: NavbarSelectorProps) {
    const pathname = usePathname();

    // Show Navbar on home page and /signup
    const showHomeNavbar = ["/", "/signup"].includes(pathname);

    // Hide Navbar2 on these pages
    const hideNavbar2Pages = ["/checkout", "/support", "/support2", "/signup"];
    const showNavbar2 = !showHomeNavbar && !hideNavbar2Pages.includes(pathname);

    if (showHomeNavbar) return <Navbar data={navbarData} />;
    if (showNavbar2) return <Navbar2 data={navbar2Data} />;
    return null; // No navbar on excluded pages
}
