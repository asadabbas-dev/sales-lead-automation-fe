"use client";

import { HeroSection } from "@/components/hero/hero.section.component";
import { FeaturesSection } from "@/components/sections/features.section.component";
import { WorkspaceSection } from "@/components/sections/workspace.section.component";
import { UseCasesSection } from "@/components/sections/use.cases.section.component";
import { StatsSection } from "@/components/sections/stats.section.component";
import { TrustSection } from "@/components/sections/trust.section.component";
import { CTASection } from "@/components/sections/cta.section.component";
import { NoiseOverlay } from "@/components/effects/noise.overlay.component";
import { GridOverlay } from "@/components/effects/grid.overlay.component";
import { AnimatedGradient } from "@/components/effects/animated.gradient.component";
import { GradientDivider } from "@/components/effects/gradient.divider.component";
import { LandingHeader } from "@/components/hero/landing.header.component";
import { LandingFooter } from "@/components/sections/landing.footer.component";

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
