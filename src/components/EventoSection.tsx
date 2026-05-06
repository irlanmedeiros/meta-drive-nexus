import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import decoWave from "@/assets/deco-wave.png";
import medievalBg from "@/assets/MEDIEVAL1.svg";
import Particles from "./Particles";
import presenteBg from "@/assets/PRESENTE1.svg";
import futuroBg from "@/assets/FUTURO1.svg";

const eras = [
  { name: "Era Medieval", desc: "Card Games, universos de fantasia, RPG e senografia imersiva", color: "bg-neon-yellow", borderColor: "border-neon-yellow", textHead: "text-background" },
  { name: "Era do Presente", desc: "K-Pop, Shows, Influencers, Cultura Pop e tudo que é tendência", color: "bg-neon-pink", borderColor: "border-neon-pink", textHead: "text-foreground" },
  { name: "Era do Futuro", desc: "E-Sports, VR, Laser Tag, tecnologia e inovação além da realidade", color: "bg-comic-cyan", borderColor: "border-comic-cyan", textHead: "text-background" },
];

const eraBgs = [medievalBg, presenteBg, futuroBg];

const EventoSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="evento" className="relative py-16 md:py-24 px-4 overflow-hidden radial-burst-purple">
      <Particles />
      <div className="absolute inset-0 halftone pointer-events-none" />
      <img src={decoWave} alt="" className="absolute bottom-0 left-0 w-64 opacity-15 pointer-events-none" />

      {/* Comic starburst */}
      <div className="absolute top-16 left-8 w-16 h-16 bg-neon-yellow starburst opacity-50 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-6xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center mb-4 text-neon-yellow text-glow-yellow transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          O EVENTO
        </h2>
        <p className={`text-center text-muted-foreground max-w-3xl mx-auto mb-16 text-base md:text-lg leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Festival de Entretenimento e Cultura Digital que une competição, cultura pop e tecnologia em um único espaço. Segunda edição com potencial de se tornar o <span className="text-neon-green font-semibold">maior festival de Entretenimento e Cultura Digital do Nordeste</span>.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {eras.map((era, i) => (
            <div
              key={era.name}
              className={`group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              {/* Header with background image (name centered at bottom) */}
              <div className="relative border-b-3 border-black overflow-hidden">
                <div
                  className="w-full h-40 md:h-48 lg:h-56 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${eraBgs[i]})` }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-4">
                  <h3 className={`font-display text-2xl ${era.textHead} text-center`}>{era.name}</h3>
                </div>
              </div>
              <div className="bg-card p-6 halftone-dense transition-colors duration-300 group-hover:bg-card/90">
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
