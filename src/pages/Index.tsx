import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventoSection from "@/components/EventoSection";
import AtracoesSection from "@/components/AtracoesSection";
import GaleriaSection from "@/components/GaleriaSection";
import NumerosSection from "@/components/NumerosSection";
import PublicoSection from "@/components/PublicoSection";
import CotasSection from "@/components/CotasSection";
import PorQueSection from "@/components/PorQueSection";
import SobreSection from "@/components/SobreSection";
import ContatoSection from "@/components/ContatoSection";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <EventoSection />
      <AtracoesSection />
      <GaleriaSection />
      <NumerosSection />
      <PublicoSection />
      <CotasSection />
      <PorQueSection />
      <SobreSection />
      <ContatoSection />
      <ScrollToTop />

      {/* Footer */}
      <footer className="py-8 text-center border-t-3 border-black bg-card halftone-dense">
        <p className="text-muted-foreground text-sm font-display">
          © 2026 Metaverso Experience — Todos os direitos reservados 🎮
        </p>
      </footer>
    </div>
  );
};

export default Index;
