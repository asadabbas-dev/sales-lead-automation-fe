"use client";

import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic.button.component";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Workspace", href: "#workspace" },
  { label: "Use Cases", href: "#use-cases" },
];

export function LandingHeader() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], ["rgba(3,7,18,0.6)", "rgba(3,7,18,0.95)"]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        style={{ backgroundColor: headerBg }}
        className="border-b border-white/5 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text font-display text-landing-section font-bold text-transparent"
            onClick={() => router.push("/")}
          >
            Lead Ops
          </motion.span>

          <nav className="hidden items-center gap-6 sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-landing-body font-medium text-slate-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MagneticButton
              strength={0.2}
              onClick={() => router.push("/runs")}
              className="rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-[length:200%_100%] px-4 py-2 text-landing-body font-semibold text-white transition-all duration-500 hover:bg-right"
            >
              View Runs
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}
