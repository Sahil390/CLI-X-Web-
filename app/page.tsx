"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { StackFlexSection } from "@/components/sections/StackFlexSection";
import { LocalOwnershipSection } from "@/components/sections/LocalOwnershipSection";
import { DiffViewerSection } from "@/components/sections/DiffViewerSection";
import { SelfRepairSection } from "@/components/sections/SelfRepairSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { MonorepoSection } from "@/components/sections/MonorepoSection";
import { PersonaSection } from "@/components/sections/PersonaSection";
import { CheatsheetSection } from "@/components/sections/CheatsheetSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-purple-500/30 selection:text-white">
      <Header />
      
      <main>
        <HeroSection />
        <WorkflowSection />
        <StackFlexSection />
        <LocalOwnershipSection />
        <DiffViewerSection />
        <SelfRepairSection />
        <SecuritySection />
        <MonorepoSection />
        <PersonaSection />
        <CheatsheetSection />
      </main>

      <Footer />
    </div>
  );
}
