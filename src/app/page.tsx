"use client";

import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { WorkspaceSection } from "@/components/sections/WorkspaceSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { CTASection } from "@/components/sections/CTASection";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { GridOverlay } from "@/components/effects/GridOverlay";
import { AnimatedGradient } from "@/components/effects/AnimatedGradient";
import { GradientDivider } from "@/components/effects/GradientDivider";
import { LandingHeader } from "@/components/hero/LandingHeader";
import { LandingFooter } from "@/components/sections/LandingFooter";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] font-sans text-white antialiased">
      {/* Global effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0B0E14] via-[#0F172A] to-[#020617]" />
        <AnimatedGradient />
        <GridOverlay />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#030712_60%)]" />
      </div>

      <NoiseOverlay />

      <LandingHeader />

      <main className="relative z-10">
        <HeroSection />
        <GradientDivider />
        <FeaturesSection />
        <WorkspaceSection />
        <GradientDivider />
        <UseCasesSection />
        <StatsSection />
        <TrustSection />
        <GradientDivider />
        <CTASection />
        <LandingFooter />
      </main>
    </div>
  );
}
