import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import glitchVilanesco from "@/assets/glitch-vilanesco.png";

const reasons = [
  { emoji: "📍", title: "Mercado em Expansão", desc: "A cena geek nordestina cresce rapidamente, com público ávido e mercado ainda pouco explorado por grandes marcas." },
  { emoji: "🎯", title: "Público Segmentado", desc: "Alcance um público altamente engajado, jovem e conectado, com alto poder de influência digital." },
  { emoji: "📸", title: "Geração de Conteúdo", desc: "Alto potencial de mídia espontânea, UGC e viralização nas redes sociais durante e após o evento." },
  { emoji: "🤝", title: "Evento Pioneiro", desc: "Associe sua marca a um evento referência regional, com DNA de inovação e cultura pop nordestina." },
];

const PorQueSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="porque" className="relative py-24 px-4 grid-bg">
      <div ref={ref} className="container mx-auto max-w-5xl">
        <h2 className={`font-display text-3xl md:text-5xl font-bold text-center mb-16 text-glow-green transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          POR QUE PATROCINAR?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`rounded-xl p-8 bg-card border border-border hover:neon-border-green transition-all duration-500 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <span className="text-5xl mb-4 block">{r.emoji}</span>
              <h3 className="font-display text-lg font-bold mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PorQueSection;
