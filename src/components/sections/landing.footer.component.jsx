"use client";

import { useRouter } from "next/navigation";

const links = [
  { label: "Features", href: "#features" },
  { label: "Workspace", href: "#workspace" },
  { label: "Use Cases", href: "#use-cases" },
];

export function LandingFooter() {
  const router = useRouter();

  return (
    <footer className="relative border-t border-white/5 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="font-display text-landing-card font-semibold text-white">Lead Ops</span>
          <nav className="flex gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-landing-body text-slate-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => router.push("/runs")}
              className="text-landing-body text-slate-400 transition-colors hover:text-white"
            >
              Dashboard
            </button>
          </nav>
        </div>
        <p className="mt-6 text-center text-landing-meta text-slate-500 sm:text-left">
          © {new Date().getFullYear()} Lead Ops. Automated lead qualification.
        </p>
      </div>
    </footer>
  );
}
