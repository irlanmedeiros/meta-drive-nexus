import logo from "@/assets/logo-metaverso.png";
import decoScribble from "@/assets/deco-scribble.png";
import glitchApresentador from "@/assets/glitch-apresentador.png";
import Particles from "./Particles";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <Particles />
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Decorative element */}
      <img src={decoScribble} alt="" className="absolute top-10 right-10 w-32 opacity-20 animate-float pointer-events-none hidden md:block" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-glitch-color mb-6">
          <img src={logo} alt="Metaverso Experience" className="mx-auto w-72 md:w-96 drop-shadow-2xl" />
        </div>

        <p className="font-display text-lg md:text-2xl font-bold text-neon-green text-glow-green mb-4 tracking-wider">
          O maior encontro geek do Nordeste
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-muted-foreground font-body mb-2">
          <span className="flex items-center gap-2">📍 Usina Cultural Energisa — João Pessoa, PB</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-muted-foreground font-body mb-8">
          <span>📅 Outubro / Novembro 2026</span>
          <span>⏱️ 3 dias de evento</span>
        </div>

        <a
          href="#contato"
          className="inline-block font-display font-bold text-sm md:text-base px-8 py-4 rounded-lg bg-gradient-to-r from-neon-purple to-neon-pink text-foreground uppercase tracking-widest transition-all hover:scale-105 box-glow-purple hover:box-glow-pink"
        >
          Seja um Patrocinador
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-neon-purple flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-neon-purple rounded-full animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
