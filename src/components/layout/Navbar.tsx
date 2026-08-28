"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Github, Linkedin, Home, Cpu, FolderGit2, Briefcase, Mail } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Skills", href: "/#technologies", icon: Cpu },
  { name: "Projects", href: "/#projects", icon: FolderGit2 },
  { name: "Experience", href: "/#experience", icon: Briefcase },
  { name: "Contact", href: "/#contact", icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-border/50 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="text-foreground group-hover:text-primary transition-colors">
              Aymane Harty
            </span>
            <span className="text-primary text-2xl">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="w-px h-6 bg-border mx-2" />

            {/* Social */}
            <a
              href="https://github.com/AymaneWebDEV"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-aymane-harty-791823308/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="container px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {item.name}
                </Link>
              );
            })}

            <div className="h-px bg-border my-2" />

            <div className="flex gap-2 px-3 py-2">
              <a
                href="https://github.com/AymaneWebDEV"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 text-sm font-medium"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ahmed-aymane-harty-791823308/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 text-sm font-medium"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
