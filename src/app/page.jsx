"use client";

import { HeroSection } from "@/components/hero/hero-section/hero-section.component";
import { FeaturesSection } from "@/components/sections/features.section.component";
import { WorkspaceSection } from "@/components/sections/workspace.section.component";
import { StatsSection } from "@/components/sections/stats.section.component";
import { UseCasesSection } from "@/components/sections/use.cases.section.component";
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
    <div className="relative min-h-screen overflow-x-hidden bg-black font-sans text-white antialiased">
      {/* Global effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] via-[#0f0f0f] to-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050505] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_30%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_70%,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
        <AnimatedGradient />
        <GridOverlay />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.8)_60%)]" />
      </div>

      <NoiseOverlay />

      <LandingHeader />

      <main className="relative z-10">
        <HeroSection />
        <GradientDivider />
        <FeaturesSection />
        <GradientDivider />
        <WorkspaceSection />
        <GradientDivider />
        <StatsSection />
        <GradientDivider />
        <UseCasesSection />
        <GradientDivider />
        <TrustSection />
        <GradientDivider />
        <CTASection />
        <GradientDivider />
        <LandingFooter />
      </main>
    </div>
  );
}
