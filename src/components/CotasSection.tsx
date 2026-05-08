import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import glitchSentado from "@/assets/glitch-sentado.png";
import Particles from "./Particles";

const WHATSAPP_PHONE = "5583999270216";

const getWhatsAppSponsorLink = (tier: string) => {
  const message = `Quero ser um patrocinador da cota ${tier}`;
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
};

const cotas = [
  {
    tier: "APOIO",
    color: "border-t-muted-foreground",
    cardBorder: "border-muted-foreground",
    textColor: "text-muted-foreground",
    headerBg: "bg-muted",
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
    color: "border-t-comic-orange",
    cardBorder: "border-comic-orange",
    textColor: "text-comic-orange",
    headerBg: "bg-comic-orange/20",
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
    color: "border-t-comic-cyan",
    cardBorder: "border-comic-cyan",
    textColor: "text-comic-cyan",
    headerBg: "bg-comic-cyan/20",
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
    color: "border-t-neon-yellow",
    cardBorder: "border-neon-yellow",
    textColor: "text-neon-yellow",
    headerBg: "bg-neon-yellow/20",
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
    color: "border-t-neon-pink",
    cardBorder: "border-neon-pink",
    textColor: "text-neon-pink",
    headerBg: "bg-neon-pink/20",
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
    <section id="cotas" className="relative py-16 md:py-24 px-4 overflow-hidden halftone">
      <Particles />
      <img src={glitchSentado} alt="Glitch" className="absolute bottom-8 right-4 w-36 md:w-52 opacity-25 pointer-events-none hidden md:block" />

      <div className="absolute top-16 right-8 w-16 h-16 bg-neon-yellow starburst opacity-40 hidden md:block" />
      <div className="absolute bottom-32 left-20 w-12 h-12 bg-neon-pink starburst opacity-30 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-7xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center mb-4 text-neon-yellow text-glow-yellow transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
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
              className={`comic-card bg-card border-t-[8px] ${c.color} flex flex-col transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className={`${c.headerBg} px-6 py-4 text-center border-b-2 border-black/30`}>
                <h3 className={`font-display text-2xl ${c.textColor} mt-1`}>{c.tier}</h3>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className={`font-display text-2xl ${c.textColor} text-center mb-4 py-2 border-b-2 border-border`}>
                  {c.price}
                </div>

                <ul className="space-y-2 flex-1">
                  {c.benefits.map(b => (
                    <li key={b} className="text-xs text-muted-foreground flex gap-2">
                      <span className={`${c.textColor} shrink-0 font-display`}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppSponsorLink(c.tier)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 block text-center font-display text-sm uppercase py-3 comic-card ${c.headerBg} ${c.textColor} hover:brightness-125 transition-all`}
                >
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
            className={`comic-card bg-card border-t-[10px] ${c.color} transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "900ms" }}
          >
            <div className={`${c.headerBg} px-8 py-6 text-center border-b-2 border-black/30`}>
              <h3 className={`font-display text-3xl md:text-4xl ${c.textColor} mt-2`}>{c.tier}</h3>
              {c.subtitle && <p className="text-muted-foreground text-sm font-display mt-1">{c.subtitle}</p>}
              <div className={`font-display text-3xl md:text-4xl ${c.textColor} mt-4`}>
                {c.price}
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className="grid md:grid-cols-3 gap-x-8 gap-y-2 mb-8">
                {c.benefits.map(b => (
                  <div key={b} className="text-sm text-muted-foreground flex gap-2 py-1">
                    <span className={`${c.textColor} shrink-0 font-display`}>✓</span>
                    {b}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a
                  href={getWhatsAppSponsorLink(c.tier)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-display text-base sm:text-lg uppercase px-6 sm:px-10 py-3 sm:py-4 bg-neon-pink text-foreground comic-card tracking-wider sm:tracking-widest transition-all hover:scale-105"
                >
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
