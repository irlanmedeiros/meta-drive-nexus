import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import glitchKpop from "@/assets/glitch-kpop.png";

const profiles = [
  { emoji: "🎮", label: "Gamers", desc: "Jogadores casuais e competitivos", accent: "border-neon-green" },
  { emoji: "🎵", label: "Fãs de K-Pop", desc: "Comunidade de dance cover e fans", accent: "border-neon-pink" },
  { emoji: "💻", label: "Tech Enthusiasts", desc: "Entusiastas de tecnologia e inovação", accent: "border-comic-cyan" },
  { emoji: "🎨", label: "Artistas", desc: "Ilustradores, cosplayers e criadores", accent: "border-neon-yellow" },
  { emoji: "📦", label: "Colecionadores", desc: "Figuras, cards e itens exclusivos", accent: "border-neon-purple" },
  { emoji: "🎓", label: "Estudantes", desc: "Jovens universitários e do ensino médio", accent: "border-comic-orange" },
];

const PublicoSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="publico" className="relative py-24 px-4 overflow-hidden radial-burst-purple">
      <div className="absolute inset-0 halftone pointer-events-none" />
      <img src={glitchKpop} alt="Glitch" className="absolute bottom-8 right-4 w-32 md:w-48 opacity-30 pointer-events-none hidden md:block" />

      <div className="absolute bottom-20 left-10 w-14 h-14 bg-neon-pink starburst opacity-40 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-6xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center mb-4 text-neon-pink text-glow-pink transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          PÚBLICO-ALVO
        </h2>
        <p className={`text-center text-muted-foreground mb-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Faixa etária predominante: <span className="text-neon-yellow font-bold font-display text-lg">16–35 anos</span> · Região: João Pessoa, Paraíba e Nordeste
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {profiles.map((p, i) => (
            <div
              key={p.label}
              className={`comic-card bg-card p-6 border-t-[6px] ${p.accent} text-center transition-all duration-500 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <span className="text-4xl mb-3 block">{p.emoji}</span>
              <h3 className="font-display text-base mb-1">{p.label}</h3>
              <p className="text-muted-foreground text-xs">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className={`mt-8 comic-card bg-neon-yellow/10 border-l-[6px] border-neon-yellow p-4 text-center transition-all duration-700 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <p className="text-muted-foreground text-sm">
            <span className="text-neon-yellow font-display text-base">Comportamento:</span> Consumidores ávidos de cultura pop, tecnologia e entretenimento com alto engajamento digital
          </p>
        </div>
      </div>
    </section>
  );
};

export default PublicoSection;
