import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Camera, Handshake, MapPin, Target, type LucideIcon } from "lucide-react";

const reasons = [
  { icon: MapPin, title: "Mercado em Expansão", desc: "A cena geek nordestina cresce rapidamente, com público ávido e mercado ainda pouco explorado por grandes marcas.", accent: "border-neon-yellow", color: "text-neon-yellow" },
  { icon: Target, title: "Público Segmentado", desc: "Alcance um público altamente engajado, jovem e conectado, com alto poder de influência digital.", accent: "border-neon-pink", color: "text-neon-pink" },
  { icon: Camera, title: "Geração de Conteúdo", desc: "Alto potencial de mídia espontânea, UGC e viralização nas redes sociais durante e após o evento.", accent: "border-comic-cyan", color: "text-comic-cyan" },
  { icon: Handshake, title: "Evento Pioneiro", desc: "Associe sua marca a um evento referência regional, com DNA de inovação e cultura pop nordestina.", accent: "border-neon-green", color: "text-neon-green" },
] as Array<{ icon: LucideIcon; title: string; desc: string; accent: string; color: string }>;

const PorQueSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="porque" className="relative py-24 px-4 overflow-hidden radial-burst-purple">
      <div className="absolute inset-0 halftone pointer-events-none" />

      <div className="absolute top-20 right-10 w-14 h-14 bg-neon-green starburst opacity-40 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-5xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center mb-16 text-neon-green text-glow-green transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          POR QUE PATROCINAR?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`comic-card bg-card p-8 border-l-[8px] ${r.accent} transition-all duration-500 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <r.icon className={`w-12 h-12 mb-4 ${r.color}`} aria-hidden="true" />
              <h3 className="font-display text-xl mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PorQueSection;
