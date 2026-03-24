import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import decoSmile from "@/assets/deco-smile.png";
import Particles from "./Particles";

const ContatoSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contato" className="relative py-24 px-4 overflow-hidden">
      <Particles />
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/10 to-transparent pointer-events-none" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-4xl text-center">
        {/* Glitch mascot representation */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="inline-block relative">
            <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 border-4 border-neon-purple relative overflow-hidden box-glow-purple">
              {/* CRT screen */}
              <div className="absolute inset-2 rounded-lg bg-primary flex items-center justify-center scanlines">
                <span className="text-3xl">😈</span>
              </div>
              {/* Antenna */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-neon-green rounded-full" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-neon-green rounded-full" />
            </div>
            <img src={decoSmile} alt="" className="absolute -bottom-4 -right-8 w-16 opacity-60" />
          </div>
          <p className="font-display text-xs text-neon-green mt-4 tracking-widest">GLITCH</p>
        </div>

        <h2 className={`font-display text-3xl md:text-5xl font-bold mb-4 text-glow-purple transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Vamos construir esse<br />universo juntos?
        </h2>

        <p className={`text-muted-foreground mb-12 text-lg transition-all duration-700 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Entre em contato e descubra como sua marca pode fazer parte do Metaverso Experience
        </p>

        <div className={`grid md:grid-cols-3 gap-4 mb-12 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="rounded-xl p-6 bg-card border border-border hover:neon-border-purple transition-all">
            <span className="text-2xl mb-2 block">📧</span>
            <p className="text-xs text-muted-foreground font-display uppercase mb-1">E-mail</p>
            <p className="text-neon-purple text-sm font-semibold">comercial@flamastudio.com</p>
          </div>
          <div className="rounded-xl p-6 bg-card border border-border hover:neon-border-pink transition-all">
            <span className="text-2xl mb-2 block">📱</span>
            <p className="text-xs text-muted-foreground font-display uppercase mb-1">WhatsApp</p>
            <p className="text-neon-pink text-sm font-semibold">(83) 99392-7595</p>
          </div>
          <div className="rounded-xl p-6 bg-card border border-border hover:neon-border-green transition-all">
            <span className="text-2xl mb-2 block">📸</span>
            <p className="text-xs text-muted-foreground font-display uppercase mb-1">Instagram</p>
            <p className="text-neon-green text-sm font-semibold">@metaversoexperience</p>
          </div>
        </div>

        <a
          href="mailto:contato@metaverso.com"
          className={`inline-block font-display font-bold text-sm md:text-base px-10 py-4 rounded-lg bg-gradient-to-r from-neon-green to-neon-blue text-background uppercase tracking-widest transition-all hover:scale-105 box-glow-green ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "700ms" }}
        >
          Quero ser patrocinador
        </a>
      </div>
    </section>
  );
};

export default ContatoSection;
