import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import decoWave from "@/assets/deco-wave.png";
import glitchNeutro from "@/assets/glitch-neutro.png";

const eras = [
  { emoji: "🏰", name: "Era Medieval", desc: "Card Games, universos de fantasia e RPG", color: "from-amber-800 to-yellow-600", border: "border-yellow-600", glow: "0 0 20px rgba(202,138,4,0.4)" },
  { emoji: "🎵", name: "Era do Presente", desc: "K-Pop, Shows, Influencers, Cultura Pop e tudo que é tendência", color: "from-neon-pink to-neon-blue", border: "border-neon-pink", glow: "0 0 20px rgba(224,64,160,0.4)" },
  { emoji: "🚀", name: "Era do Futuro", desc: "E-Sports, VR, Laser Tag, tecnologia e inovação além da realidade", color: "from-neon-green to-neon-purple", border: "border-neon-green", glow: "0 0 20px rgba(168,212,32,0.4)" },
];

const EventoSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="evento" className="relative py-24 px-4 overflow-hidden">
      <img src={decoWave} alt="" className="absolute bottom-0 left-0 w-64 opacity-10 pointer-events-none" />
      <img src={glitchNeutro} alt="Glitch" className="absolute top-8 right-4 w-24 md:w-36 opacity-30 pointer-events-none hidden md:block" />
      <div ref={ref} className="container mx-auto max-w-6xl">
        <h2 className={`font-display text-3xl md:text-5xl font-bold text-center mb-4 text-glow-purple transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          O EVENTO
        </h2>
        <p className={`text-center text-muted-foreground max-w-3xl mx-auto mb-16 text-base md:text-lg leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Festival geek multitemático que une competição, cultura pop, tecnologia e entretenimento em um único espaço. Segunda edição com potencial de se tornar o <span className="text-neon-green font-semibold">maior evento geek da Paraíba e do Nordeste</span>.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {eras.map((era, i) => (
            <div
              key={era.name}
              className={`group relative rounded-xl p-6 bg-card border ${era.border} transition-all duration-500 hover:scale-105 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + i * 150}ms`, boxShadow: isVisible ? era.glow : "none" }}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${era.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10">
                <span className="text-5xl mb-4 block">{era.emoji}</span>
                <h3 className="font-display text-xl font-bold mb-2">{era.name}</h3>
                <p className="text-muted-foreground text-sm">{era.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventoSection;
