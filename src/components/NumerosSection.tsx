import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import glitchInovatec from "@/assets/glitch-inovatec.png";

const metrics = [
  { value: 3, label: "Dias de Evento", suffix: "", color: "text-neon-green", bg: "bg-neon-green" },
  { value: 6, label: "Anos do CPE", suffix: "", color: "text-comic-cyan", bg: "bg-comic-cyan" },
  { value: 18, label: "Totens do Deck Cultural", suffix: "", color: "text-neon-pink", bg: "bg-neon-pink" },
  { value: 3, label: "Eras Temáticas", suffix: "", color: "text-neon-purple", bg: "bg-neon-purple" },
];

const placeholders = [
  { label: "Público Estimado", value: "+de 10 Mil Pessoas", color: "text-neon-yellow", border: "border-neon-yellow" },
  { label: "Alcance nas Redes", value: "Em breve", color: "text-comic-cyan", border: "border-comic-cyan" },
  { label: "Influencers Confirmados", value: "Em breve", color: "text-neon-pink", border: "border-neon-pink" },
];

const MetricCard = ({ value, label, color, bg, isVisible }: { value: number; label: string; color: string; bg: string; isVisible: boolean }) => {
  const count = useCountUp(value, isVisible);
  return (
    <div className="comic-card bg-card p-6 text-center">
      <div className={`${bg} w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center`}>
        <span className="font-display text-3xl text-background">{count}</span>
      </div>
      <div className="text-muted-foreground text-xs font-display uppercase tracking-wider">{label}</div>
    </div>
  );
};

const NumerosSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="numeros" className="relative py-24 px-4 overflow-hidden halftone">
      <img src={glitchInovatec} alt="Glitch" className="absolute top-12 right-4 w-32 md:w-48 opacity-30 pointer-events-none hidden md:block" />

      <div className="absolute top-20 left-10 w-12 h-12 bg-neon-green starburst opacity-40 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-6xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center mb-16 text-neon-green text-glow-green transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          NÚMEROS E IMPACTO 💪
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map(m => (
            <MetricCard key={m.label} {...m} isVisible={isVisible} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {placeholders.map(p => (
            <div key={p.label} className={`comic-card bg-card text-center p-6 border-l-[6px] ${p.border}`}>
              <div className={`font-display text-xl md:text-2xl ${p.color} mb-2`}>{p.value}</div>
              <div className="text-muted-foreground text-xs font-display uppercase tracking-wider">{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumerosSection;
