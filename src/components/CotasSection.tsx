import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import glitchSentado from "@/assets/glitch-sentado.png";

const cotas = [
  {
    tier: "COMMON",
    subtitle: "Bronze",
    emoji: "🥉",
    color: "border-amber-700",
    glowClass: "hover:shadow-[0_0_30px_rgba(180,83,9,0.5)]",
    textColor: "text-amber-500",
    benefits: [
      "Logo no material de divulgação",
      "Menções nas redes sociais",
    ],
    price: "R$ X.XXX",
  },
  {
    tier: "RARE",
    subtitle: "Prata",
    emoji: "🥈",
    color: "border-slate-400",
    glowClass: "hover:shadow-[0_0_30px_rgba(148,163,184,0.5)]",
    textColor: "text-slate-300",
    benefits: [
      "Logo no material de divulgação",
      "Logo no banner do evento",
      "Menções nas redes sociais",
      "Stand/espaço no evento",
    ],
    price: "R$ XX.XXX",
  },
  {
    tier: "EPIC",
    subtitle: "Ouro",
    emoji: "🥇",
    color: "border-neon-pink",
    glowClass: "hover:shadow-[0_0_30px_rgba(224,64,160,0.5)]",
    textColor: "text-neon-pink",
    benefits: [
      "Logo no material de divulgação",
      "Logo no banner do evento",
      "Logo no palco principal",
      "Stand/espaço no evento",
      "Menções nas redes sociais",
      "Ativação de marca no evento",
      "Espaço VIP",
    ],
    price: "R$ XX.XXX",
  },
  {
    tier: "LEGENDARY",
    subtitle: "Master",
    emoji: "💎",
    color: "border-neon-green",
    glowClass: "hover:shadow-[0_0_40px_rgba(168,212,32,0.6)]",
    textColor: "text-neon-green",
    benefits: [
      "Logo no material de divulgação",
      "Logo no banner do evento",
      "Logo no palco principal",
      "Stand/espaço premium no evento",
      "Menções nas redes sociais",
      "Ativação de marca no evento",
      "Espaço VIP exclusivo",
      "Presença no press day",
      "Ativação exclusiva com o mascote Glitch",
      "Naming rights de uma atração",
    ],
    price: "R$ XXX.XXX",
  },
];

const CotasSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="cotas" className="relative py-24 px-4 overflow-hidden">
      <img src={glitchSentado} alt="Glitch" className="absolute bottom-8 left-4 w-32 md:w-48 opacity-20 pointer-events-none hidden md:block" />
      <div ref={ref} className="container mx-auto max-w-6xl">
        <h2 className={`font-display text-3xl md:text-5xl font-bold text-center mb-4 text-glow-purple transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          COTAS DE PATROCÍNIO
        </h2>
        <p className={`text-center text-muted-foreground mb-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Escolha sua raridade e entre neste universo
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cotas.map((c, i) => (
            <div
              key={c.tier}
              className={`relative rounded-xl p-6 bg-card border-2 ${c.color} ${c.glowClass} transition-all duration-500 hover:scale-105 flex flex-col ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className="text-center mb-4">
                <span className="text-4xl">{c.emoji}</span>
                <h3 className={`font-display text-lg font-black ${c.textColor} mt-2`}>{c.tier}</h3>
                <p className="text-muted-foreground text-xs font-display">{c.subtitle}</p>
              </div>

              <div className={`font-display text-xl font-bold ${c.textColor} text-center mb-4 py-2 border-t border-b border-border`}>
                {c.price}
              </div>

              <ul className="space-y-2 flex-1">
                {c.benefits.map(b => (
                  <li key={b} className="text-xs text-muted-foreground flex gap-2">
                    <span className={c.textColor}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              <a href="#contato" className={`mt-6 block text-center font-display text-xs font-bold uppercase py-3 rounded-lg border ${c.color} ${c.textColor} hover:bg-foreground/5 transition-colors`}>
                Quero essa cota
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CotasSection;
