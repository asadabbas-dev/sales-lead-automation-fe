"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic.button.component";

const navLinks = [
  { label: "Overview", href: "/" },
  { label: "Automation Runs", href: "/runs" },
];

export function LandingHeader() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0.6)", "rgba(0,0,0,0.95)"]);

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
              <Link
                key={link.label}
                href={link.href}
                className="text-landing-body font-medium text-slate-200 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
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
              className="rounded-lg bg-white px-4 py-2 text-landing-body font-semibold text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
            >
              View Runs
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}
