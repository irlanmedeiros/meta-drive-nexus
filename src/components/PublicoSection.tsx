import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const profiles = [
  { emoji: "🎮", label: "Gamers", desc: "Jogadores casuais e competitivos" },
  { emoji: "🎵", label: "Fãs de K-Pop", desc: "Comunidade de dance cover e fans" },
  { emoji: "💻", label: "Tech Enthusiasts", desc: "Entusiastas de tecnologia e inovação" },
  { emoji: "🎨", label: "Artistas", desc: "Ilustradores, cosplayers e criadores" },
  { emoji: "📦", label: "Colecionadores", desc: "Figuras, cards e itens exclusivos" },
  { emoji: "🎓", label: "Estudantes", desc: "Jovens universitários e do ensino médio" },
];

const PublicoSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="publico" className="relative py-24 px-4 grid-bg">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <h2 className={`font-display text-3xl md:text-5xl font-bold text-center mb-4 text-glow-pink transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          PÚBLICO-ALVO
        </h2>
        <p className={`text-center text-muted-foreground mb-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Faixa etária predominante: <span className="text-neon-green font-bold">16–35 anos</span> · Região: João Pessoa, Paraíba e Nordeste
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {profiles.map((p, i) => (
            <div
              key={p.label}
              className={`rounded-xl p-6 bg-card border border-border hover:neon-border-pink transition-all duration-500 hover:scale-105 text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <span className="text-4xl mb-3 block">{p.emoji}</span>
              <h3 className="font-display text-sm font-bold mb-1">{p.label}</h3>
              <p className="text-muted-foreground text-xs">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className={`mt-8 p-4 rounded-xl bg-card border border-border text-center transition-all duration-700 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <p className="text-muted-foreground text-sm">
            <span className="text-neon-yellow font-semibold">Comportamento:</span> Consumidores ávidos de cultura pop, tecnologia e entretenimento com alto engajamento digital
          </p>
        </div>
      </div>
    </section>
  );
};

export default PublicoSection;
