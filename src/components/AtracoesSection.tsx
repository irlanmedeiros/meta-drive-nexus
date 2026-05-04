import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import logoMetaverso from "@/assets/logo-metaverso.png";

type Atracao = {
  emoji: string;
  name: string;
  desc: string;
  color: string; // hsl var name
};

const atracoes: Atracao[] = [
  { emoji: "🏆", name: "CPE", desc: "Campeonato Pessoense de E-Sports a 6 anos fazendo história", color: "var(--neon-yellow)" },
  { emoji: "🎵", name: "K-Pop", desc: "Performances e batalhas de dança e cover", color: "var(--neon-pink)" },
  { emoji: "🕹️", name: "Arena Freeplay", desc: "Games clássicos e atuais em modo livre", color: "var(--comic-cyan)" },
  { emoji: "🃏", name: "Card Games", desc: "Torneios de TCG, Magic, Pokémon e Yu-Gi-Oh!", color: "var(--neon-purple)" },
  { emoji: "🥽", name: "Laser Tag + VR", desc: "Ativações imersivas de realidade virtual e combate", color: "var(--neon-green)" },
  { emoji: "🎤", name: "Shows", desc: "Apresentações ao vivo no palco principal", color: "var(--neon-pink)" },
  { emoji: "🎨", name: "Artist Alley", desc: "Espaço para artistas independentes exporem e venderem", color: "var(--neon-yellow)" },
  { emoji: "🛍️", name: "Lojinhas", desc: "Produtos geek, colecionáveis e itens exclusivos", color: "var(--comic-orange)" },
  { emoji: "🍔", name: "Alimentação", desc: "Food trucks e opções gastronômicas temáticas", color: "var(--comic-cyan)" },
  { emoji: "📱", name: "Influencers", desc: "Encontro com criadores de conteúdo do universo geek", color: "var(--neon-purple)" },
  { emoji: "🏛️", name: "Deck Cultural", desc: "18 totens históricos da Paraíba em linguagem de HQ e Games", color: "var(--neon-green)" },
];

const CX = 500;
const CY = 500;
const R = 360; // raio dos nós
const NODE_R = 40;

const AtracoesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPulseIndex((p) => (p + 1) % atracoes.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // Pré-calcula posições e paths
  const nodes = atracoes.map((a, i) => {
    const angle = (i / atracoes.length) * Math.PI * 2 - Math.PI / 2;
    const x = CX + Math.cos(angle) * R;
    const y = CY + Math.sin(angle) * R;
    // ponto de controle perpendicular para curva orgânica
    const mx = (CX + x) / 2;
    const my = (CY + y) / 2;
    const dx = x - CX;
    const dy = y - CY;
    const len = Math.hypot(dx, dy) || 1;
    const perpX = -dy / len;
    const perpY = dx / len;
    const offset = (i % 2 === 0 ? 1 : -1) * 90;
    const ctrlX = mx + perpX * offset;
    const ctrlY = my + perpY * offset;
    const path = `M ${CX} ${CY} Q ${ctrlX} ${ctrlY} ${x} ${y}`;
    return { ...a, x, y, angle, path };
  });

  return (
    <section id="atracoes" className="relative py-24 px-4 overflow-hidden radial-burst-purple">
      {/* fundo grid sutil */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--comic-cyan) / 0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div ref={ref} className="relative z-10 container mx-auto max-w-7xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center mb-4 text-comic-cyan text-glow-blue transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          HUB DE ATRAÇÕES
        </h2>
        <p className={`text-center text-muted-foreground mb-10 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Conecte-se ao Metaverso. Cada nó é uma experiência — passe o mouse ou toque para acessar.
        </p>

        <div className={`relative mx-auto max-w-[860px] transition-all duration-700 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="relative aspect-square">
            <svg
              viewBox="0 0 1000 1000"
              className="w-full h-full block"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <radialGradient id="bgRadial" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="hsl(270 60% 22%)" />
                  <stop offset="60%" stopColor="hsl(260 55% 14%)" />
                  <stop offset="100%" stopColor="hsl(255 60% 6%)" />
                </radialGradient>
                <radialGradient id="coreRing" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--comic-cyan))" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="hsl(var(--neon-purple))" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="hsl(var(--neon-purple))" stopOpacity="0" />
                </radialGradient>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="10" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* fundo circular */}
              <circle cx={CX} cy={CY} r="490" fill="url(#bgRadial)" />

              {/* anéis decorativos rotativos */}
              <g className="ring-rotate-slow" style={{ transformOrigin: "500px 500px" }}>
                <circle cx={CX} cy={CY} r={R + 40} fill="none" stroke="hsl(var(--comic-cyan) / 0.15)" strokeWidth="1" strokeDasharray="2 14" />
              </g>
              <g className="ring-rotate-rev" style={{ transformOrigin: "500px 500px" }}>
                <circle cx={CX} cy={CY} r={R - 40} fill="none" stroke="hsl(var(--neon-purple) / 0.18)" strokeWidth="1" strokeDasharray="6 10" />
              </g>

              {/* conexões */}
              {nodes.map((n, i) => {
                const isHot = pulseIndex === i || hover === i || active === i;
                return (
                  <g key={`conn-${i}`}>
                    <path
                      d={n.path}
                      fill="none"
                      stroke={isHot ? `hsl(${n.color})` : `hsl(${n.color} / 0.18)`}
                      strokeWidth={isHot ? 2.5 : 1.2}
                      strokeLinecap="round"
                      style={{ transition: "all 0.4s ease", filter: isHot ? "url(#softGlow)" : undefined }}
                    />
                    {/* partícula de energia */}
                    <circle
                      r={isHot ? 7 : 4}
                      fill={`hsl(${n.color})`}
                      opacity={isHot ? 1 : 0.6}
                      filter="url(#softGlow)"
                    >
                      <animateMotion
                        dur={isHot ? "1.2s" : "3.4s"}
                        repeatCount="indefinite"
                        path={n.path}
                        keyPoints="1;0"
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* núcleo central com logo */}
              <g style={{ transformOrigin: "500px 500px" }} className="core-breathe">
                <circle cx={CX} cy={CY} r="160" fill="url(#coreRing)" opacity="0.55" />
                <circle cx={CX} cy={CY} r="115" fill="hsl(255 60% 8%)" stroke="hsl(var(--comic-cyan))" strokeWidth="2" filter="url(#softGlow)" />
                <circle cx={CX} cy={CY} r="125" fill="none" stroke="hsl(var(--neon-purple) / 0.6)" strokeWidth="1" strokeDasharray="4 6" />
                <image
                  href={logoMetaverso}
                  x={CX - 95}
                  y={CY - 95}
                  width="190"
                  height="190"
                  style={{ filter: "drop-shadow(0 0 12px hsl(var(--comic-cyan) / 0.6))" }}
                />
              </g>

              {/* nós */}
              {nodes.map((n, i) => {
                const isActive = active === i || hover === i;
                const isHot = pulseIndex === i || isActive;
                return (
                  <g
                    key={`node-${i}`}
                    transform={`translate(${n.x}, ${n.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setActive(active === i ? null : i)}
                  >
                    {/* halo */}
                    <circle
                      r={isHot ? 60 : 48}
                      fill={`hsl(${n.color} / 0.18)`}
                      style={{ transition: "all 0.3s ease" }}
                    />
                    {isActive && (
                      <circle r="55" fill="none" stroke={`hsl(${n.color})`} strokeWidth="2" opacity="0.7">
                        <animate attributeName="r" values="50;72;50" dur="1.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* corpo */}
                    <circle
                      r={isActive ? NODE_R + 4 : NODE_R}
                      fill="hsl(255 60% 10%)"
                      stroke={`hsl(${n.color})`}
                      strokeWidth={isHot ? 3 : 2}
                      filter={isHot ? "url(#strongGlow)" : "url(#softGlow)"}
                      style={{ transition: "all 0.25s ease" }}
                    />
                    <circle r={NODE_R - 8} fill={`hsl(${n.color} / 0.12)`} />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="32"
                      style={{ userSelect: "none" }}
                    >
                      {n.emoji}
                    </text>
                    {/* label */}
                    <g transform="translate(0, 70)">
                      <rect
                        x="-78" y="-16" width="156" height="28" rx="14"
                        fill="hsl(255 60% 6% / 0.92)"
                        stroke={`hsl(${n.color} / 0.7)`}
                        strokeWidth="1.5"
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        y="-1"
                        fill={`hsl(${n.color})`}
                        fontFamily="SuperbusyActivity, Bangers, cursive"
                        fontSize="16"
                        letterSpacing="1"
                      >
                        {n.name.toUpperCase()}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* card detalhes ancorado */}
              {active !== null && (() => {
                const a = nodes[active];
                const cardW = 360;
                const cardH = 140;
                // posicionar para fora do círculo: na direção do nó a partir do centro
                const dirX = (a.x - CX) / R;
                const dirY = (a.y - CY) / R;
                let cardX = a.x + dirX * 80 - cardW / 2;
                let cardY = a.y + dirY * 80 - cardH / 2;
                if (cardX < 10) cardX = 10;
                if (cardX + cardW > 990) cardX = 990 - cardW;
                if (cardY < 10) cardY = 10;
                if (cardY + cardH > 990) cardY = 990 - cardH;
                return (
                  <g key={`detail-${active}`} className="animate-comic-pop" style={{ transformOrigin: `${a.x}px ${a.y}px` }}>
                    <foreignObject x={cardX} y={cardY} width={cardW} height={cardH}>
                      <div
                        className="h-full p-4 flex items-start gap-3 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, hsl(255 60% 10% / 0.96), hsl(270 60% 14% / 0.96))",
                          border: `2px solid hsl(${a.color})`,
                          boxShadow: `0 0 24px hsl(${a.color} / 0.5), inset 0 0 20px hsl(${a.color} / 0.1)`,
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <div
                          className="text-3xl shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-2"
                          style={{ borderColor: `hsl(${a.color})`, background: `hsl(${a.color} / 0.15)` }}
                        >
                          {a.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-lg mb-1 leading-tight" style={{ color: `hsl(${a.color})` }}>
                            {a.name.toUpperCase()}
                          </h3>
                          <p className="text-foreground/80 text-xs leading-snug">{a.desc}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setActive(null); }}
                          className="font-display text-base text-muted-foreground hover:text-foreground transition-colors shrink-0 leading-none"
                          aria-label="Fechar"
                        >
                          ✕
                        </button>
                      </div>
                    </foreignObject>
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {active === null && (
          <p className="mt-6 text-center text-muted-foreground text-sm font-display tracking-wide">
            ⚡ TOQUE EM UM NÓ PARA ACESSAR A ATRAÇÃO
          </p>
        )}
      </div>

      <style>{`
        @keyframes coreBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .core-breathe { animation: coreBreathe 4s ease-in-out infinite; transform-box: fill-box; }
        @keyframes ringSpin { to { transform: rotate(360deg); } }
        @keyframes ringSpinRev { to { transform: rotate(-360deg); } }
        .ring-rotate-slow { animation: ringSpin 80s linear infinite; transform-box: fill-box; }
        .ring-rotate-rev { animation: ringSpinRev 60s linear infinite; transform-box: fill-box; }
      `}</style>
    </section>
  );
};

export default AtracoesSection;
