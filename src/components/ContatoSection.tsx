import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import decoSmile from "@/assets/deco-smile.png";
import glitchPalco from "@/assets/glitch-palco.png";
import Particles from "./Particles";

const ContatoSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contato" className="relative py-24 px-4 overflow-hidden radial-burst">
      <div className="absolute inset-0 halftone pointer-events-none" />
      <Particles />

      <div className="absolute top-16 left-10 w-16 h-16 bg-neon-pink starburst opacity-40 hidden md:block" />
      <div className="absolute bottom-20 right-16 w-12 h-12 bg-neon-yellow starburst opacity-30 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-4xl text-center">
        {/* Glitch mascot */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="inline-block relative">
            <img src={glitchPalco} alt="Glitch" className="w-44 md:w-56 mx-auto drop-shadow-[0_0_30px_rgba(107,33,168,0.6)]" />
            <img src={decoSmile} alt="" className="absolute -bottom-4 -right-8 w-16 opacity-60" />
          </div>
          <p className="font-display text-lg text-neon-green mt-4 tracking-widest">GLITCH</p>
        </div>

        <h2 className={`font-display text-4xl md:text-6xl mb-4 text-neon-yellow text-glow-yellow transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Vamos construir esse<br />universo juntos?
        </h2>

        <p className={`text-muted-foreground mb-12 text-lg transition-all duration-700 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Entre em contato e descubra como sua marca pode fazer parte do Metaverso Experience
        </p>

        <div className={`grid md:grid-cols-3 gap-4 mb-12 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="comic-card bg-card p-6 border-t-[6px] border-t-neon-purple">
            <span className="text-2xl mb-2 block">📧</span>
            <p className="text-xs text-muted-foreground font-display uppercase mb-1">E-mail</p>
            <p className="text-neon-purple text-sm font-semibold">comercial@flamastudio.com</p>
          </div>
          <div className="comic-card bg-card p-6 border-t-[6px] border-t-neon-pink">
            <span className="text-2xl mb-2 block">📱</span>
            <p className="text-xs text-muted-foreground font-display uppercase mb-1">WhatsApp</p>
            <p className="text-neon-pink text-sm font-semibold">(83) 99392-7595</p>
          </div>
          <div className="comic-card bg-card p-6 border-t-[6px] border-t-neon-green">
            <span className="text-2xl mb-2 block">📸</span>
            <p className="text-xs text-muted-foreground font-display uppercase mb-1">Instagram</p>
            <p className="text-neon-green text-sm font-semibold">@metaversoexperience</p>
          </div>
        </div>

        <a
          href="mailto:comercial@flamastudio.com"
          className={`inline-block font-display text-lg md:text-xl px-10 py-4 bg-neon-yellow text-background uppercase tracking-widest transition-all hover:scale-105 comic-card ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "700ms" }}
        >
          Quero ser patrocinador 🚀
        </a>
      </div>
    </section>
  );
};

export default ContatoSection;
