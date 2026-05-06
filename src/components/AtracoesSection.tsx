import { useEffect, useMemo, useRef, useState } from "react";
import {
  Trophy,
  Music2,
  Gamepad2,
  Spade,
  Glasses,
  Mic2,
  Palette,
  ShoppingBag,
  UtensilsCrossed,
  Smartphone,
  Landmark,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import glitchCpe from "@/assets/glitch-cpe.png";

type Atracao = {
  Icon: LucideIcon;
  name: string;
  desc: string;
  accent: string;
  color: string;
};

const atracoes: Atracao[] = [
  { Icon: Trophy, name: "CPE", desc: "Campeonato Pessoense de E-Sports a 6 anos fazendo história", accent: "border-neon-yellow", color: "48 100% 65%" },
  { Icon: Music2, name: "K-Pop", desc: "Performances e batalhas de dança e cover", accent: "border-neon-pink", color: "330 100% 66%" },
  { Icon: Gamepad2, name: "Arena Freeplay", desc: "Games clássicos e atuais em modo livre", accent: "border-comic-cyan", color: "190 95% 60%" },
  { Icon: Spade, name: "Card Games", desc: "Torneios de TCG, Magic, Pokémon e Yu-Gi-Oh!", accent: "border-neon-purple", color: "280 95% 65%" },
  { Icon: Glasses, name: "Laser Tag + VR", desc: "Ativações imersivas de realidade virtual e combate", accent: "border-neon-green", color: "140 85% 60%" },
  { Icon: Mic2, name: "Shows de Música", desc: "Apresentações ao vivo no palco principal", accent: "border-neon-pink", color: "330 100% 66%" },
  { Icon: Palette, name: "Artist Alley", desc: "Espaço para artistas independentes exporem e venderem", accent: "border-neon-yellow", color: "48 100% 65%" },
  { Icon: ShoppingBag, name: "Lojinhas", desc: "Produtos geek, colecionáveis e itens exclusivos", accent: "border-comic-orange", color: "28 95% 60%" },
  { Icon: UtensilsCrossed, name: "Área de Alimentação", desc: "Food trucks e opções gastronômicas temáticas", accent: "border-comic-cyan", color: "190 95% 60%" },
  { Icon: Smartphone, name: "Influencers", desc: "Encontro com criadores de conteúdo do universo geek", accent: "border-neon-purple", color: "280 95% 65%" },
  { Icon: Landmark, name: "Deck Cultural", desc: "18 totens históricos da Paraíba em linguagem de HQ e Games", accent: "border-neon-green", color: "140 85% 60%" },
  { Icon: Briefcase, name: "Ativações dos apoiadores", desc: "Ativações imersivas para o público", accent: "border-neon-green", color: "140 85% 60%" },
];

const RESUME_DELAY_MS = 8000;

const getCircularPositions = (count: number, radius = 320, centerX = 500, centerY = 500) =>
  Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

const AtracoesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);
  const ORBIT_DURATION_S = 72;
  const PULSE_INTERVAL_MS = (ORBIT_DURATION_S * 1000) / atracoes.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % atracoes.length);
    }, PULSE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [PULSE_INTERVAL_MS, isPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleNodeClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY_MS);
  };

  const positions = useMemo(() => getCircularPositions(atracoes.length), []);
  const activeAtracao = atracoes[activeIndex];
  const ActiveIcon = activeAtracao.Icon;

  return (
    <section id="atracoes" className="relative py-24 px-4 overflow-hidden radial-burst-purple">
      <img src={glitchCpe} alt="Glitch" className="absolute bottom-8 left-4 w-32 md:w-48 opacity-30 pointer-events-none hidden md:block" />

      <div className="absolute top-20 right-10 w-14 h-14 bg-neon-pink starburst opacity-40 hidden md:block" />
      <div className="absolute bottom-20 right-20 w-10 h-10 bg-neon-yellow starburst opacity-30 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-6xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center text-comic-cyan text-glow-blue transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          ATRAÇÕES
        </h2>

        <div className={`relative mx-auto w-full max-w-6xl transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="relative mx-auto aspect-square w-full max-w-5xl overflow-visible rounded-[2.5rem]">
            <div className="absolute inset-0 animate-orbit-slow">
              <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                <circle cx="500" cy="500" r="322" fill="none" stroke="hsl(0 0% 100% / 0.12)" strokeWidth="1" strokeDasharray="5 10" />
                <circle cx="500" cy="500" r="278" fill="none" stroke="hsl(190 95% 60% / 0.14)" strokeWidth="1" />

                {positions.map((position, index) => {
                  const a = atracoes[index];
                  const isActive = index === activeIndex;

                  return (
                    <line
                      key={`branch-${a.name}`}
                      x1={500}
                      y1={500}
                      x2={position.x}
                      y2={position.y}
                      stroke={`hsl(${a.color})`}
                      strokeWidth={isActive ? 4 : 2}
                      opacity={isActive ? 0.95 : 0.2}
                      strokeLinecap="round"
                      className={isActive ? "beam-flow" : ""}
                    />
                  );
                })}

                <line
                  x1={positions[activeIndex].x}
                  y1={positions[activeIndex].y}
                  x2="500"
                  y2="500"
                  stroke={`hsl(${activeAtracao.color})`}
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="active-beam"
                />
              </svg>

              {positions.map((position, index) => {
                const a = atracoes[index];
                const isActive = index === activeIndex;
                const NodeIcon = a.Icon;

                return (
                  <button
                    key={a.name}
                    type="button"
                    onClick={() => handleNodeClick(index)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 focus:outline-none ${isActive ? "scale-115 z-20" : "scale-100 hover:scale-110 z-10"}`}
                    style={{ left: `${(position.x / 1000) * 100}%`, top: `${(position.y / 1000) * 100}%` }}
                    aria-label={a.name}
                  >
                    <span className="orbit-counter block">
                      <span
                        className={`orbit-node flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md ${isActive ? "ring-2 ring-white/55" : ""}`}
                        style={{ boxShadow: isActive ? `0 0 28px hsl(${a.color} / 0.55)` : `0 0 14px hsl(${a.color} / 0.22)` }}
                      >
                        <NodeIcon
                          className="h-6 w-6 md:h-7 md:w-7"
                          style={{ color: `hsl(${a.color})`, filter: `drop-shadow(0 0 6px hsl(${a.color} / 0.6))` }}
                          strokeWidth={2}
                        />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                key={activeAtracao.name}
                className="relative w-[300px] max-w-[78vw] rounded-[2rem] border border-white/20 bg-black/50 backdrop-blur-xl p-5 md:p-6 text-center shadow-[0_0_50px_rgba(0,0,0,0.35)] animate-scale-in"
              >
                <div className="absolute -inset-[1px] rounded-[2rem] border border-cyan-300/20" />
                <div
                  className="mx-auto mb-3 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full"
                  style={{
                    background: `radial-gradient(circle, hsl(${activeAtracao.color} / 0.18), transparent 70%)`,
                  }}
                >
                  <ActiveIcon
                    className="h-10 w-10 md:h-12 md:w-12"
                    style={{
                      color: `hsl(${activeAtracao.color})`,
                      filter: `drop-shadow(0 0 12px hsl(${activeAtracao.color} / 0.7))`,
                    }}
                    strokeWidth={2}
                  />
                </div>
                <p className="font-display text-[10px] uppercase tracking-[0.4em] text-cyan-200/80 mb-2">Nexo Central</p>
                <h3 className="font-display text-xl md:text-2xl text-white leading-tight mb-2">
                  {activeAtracao.name}
                </h3>
                <p className="text-xs md:text-sm text-slate-200/80 leading-relaxed">
                  {activeAtracao.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .beam-flow {
          stroke-dasharray: 10 16;
          animation: beamFlow 1.2s linear infinite;
        }

        .active-beam {
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.35));
          animation: activeBeamPulse 1.8s ease-in-out infinite;
        }

        .orbit-node {
          animation: nodeBreath 2.8s ease-in-out infinite;
        }

        .orbit-counter {
          animation: orbitCounter ${ORBIT_DURATION_S}s linear infinite;
        }

        @keyframes beamFlow { to { stroke-dashoffset: -26; } }
        @keyframes activeBeamPulse { 0%,100%{opacity:0.7} 50%{opacity:1} }
        @keyframes nodeBreath { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
        @keyframes orbitSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes orbitCounter { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }

        .animate-orbit-slow {
          transform-origin: center;
          animation: orbitSlow ${ORBIT_DURATION_S}s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AtracoesSection;
