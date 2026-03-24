import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import glitchInovatec from "@/assets/glitch-inovatec.png";

const metrics = [
  { value: 3, label: "Dias de Evento", suffix: "", color: "text-neon-green" },
  { value: 6, label: "Anos do CPE", suffix: "", color: "text-neon-blue" },
  { value: 18, label: "Totens do Deck Cultural", suffix: "", color: "text-neon-pink" },
  { value: 3, label: "Eras Temáticas", suffix: "", color: "text-neon-purple" },
];

const placeholders = [
  { label: "Público Estimado", value: "+de 10 Mil Pessoas", color: "text-neon-green" },
  { label: "Alcance nas Redes", value: "Em breve", color: "text-neon-blue" },
  { label: "Influencers Confirmados", value: "Em breve", color: "text-neon-pink" },
];

const MetricCard = ({ value, label, color, isVisible }: { value: number; label: string; color: string; isVisible: boolean }) => {
  const count = useCountUp(value, isVisible);
  return (
    <div className="text-center p-6 rounded-xl bg-card border border-border hover:neon-border-purple transition-all duration-300">
      <div className={`font-display text-4xl md:text-6xl font-black ${color} mb-2`}>{count}</div>
      <div className="text-muted-foreground text-sm font-display uppercase tracking-wider">{label}</div>
    </div>
  );
};

const NumerosSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="numeros" className="relative py-24 px-4">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <h2 className={`font-display text-3xl md:text-5xl font-bold text-center mb-16 text-glow-green transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          NÚMEROS E IMPACTO
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map(m => (
            <MetricCard key={m.label} {...m} isVisible={isVisible} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {placeholders.map(p => (
            <div key={p.label} className="text-center p-6 rounded-xl bg-card border border-border border-dashed">
              <div className={`font-display text-2xl md:text-3xl font-bold ${p.color} mb-2`}>{p.value}</div>
              <div className="text-muted-foreground text-sm font-display uppercase tracking-wider">{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumerosSection;
