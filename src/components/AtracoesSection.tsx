import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import logoMetaverso from "@/assets/logo-metaverso.png";

type Atracao = {
  emoji: string;
  name: string;
  desc: string;
  color: string; // hsl values
};

const atracoes: Atracao[] = [
  { emoji: "🏆", name: "CPE", desc: "Campeonato Pessoense de E-Sports a 6 anos fazendo história", color: "48 100% 55%" },
  { emoji: "🎵", name: "K-Pop", desc: "Performances e batalhas de dança e cover", color: "330 85% 60%" },
  { emoji: "🕹️", name: "Arena Freeplay", desc: "Games clássicos e atuais em modo livre", color: "185 75% 55%" },
  { emoji: "🃏", name: "Card Games", desc: "Torneios de TCG, Magic, Pokémon e Yu-Gi-Oh!", color: "270 76% 60%" },
  { emoji: "🥽", name: "Laser Tag + VR", desc: "Ativações imersivas de realidade virtual e combate", color: "90 70% 55%" },
  { emoji: "🎤", name: "Shows", desc: "Apresentações ao vivo no palco principal", color: "330 85% 60%" },
  { emoji: "🎨", name: "Artist Alley", desc: "Espaço para artistas independentes exporem e venderem", color: "48 100% 55%" },
  { emoji: "🛍️", name: "Lojinhas", desc: "Produtos geek, colecionáveis e itens exclusivos", color: "25 95% 58%" },
  { emoji: "🍔", name: "Alimentação", desc: "Food trucks e opções gastronômicas temáticas", color: "185 75% 55%" },
  { emoji: "📱", name: "Influencers", desc: "Encontro com criadores de conteúdo do universo geek", color: "270 76% 62%" },
  { emoji: "🏛️", name: "Deck Cultural", desc: "18 totens históricos da Paraíba em linguagem de HQ e Games", color: "90 70% 55%" },
];

const CX = 500;
const CY = 500;
const R = 360;
const NODE_R = 42;
const ACCENT = "185 75% 60%";

const AtracoesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPulseIndex((p) => (p + 1) % atracoes.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const nodes = atracoes.map((a, i) => {
    const angle = (i / atracoes.length) * Math.PI * 2 - Math.PI / 2;
    const x = CX + Math.cos(angle) * R;
    const y = CY + Math.sin(angle) * R;
    const mx = (CX + x) / 2;
    const my = (CY + y) / 2;
    const dx = x - CX;
    const dy = y - CY;
    const len = Math.hypot(dx, dy) || 1;
    const perpX = -dy / len;
    const perpY = dx / len;
    const offset = (i % 2 === 0 ? 1 : -1) * 24;
    const ctrlX = mx + perpX * offset;
    const ctrlY = my + perpY * offset;
    const path = `M ${x} ${y} Q ${ctrlX} ${ctrlY} ${CX} ${CY}`;
    return { ...a, x, y, path };
  });

  return (
    <section id="atracoes" className="relative py-28 px-4 overflow-hidden radial-burst-purple">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--comic-cyan) / 0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div ref={ref} className="relative z-10 container mx-auto max-w-7xl">
        <h2
          className={`font-display text-4xl md:text-6xl text-center mb-3 text-glow-blue text-[hsl(var(--comic-cyan))] transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          MAPA DE ATRAÇÕES
        </h2>
        <p
          className={`text-center text-white/70 mb-12 max-w-xl mx-auto text-sm md:text-base font-light transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Explore cada estação do Metaverso, passe o mouse ou toque para descobrir as atrações.
        </p>

        <div
          className={`relative mx-auto max-w-[820px] transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative aspect-square">
            <svg viewBox="0 0 1000 1000" className="w-full h-full block" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* conexões coloridas */}
              {nodes.map((n, i) => {
                const isHot = pulseIndex === i || hover === i || active === i;
                return (
                  <path
                    key={`conn-${i}`}
                    d={n.path}
                    fill="none"
                    stroke={`hsl(${n.color} / ${isHot ? 0.95 : 0.45})`}
                    strokeWidth={isHot ? 2 : 1.2}
                    strokeLinecap="round"
                    style={{ transition: "all 0.6s ease", filter: isHot ? `drop-shadow(0 0 6px hsl(${n.color} / 0.8))` : undefined }}
                  />
                );
              })}

              {/* pulso único */}
              {(() => {
                const n = nodes[pulseIndex];
                return (
                  <circle
                    key={`pulse-${pulseIndex}`}
                    r={4}
                    fill={`hsl(${n.color})`}
                    filter="url(#softGlow)"
                    opacity="0.95"
                  >
                    <animateMotion dur="2.4s" repeatCount="1" path={n.path} fill="freeze" />
                    <animate attributeName="opacity" values="0;1;0" dur="2.4s" repeatCount="1" fill="freeze" />
                  </circle>
                );
              })()}

              {/* núcleo / logo */}
              <g>
                <circle cx={CX} cy={CY} r="105" fill="hsl(270 40% 12% / 0.6)" stroke="hsl(var(--comic-cyan) / 0.4)" strokeWidth="1.5" />
                <circle cx={CX} cy={CY} r="125" fill="none" stroke="hsl(330 85% 60% / 0.3)" strokeWidth="1" strokeDasharray="3 6" />
                <image
                  href={logoMetaverso}
                  x={CX - 90}
                  y={CY - 90}
                  width="180"
                  height="180"
                  style={{ filter: `drop-shadow(0 0 24px hsl(var(--comic-cyan) / 0.6)) drop-shadow(0 0 12px hsl(330 85% 60% / 0.4))` }}
                />
              </g>

              {/* nós coloridos estilo comic */}
              {nodes.map((n, i) => {
                const isActive = active === i || hover === i;
                const isHot = pulseIndex === i || isActive;
                return (
                  <g
                    key={`node-${i}`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setActive(active === i ? null : i)}
                    style={{
                      transition: "transform 0.4s ease",
                      transform: `translate(${n.x}px, ${n.y}px) scale(${isActive ? 1.12 : 1})`,
                      transformOrigin: `${n.x}px ${n.y}px`,
                      transformBox: "fill-box",
                    } as React.CSSProperties}
                  >
                    <circle
                      r={NODE_R}
                      fill={`hsl(${n.color})`}
                      stroke="hsl(0 0% 0%)"
                      strokeWidth="3"
                      style={{
                        transition: "all 0.4s ease",
                        filter: `drop-shadow(0 0 ${isHot ? 14 : 8}px hsl(${n.color} / ${isHot ? 0.9 : 0.55}))`,
                      }}
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="32"
                      style={{ userSelect: "none" }}
                    >
                      {n.emoji}
                    </text>
                    <g transform={`translate(0, ${NODE_R + 22})`}>
                      <rect
                        x={-((n.name.length * 8) + 14) / 2}
                        y={-12}
                        width={(n.name.length * 8) + 14}
                        height={22}
                        rx={11}
                        fill="hsl(0 0% 0% / 0.85)"
                        stroke={`hsl(${n.color} / 0.7)`}
                        strokeWidth="1.5"
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={`hsl(${n.color})`}
                        fontFamily="'Bangers', cursive"
                        fontSize="13"
                        letterSpacing="1.5"
                      >
                        {n.name.toUpperCase()}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* card detalhes */}
              {active !== null &&
                (() => {
                  const a = nodes[active];
                  const cardW = 320;
                  const cardH = 130;
                  const dirX = (a.x - CX) / R;
                  const dirY = (a.y - CY) / R;
                  let cardX = a.x + dirX * 70 - cardW / 2;
                  let cardY = a.y + dirY * 70 - cardH / 2;
                  if (cardX < 10) cardX = 10;
                  if (cardX + cardW > 990) cardX = 990 - cardW;
                  if (cardY < 10) cardY = 10;
                  if (cardY + cardH > 990) cardY = 990 - cardH;
                  return (
                    <g key={`detail-${active}`} className="animate-fade-in" style={{ transformOrigin: `${a.x}px ${a.y}px` }}>
                      <foreignObject x={cardX} y={cardY} width={cardW} height={cardH}>
                        <div
                          className="p-4 flex items-start gap-3 rounded-lg"
                          style={{
                            background: "hsl(230 30% 7% / 0.92)",
                            border: `1px solid hsl(${ACCENT} / 0.35)`,
                            boxShadow: `0 8px 32px hsl(0 0% 0% / 0.6), 0 0 0 1px hsl(0 0% 100% / 0.04)`,
                            backdropFilter: "blur(12px)",
                          }}
                        >
                          <div className="text-2xl shrink-0 leading-none pt-0.5">{a.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className="font-orbitron text-sm mb-1.5 leading-tight tracking-[0.15em] font-light text-white/95"
                            >
                              {a.name.toUpperCase()}
                            </h3>
                            <p className="text-white/55 text-xs leading-relaxed font-light">{a.desc}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActive(null);
                            }}
                            className="text-white/30 hover:text-white/80 transition-colors shrink-0 leading-none text-sm"
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
          <p className="mt-10 text-center text-white/30 text-xs font-light tracking-[0.3em] uppercase">
            Toque em um nó
          </p>
        )}
      </div>
    </section>
  );
};

export default AtracoesSection;
