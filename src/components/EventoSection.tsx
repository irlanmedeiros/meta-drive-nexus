import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import decoWave from "@/assets/deco-wave.png";

const eras = [
  { name: "Era Medieval", desc: "Card Games, universos de fantasia, RPG e senografia imersiva", color: "bg-neon-yellow", borderColor: "border-neon-yellow", textHead: "text-background" },
  { name: "Era do Presente", desc: "K-Pop, Shows, Influencers, Cultura Pop e tudo que é tendência", color: "bg-neon-pink", borderColor: "border-neon-pink", textHead: "text-foreground" },
  { name: "Era do Futuro", desc: "E-Sports, VR, Laser Tag, tecnologia e inovação além da realidade", color: "bg-comic-cyan", borderColor: "border-comic-cyan", textHead: "text-background" },
];

const EventoSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="evento" className="relative py-24 px-4 overflow-hidden radial-burst-purple">
      <div className="absolute inset-0 halftone pointer-events-none" />
      <img src={decoWave} alt="" className="absolute bottom-0 left-0 w-64 opacity-15 pointer-events-none" />

      {/* Comic starburst */}
      <div className="absolute top-16 left-8 w-16 h-16 bg-neon-yellow starburst opacity-50 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-6xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center mb-4 text-neon-yellow text-glow-yellow transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          O EVENTO
        </h2>
        <p className={`text-center text-muted-foreground max-w-3xl mx-auto mb-16 text-base md:text-lg leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Festival geek multitemático que une competição, cultura pop, tecnologia e entretenimento em um único espaço. Segunda edição com potencial de se tornar o <span className="text-neon-green font-semibold">maior evento geek da Paraíba e do Nordeste</span>.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {eras.map((era, i) => (
            <div
              key={era.name}
              className={`group relative comic-card overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              {/* Colored header strip */}
              <div className={`${era.color} px-6 py-4 border-b-3 border-black`}>
                <span className="text-4xl mb-2 block">{era.emoji}</span>
                <h3 className={`font-display text-2xl ${era.textHead}`}>{era.name}</h3>
              </div>
              <div className="bg-card p-6 halftone-dense">
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
