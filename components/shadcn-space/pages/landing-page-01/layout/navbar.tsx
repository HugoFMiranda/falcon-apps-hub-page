"use client";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type NavigationSection = {
    name: string;
    href: string;
    isActive?: boolean;
};

interface NavbarProps {
    navigationData: NavigationSection[];
}

const NavLink = ({
    item,
    onClick,
}: {
    item: NavigationSection;
    onClick?: () => void;
}) => {
    return (
        <li className={cn("group flex items-center transition-all duration-500 ease-in-out w-fit", item.isActive ? "gap-3" : "gap-0 hover:gap-3")}>
            <div className={cn("overflow-hidden transition-all duration-500 ease-in-out flex items-center", item.isActive ? "max-w-6 opacity-100" : "max-w-0 opacity-0 group-hover:max-w-6 group-hover:opacity-100")}>
                <div className="w-6 h-0.5 rounded-full bg-foreground" />
            </div>
            <a href={item.href} onClick={onClick} className={cn("text-2xl sm:text-3xl sm:leading-10 leading-8 font-medium transition-colors duration-300", item.isActive ? "text-foreground" : "text-foreground/80")}>{item.name}</a>
        </li>
    );
};

const Navbar = ({ navigationData }: NavbarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [menuOpen]);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        document.documentElement.style.colorScheme = next ? "dark" : "light";
        localStorage.setItem("falcon-hub-theme", next ? "dark" : "light");
    };

    return (
        <header className="sticky top-0 bg-background z-50 border-b border-border">
            <nav className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
                <div className="border-x border-border px-4 lg:px-10 py-4 flex items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1">
                            <span className="flex items-center gap-2 py-2.5 text-foreground">
                                <MapPin size={16} />
                                <span>Based in Portugal</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <AnimatePresence>
                                {menuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setMenuOpen(false)}
                                        className="fixed inset-0 z-40 backdrop-blur-sm"
                                    />
                                )}
                            </AnimatePresence>
                            <button
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                className="rounded-full bg-background hover:bg-muted h-auto p-2.5 border border-border cursor-pointer"
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                            {/*
                              Plain state-toggled panel rather than a portalled menu
                              primitive: anything that portals and autofocuses drags the
                              document scroll with it when the trigger sits in a sticky
                              header. This panel is positioned relative to the header and
                              never takes focus, so opening it cannot move the page.
                            */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen((v) => !v)}
                                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                                    aria-expanded={menuOpen}
                                    aria-controls="site-menu"
                                    className="rounded-full bg-background hover:bg-muted h-auto p-2.5 gap-2 border border-border cursor-pointer flex items-center"
                                >
                                    <Menu className="w-4 h-4 text-foreground" />
                                </button>
                                <AnimatePresence>
                                    {menuOpen && (
                                        <motion.div
                                            id="site-menu"
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute right-0 top-full mt-3 z-50 w-[min(20rem,calc(100vw-2rem))] sm:w-96 bg-background py-8 px-6 shadow-2xl rounded-3xl border border-border"
                                        >
                                            <div className="flex flex-col gap-6">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-lg font-medium text-foreground">
                                                        Menu
                                                    </p>
                                                    <Button variant="outline" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="h-auto p-2.5 cursor-pointer rounded-full">
                                                        <X size={20} />
                                                    </Button>
                                                </div>
                                                <hr className="border-border" />
                                                <ul className="flex flex-col gap-3.5">
                                                    {navigationData.map((item, index) => (
                                                        <NavLink
                                                            key={index}
                                                            item={item}
                                                            onClick={() => setMenuOpen(false)}
                                                        />
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <Button render={<a href="#contact" />} className="group max-lg:hidden h-auto px-5 py-2.5 flex items-center gap-2 rounded-full cursor-pointer hover:bg-primary/80">
                                <ArrowUpRight size={16} className="transition-all duration-300 group-hover:rotate-45" />
                                <span>Hire me</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
