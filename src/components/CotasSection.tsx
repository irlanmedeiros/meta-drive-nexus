import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import glitchSentado from "@/assets/glitch-sentado.png";

const cotas = [
  {
    tier: "APOIO",
    emoji: "🤝",
    color: "border-slate-500",
    glowClass: "hover:shadow-[0_0_30px_rgba(100,116,139,0.5)]",
    textColor: "text-slate-400",
    bgGradient: "from-slate-800/20 to-slate-700/10",
    price: "R$ 5.000",
    benefits: [
      "Logo em lista de apoiadores no site e materiais",
      "Menção em 1 post coletivo nas redes",
      "Reconhecimento verbal em abertura/fechamento",
      'Direito de uso do selo "Apoio Oficial"',
    ],
  },
  {
    tier: "BRONZE",
    emoji: "🥉",
    color: "border-amber-700",
    glowClass: "hover:shadow-[0_0_30px_rgba(180,83,9,0.5)]",
    textColor: "text-amber-500",
    bgGradient: "from-amber-900/20 to-amber-800/10",
    price: "R$ 17.000",
    benefits: [
      "Logo em materiais de divulgação e rodapé de posts",
      "Espaço em área de expositores (5m²)",
      "Menções em 3 posts redes + stories",
      "Distribuição de brindes/sampling",
      "Logo no site oficial",
      "QR hunts: Caça ao tesouro digital com brindes e dados de participantes",
    ],
  },
  {
    tier: "PRATA",
    emoji: "🥈",
    color: "border-slate-400",
    glowClass: "hover:shadow-[0_0_30px_rgba(148,163,184,0.5)]",
    textColor: "text-slate-300",
    bgGradient: "from-slate-700/20 to-slate-600/10",
    price: "R$ 32.000",
    benefits: [
      "Logo em banners do evento e materiais de divulgação",
      "Stand compartilhado (10m²) com espaço para produto",
      "Menções em 5 posts redes + tag em stories",
      "Acesso a área VIP + sampling gratuito",
      "Logo no site e programa do evento",
      'Concursos: "Melhor cosplay patrocinado" ou "dance cover K-Pop" com shoutout ao vivo',
    ],
  },
  {
    tier: "OURO",
    emoji: "🥇",
    color: "border-neon-pink",
    glowClass: "hover:shadow-[0_0_30px_rgba(224,64,160,0.5)]",
    textColor: "text-neon-pink",
    bgGradient: "from-pink-900/20 to-purple-900/10",
    price: "R$ 45.000",
    benefits: [
      "Logo em banners principais, palco e materiais digitais",
      "Stand dedicado (15m²) com ativação de marca",
      "Menções em 7 posts redes + shoutout em shows/E-Sports",
      "Espaço VIP + acesso a influencers para conteúdo",
      "Logo em teasers/vídeos promocionais",
      "Ativação em E-Sports (shoutout + banner na arena)",
      "Gamificação com app: 3 desafios AR exclusivos para leads",
      "Relatório parcial de visibilidade",
    ],
  },
  {
    tier: "MASTER",
    subtitle: "NAMING RIGHTS",
    emoji: "💎",
    color: "border-neon-green",
    glowClass: "hover:shadow-[0_0_40px_rgba(168,212,32,0.6)]",
    textColor: "text-neon-green",
    bgGradient: "from-green-900/20 to-emerald-900/10",
    price: "R$ 80.000",
    featured: true,
    benefits: [
      'Naming rights de atração principal (ex: "Meta Drive Naming Arena")',
      "Logo em TODOS materiais (banners, palco, totens, site)",
      "Stand premium (20m²) com ativação exclusiva",
      "Presença no press day + 10 posts dedicados nas redes",
      "Espaço VIP exclusivo + co-branding em aftermovie/teasers",
      "Filtro AR/efeito IG com marca + live com influencers",
      "Dados exclusivos de leads (e-mails de visitantes)",
      "Campanha co-branded no IG (Reels, 20k+ alcance estimado)",
      "Ativação em E-Sports (shoutout + banner na arena)",
      "Gamificação com app: Desafios AR, QR para pontos e prêmios exclusivos",
      "Parceria com 5 creators (50k+ followers) para lives + takeover IG",
      "Distribuição de 500 brindes customizados",
      "10 ingressos VIP",
      "Logo em mapa do evento (app/site)",
      "Relatório pós-evento com métricas completas",
    ],
  },
];

const CotasSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="cotas" className="relative py-24 px-4 overflow-hidden">
      <img src={glitchSentado} alt="Glitch" className="absolute bottom-8 left-4 w-32 md:w-48 opacity-20 pointer-events-none hidden md:block" />
      <div ref={ref} className="container mx-auto max-w-7xl">
        <h2 className={`font-display text-3xl md:text-5xl font-bold text-center mb-4 text-glow-purple transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          COTAS DE PATROCÍNIO
        </h2>
        <p className={`text-center text-muted-foreground mb-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Escolha sua cota e entre neste universo
        </p>

        {/* Top row: Apoio, Bronze, Prata, Ouro */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cotas.filter(c => !c.featured).map((c, i) => (
            <div
              key={c.tier}
              className={`relative rounded-xl p-6 bg-card border-2 ${c.color} ${c.glowClass} transition-all duration-500 hover:scale-105 flex flex-col ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${c.bgGradient} pointer-events-none`} />
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-center mb-4">
                  <span className="text-4xl">{c.emoji}</span>
                  <h3 className={`font-display text-lg font-black ${c.textColor} mt-2`}>{c.tier}</h3>
                </div>

                <div className={`font-display text-xl font-bold ${c.textColor} text-center mb-4 py-2 border-t border-b border-border`}>
                  {c.price}
                </div>

                <ul className="space-y-2 flex-1">
                  {c.benefits.map(b => (
                    <li key={b} className="text-xs text-muted-foreground flex gap-2">
                      <span className={`${c.textColor} shrink-0`}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <a href="#contato" className={`mt-6 block text-center font-display text-xs font-bold uppercase py-3 rounded-lg border ${c.color} ${c.textColor} hover:bg-foreground/5 transition-colors`}>
                  Quero essa cota
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Featured: Master */}
        {cotas.filter(c => c.featured).map((c) => (
          <div
            key={c.tier}
            className={`relative rounded-xl p-8 md:p-10 bg-card border-2 ${c.color} ${c.glowClass} transition-all duration-700 hover:scale-[1.02] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "900ms" }}
          >
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${c.bgGradient} pointer-events-none`} />
            <div className="relative z-10">
              <div className="text-center mb-6">
                <span className="text-5xl">{c.emoji}</span>
                <h3 className={`font-display text-2xl md:text-3xl font-black ${c.textColor} mt-2`}>{c.tier}</h3>
                {c.subtitle && <p className="text-muted-foreground text-sm font-display mt-1">{c.subtitle}</p>}
                <div className={`font-display text-2xl md:text-3xl font-bold ${c.textColor} mt-4`}>
                  {c.price}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-x-8 gap-y-2 mb-8">
                {c.benefits.map(b => (
                  <div key={b} className="text-sm text-muted-foreground flex gap-2 py-1">
                    <span className={`${c.textColor} shrink-0`}>✓</span>
                    {b}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a href="#contato" className={`inline-block font-display text-sm font-bold uppercase px-10 py-4 rounded-lg bg-gradient-to-r from-neon-green to-neon-blue text-background tracking-widest transition-all hover:scale-105 box-glow-green`}>
                  Quero a cota Master
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CotasSection;
