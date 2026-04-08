import logo from "@/assets/logo-metaverso.png";
import decoScribble from "@/assets/deco-scribble.png";
import glitchApresentador from "@/assets/glitch-apresentador.png";
import Particles from "./Particles";
import { MapPinX, CalendarCheck2, AlarmClockCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden radial-burst">
      <div className="absolute inset-0 halftone pointer-events-none" />
      <Particles />

      {/* Comic starburst decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-neon-pink starburst opacity-60 hidden md:block animate-float" />
      <div className="absolute bottom-32 left-20 w-14 h-14 bg-neon-yellow starburst opacity-50 hidden md:block" style={{ animationDelay: "1s" }} />
      <div className="absolute top-40 right-20 w-16 h-16 bg-comic-cyan starburst opacity-40 hidden md:block animate-float" style={{ animationDelay: "2s" }} />

      {/* Decorative element */}
      <img src={decoScribble} alt="" className="absolute top-10 right-10 w-32 opacity-30 animate-float pointer-events-none hidden md:block" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-glitch-color mb-6">
          <img src={logo} alt="Metaverso Experience" className="mx-auto w-72 md:w-96 drop-shadow-2xl" />
        </div>

        <p className="font-display text-2xl md:text-4xl text-neon-yellow text-glow-yellow mb-4 tracking-wider">
          O maior encontro geek do Nordeste
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-muted-foreground font-body mb-2">
          <span className="flex items-center gap-2 bg-card/60 px-4 py-1 rounded-full border-2 border-border"><MapPinX /> Usina Cultural Energisa — João Pessoa, PB</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-muted-foreground font-body mb-8">
          <span className="flex items-center gap-2 bg-card/60 px-4 py-1 rounded-full border-2 border-border"><CalendarCheck2 /> Outubro / Novembro 2026</span>
          <span className="flex items-center gap-2 bg-card/60 px-4 py-1 rounded-full border-2 border-border"><AlarmClockCheck  /> 3 dias de evento</span>
        </div>

        <a
          href="#contato"
          className="inline-block font-display text-lg md:text-xl px-8 py-4 rounded-lg bg-neon-yellow text-background uppercase tracking-widest transition-all hover:scale-105 comic-card border-4 border-black"
        >
          Seja um Patrocinador 💥
        </a>
      </div>

      {/* Glitch mascot */}
      <img src={glitchApresentador} alt="Glitch - Mascote do Metaverso Experience" className="absolute bottom-4 right-4 md:right-16 w-36 md:w-56 opacity-90 animate-float pointer-events-none drop-shadow-[0_0_30px_rgba(107,33,168,0.6)]" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-3 border-neon-yellow flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-neon-yellow rounded-full animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
