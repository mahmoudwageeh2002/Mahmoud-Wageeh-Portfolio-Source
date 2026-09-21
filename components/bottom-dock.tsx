"use client";

import Link from "next/link";
import { BriefcaseBusiness, FolderKanban, Home, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/experience", label: "Experience", icon: BriefcaseBusiness },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/playground", label: "Playground", icon: Sparkles },
];

export function BottomDock() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="dock-wrap">
      <nav className="dock" aria-label="Primary navigation">
        {links.map(({ href, label, icon: Icon }) => (
          <Link className="dock-link" data-active={pathname === href} href={href} key={href} aria-label={label} title={label}>
            <Icon aria-hidden="true" />
          </Link>
        ))}
        <span className="dock-divider" aria-hidden="true" />
        <button className="theme-toggle" type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Toggle color theme" title="Toggle color theme">
          {mounted && resolvedTheme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </button>
      </nav>
    </div>
  );
}
