import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import glitchCpe from "@/assets/glitch-cpe.png";

type Atracao = {
  emoji: string;
  name: string;
  desc: string;
  color: string; // hsl var name
  // posição percentual no viewBox 1600x900
  x: number;
  y: number;
};

const atracoes: Atracao[] = [
  { emoji: "🏆", name: "CPE", desc: "Campeonato Pessoense de E-Sports a 6 anos fazendo história", color: "var(--neon-yellow)", x: 110, y: 540 },
  { emoji: "🎵", name: "K-Pop", desc: "Performances e batalhas de dança e cover", color: "var(--neon-pink)", x: 260, y: 280 },
  { emoji: "🕹️", name: "Arena Freeplay", desc: "Games clássicos e atuais em modo livre", color: "var(--comic-cyan)", x: 440, y: 600 },
  { emoji: "🃏", name: "Card Games", desc: "Torneios de TCG, Magic, Pokémon e Yu-Gi-Oh!", color: "var(--neon-purple)", x: 600, y: 320 },
  { emoji: "🥽", name: "Laser Tag + VR", desc: "Ativações imersivas de realidade virtual e combate", color: "var(--neon-green)", x: 780, y: 580 },
  { emoji: "🎤", name: "Shows", desc: "Apresentações ao vivo no palco principal", color: "var(--neon-pink)", x: 940, y: 260 },
  { emoji: "🎨", name: "Artist Alley", desc: "Espaço para artistas independentes exporem e venderem", color: "var(--neon-yellow)", x: 1100, y: 540 },
  { emoji: "🛍️", name: "Lojinhas", desc: "Produtos geek, colecionáveis e itens exclusivos", color: "var(--comic-orange)", x: 1260, y: 280 },
  { emoji: "🍔", name: "Alimentação", desc: "Food trucks e opções gastronômicas temáticas", color: "var(--comic-cyan)", x: 1380, y: 580 },
  { emoji: "📱", name: "Influencers", desc: "Encontro com criadores de conteúdo do universo geek", color: "var(--neon-purple)", x: 1500, y: 340 },
  { emoji: "🏛️", name: "Deck Cultural", desc: "18 totens históricos da Paraíba em linguagem de HQ e Games", color: "var(--neon-green)", x: 1500, y: 720 },
];

// Constrói path suave passando por todos os pontos (curva Catmull-Rom -> Bezier)
const buildSmoothPath = (pts: { x: number; y: number }[]) => {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const t = 0.18;
    const cp1x = p1.x + (p2.x - p0.x) * t;
    const cp1y = p1.y + (p2.y - p0.y) * t;
    const cp2x = p2.x - (p3.x - p1.x) * t;
    const cp2y = p2.y - (p3.y - p1.y) * t;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
};

const AtracoesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const path = buildSmoothPath(atracoes);

  return (
    <section id="atracoes" className="relative py-24 px-4 overflow-hidden radial-burst-purple">
      <img src={glitchCpe} alt="" className="absolute bottom-8 left-4 w-32 md:w-48 opacity-20 pointer-events-none hidden md:block" />
      <div className="absolute top-20 right-10 w-14 h-14 bg-neon-pink starburst opacity-40 hidden md:block" />
      <div className="absolute bottom-20 right-20 w-10 h-10 bg-neon-yellow starburst opacity-30 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-7xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center mb-4 text-comic-cyan text-glow-blue transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          MAPA DE ATRAÇÕES
        </h2>
        <p className={`text-center text-muted-foreground mb-10 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Explore cada estação do Metaverso, passe o mouse ou toque para descobrir as atrações.
        </p>

        {/* Mapa */}
        <div className={`relative rounded-3xl overflow-hidden border-[3px] border-black shadow-[8px_8px_0_hsl(0_0%_0%)] transition-all duration-700 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {/* Wrapper com scroll horizontal no mobile */}
          <div className="overflow-x-auto overflow-y-hidden scrollbar-thin">
            <div className="min-w-[900px] md:min-w-0 w-full">
              <svg
                viewBox="0 0 1600 900"
                className="w-full h-auto block"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Terreno: grama com toque roxo */}
                  <radialGradient id="terrain" cx="50%" cy="50%" r="75%">
                    <stop offset="0%" stopColor="hsl(270 45% 28%)" />
                    <stop offset="60%" stopColor="hsl(270 45% 20%)" />
                    <stop offset="100%" stopColor="hsl(270 50% 12%)" />
                  </radialGradient>
                  {/* Areia/borda do caminho */}
                  <linearGradient id="pathSand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(48 100% 65%)" />
                    <stop offset="100%" stopColor="hsl(25 95% 50%)" />
                  </linearGradient>
                  {/* Trilha interna */}
                  <linearGradient id="pathInner" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(48 100% 80%)" />
                    <stop offset="100%" stopColor="hsl(48 100% 60%)" />
                  </linearGradient>
                  {/* Água */}
                  <radialGradient id="water" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(185 75% 65%)" />
                    <stop offset="100%" stopColor="hsl(200 80% 40%)" />
                  </radialGradient>
                  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
                    <feOffset dx="0" dy="6" result="offsetblur" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Caminho - sombra */}
                <path d={path} fill="none" stroke="hsl(0 0% 0% / 0.45)" strokeWidth="60" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,8)" />
                {/* Caminho - areia (borda) */}
                <path d={path} fill="none" stroke="url(#pathSand)" strokeWidth="54" strokeLinecap="round" strokeLinejoin="round" />
                {/* Caminho - trilha interna */}
                <path d={path} fill="none" stroke="url(#pathInner)" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                {/* Linha tracejada animada */}
                <path
                  d={path}
                  fill="none"
                  stroke="hsl(0 0% 100% / 0.85)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="2 18"
                  className="path-dash"
                />

                {/* Bolinha animada percorrendo o caminho */}
                <circle r="10" fill="hsl(48 100% 65%)" stroke="hsl(0 0% 0%)" strokeWidth="2" filter="url(#nodeGlow)">
                  <animateMotion dur="14s" repeatCount="indefinite" path={path} rotate="auto" />
                </circle>

                {/* Nodos / estações */}
                {atracoes.map((a, i) => {
                  const isThisActive = active === i;
                  // posição do card relativa ao nodo
                  const cardW = 380;
                  const cardH = 150;
                  const placeAbove = a.y > 640;
                  let cardX = a.x - cardW / 2;
                  if (cardX < 12) cardX = 12;
                  if (cardX + cardW > 1588) cardX = 1588 - cardW;
                  const cardY = placeAbove ? a.y - 60 - cardH - 18 : a.y + 60 + 18;
                  const arrowY = placeAbove ? a.y - 60 - 18 : a.y + 60;
                  const arrowDir = placeAbove ? 1 : -1;
                  const isActive = active === i || hover === i;
                  return (
                    <g
                      key={a.name}
                      transform={`translate(${a.x}, ${a.y})`}
                      className="cursor-pointer"
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setActive(active === i ? null : i)}
                    >
                      {/* sombra base */}
                      <ellipse cx="0" cy="48" rx="44" ry="10" fill="hsl(0 0% 0% / 0.55)" />
                      {/* anel pulsante quando ativo */}
                      {isActive && (
                        <circle r="50" fill="none" stroke={`hsl(${a.color})`} strokeWidth="3" opacity="0.7">
                          <animate attributeName="r" values="46;58;46" dur="1.6s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.6s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {/* círculo principal */}
                      <circle
                        r={isActive ? 44 : 38}
                        fill={`hsl(${a.color})`}
                        stroke="hsl(0 0% 0%)"
                        strokeWidth="4"
                        filter={isActive ? "url(#nodeGlow)" : undefined}
                        style={{ transition: "all 0.25s ease" }}
                      />
                      {/* anel interno */}
                      <circle r="30" fill="hsl(0 0% 100% / 0.15)" />
                      {/* emoji */}
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="34"
                        style={{ userSelect: "none" }}
                      >
                        {a.emoji}
                      </text>
                      {/* label abaixo */}
                      <g transform="translate(0, 78)">
                        <rect
                          x="-72" y="-18" width="144" height="32" rx="16"
                          fill="hsl(270 40% 10% / 0.92)"
                          stroke="hsl(0 0% 0%)"
                          strokeWidth="2"
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          y="-1"
                          fill="hsl(0 0% 100%)"
                          fontFamily="SuperbusyActivity, Bangers, cursive"
                          fontSize="18"
                          letterSpacing="1"
                        >
                          {a.name.toUpperCase()}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Legenda mobile */}
          <div className="md:hidden text-center text-xs text-muted-foreground py-2 bg-card/60">
            ← Arraste para explorar o mapa →
          </div>
        </div>

        {/* Card de detalhe da atração ativa */}
        <div className="mt-6 min-h-[110px]">
          {active !== null ? (
            <div
              key={active}
              className="comic-card bg-card p-5 max-w-2xl mx-auto flex items-start gap-4 animate-comic-pop"
              style={{ borderLeft: `8px solid hsl(${atracoes[active].color})` }}
            >
              <div
                className="text-4xl shrink-0 w-16 h-16 rounded-full flex items-center justify-center border-[3px] border-black"
                style={{ background: `hsl(${atracoes[active].color})` }}
              >
                {atracoes[active].emoji}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl mb-1" style={{ color: `hsl(${atracoes[active].color})` }}>
                  {atracoes[active].name.toUpperCase()}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{atracoes[active].desc}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="font-display text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm font-display tracking-wide">
              👆 TOQUE EM UMA ESTAÇÃO PARA VER OS DETALHES
            </p>
          )}
        </div>
      </div>

      <style>{`
        .path-dash {
          stroke-dashoffset: 0;
          animation: pathFlow 1.2s linear infinite;
        }
        @keyframes pathFlow {
          to { stroke-dashoffset: -20; }
        }
        .scrollbar-thin::-webkit-scrollbar { height: 6px; }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: hsl(var(--neon-purple));
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
};

export default AtracoesSection;
