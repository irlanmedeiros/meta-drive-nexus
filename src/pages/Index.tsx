import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventoSection from "@/components/EventoSection";
import AtracoesSection from "@/components/ProgramacaoSection";
import GaleriaSection from "@/components/GaleriaSection";
import NumerosSection from "@/components/NumerosSection";
import PublicoSection from "@/components/PublicoSection";
import CotasSection from "@/components/CotasSection";
import PorQueSection from "@/components/PorQueSection";
import SobreSection from "@/components/SobreSection";
import ContatoSection from "@/components/ContatoSection";
import ScrollToTop from "@/components/ScrollToTop";
import { Copyright, Gamepad2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <EventoSection />
      <GaleriaSection />
      <AtracoesSection />
      <NumerosSection />
      <PublicoSection />
      <CotasSection />
      <PorQueSection />
      <SobreSection />
      <ContatoSection />
      <ScrollToTop />

      {/* Footer */}
      <footer className="py-8 text-center border-t-3 border-black bg-card halftone-dense">
        <p className="text-muted-foreground text-sm font-display inline-flex items-center gap-2">
          <Copyright className="w-4 h-4" aria-hidden="true" /> 2026 Metaverso Experience — Todos os direitos reservados
          <Gamepad2 className="w-4 h-4" aria-hidden="true" />
        </p>
      </footer>
    </div>
  );
};

export default Index;
