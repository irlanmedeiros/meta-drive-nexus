import { useEffect, useRef, useState } from "react";
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
import tvImg from "@/assets/tv-transparent.png";
import Particles from "./Particles";

type Atracao = {
  Icon: LucideIcon;
  name: string;
  desc: string;
  color: string;
};

const atracoes: Atracao[] = [
  { Icon: Trophy, name: "CPE", desc: "Campeonato Pessoense de E-Sports a 6 anos fazendo história", color: "48 100% 65%" },
  { Icon: Landmark, name: "Deck Cultural", desc: "18 totens históricos da Paraíba em linguagem de HQ e Games", color: "140 85% 60%" },
  { Icon: Music2, name: "K-Pop", desc: "Performances e batalhas de dança e cover", color: "330 100% 66%" },
  { Icon: Gamepad2, name: "Arena Freeplay", desc: "Games clássicos e atuais em modo livre", color: "190 95% 60%" },
  { Icon: Spade, name: "Card Games", desc: "Torneios de TCG, Magic, Pokémon e Yu-Gi-Oh!", color: "280 95% 65%" },
  { Icon: Briefcase, name: "Ativações dos apoiadores", desc: "Ativações imersivas para o público", color: "140 85% 60%" },
  { Icon: Glasses, name: "Laser Tag + VR", desc: "Ativações imersivas de realidade virtual e combate", color: "140 85% 60%" },
  { Icon: Mic2, name: "Shows de Música", desc: "Apresentações ao vivo no palco principal", color: "330 100% 66%" },
  { Icon: Palette, name: "Artist Alley", desc: "Espaço para artistas independentes exporem e venderem", color: "48 100% 65%" },
  { Icon: ShoppingBag, name: "Lojinhas", desc: "Produtos geek, colecionáveis e itens exclusivos", color: "28 95% 60%" },
  { Icon: Smartphone, name: "Influencers", desc: "Encontro com criadores de conteúdo do universo geek", color: "280 95% 65%" },
  { Icon: UtensilsCrossed, name: "Área de Alimentação", desc: "Food trucks e opções gastronômicas temáticas", color: "190 95% 60%" },
];

const RESUME_DELAY_MS = 8000;
const ROTATE_INTERVAL_MS = 4500;

// Posição da tela preta dentro do PNG da TV (em % do bounding box do <img>)
const SCREEN = { left: 28, top: 32.5, width: 41.2, height: 46.5 };

const AtracoesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((c) => (c + 1) % atracoes.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  useEffect(() => () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), RESUME_DELAY_MS);
  };

  const active = atracoes[activeIndex];
  const ActiveIcon = active.Icon;

  return (
    <section
      id="atracoes"
      className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top center, hsl(286 65% 20% / 0.72) 0%, transparent 42%), radial-gradient(circle at bottom center, hsl(190 90% 18% / 0.28) 0%, transparent 46%), linear-gradient(180deg, hsl(286 48% 10%) 0%, hsl(280 42% 13%) 48%, hsl(282 50% 9%) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.14),transparent_28%)]" />
      <Particles />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/15 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-3 flex justify-center pointer-events-none">
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-neon-pink/8 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
      </div>

      <div ref={ref} className="relative z-10 container mx-auto max-w-6xl">
        <h2 className={`font-display text-3xl sm:text-4xl md:text-6xl text-center mb-3 text-comic-cyan text-glow-blue transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          PROGRAMAÇÃO
        </h2>
        <p className={`text-center text-sm md:text-base text-white/75 max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Confira a nossa programação no Canal Metaverso. <span className="text-comic-orange">Clique em cada atração</span> para ver os detalhes ou apenas relaxe e assista.
        </p>

        <div className={`relative mx-auto w-full max-w-6xl transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-8 lg:gap-10 items-center">
            {/* TV */}
            <div className="relative w-full max-w-3xl mx-auto lg:mx-0" style={{ aspectRatio: "1944 / 1296" }}>
              <img
                src={tvImg}
                alt="TV Metaverso"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                draggable={false}
              />
              {/* Programação dentro da tela */}
              <div
                className="absolute flex items-center justify-center overflow-hidden"
                style={{
                  left: `${SCREEN.left}%`,
                  top: `${SCREEN.top}%`,
                  width: `${SCREEN.width}%`,
                  height: `${SCREEN.height}%`,
                }}
              >
                <div
                  key={active.name}
                  className="w-full h-full flex flex-col items-center justify-center text-center px-3 animate-scale-in"
                >
                  <div
                    className="mb-1 sm:mb-2 md:mb-3 flex items-center justify-center"
                    style={{ filter: `drop-shadow(0 0 14px hsl(${active.color} / 0.85))` }}
                  >
                    <ActiveIcon
                      className="h-7 w-7 sm:h-9 sm:w-9 md:h-12 md:w-12"
                      style={{ color: `hsl(${active.color})` }}
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="font-display text-[11px] sm:text-base md:text-2xl text-white leading-tight mb-1 md:mb-2 tracking-wide">
                    {active.name}
                  </h3>
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-slate-200/85 leading-snug line-clamp-3 max-w-[92%]">
                    {active.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Grid de atrações */}
            <div className="grid grid-cols-4 lg:grid-cols-3 gap-x-3 gap-y-5 lg:gap-x-4 lg:gap-y-6 max-w-2xl mx-auto lg:mx-0 lg:w-full">
              {atracoes.map((a, index) => {
                const NodeIcon = a.Icon;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={a.name}
                    type="button"
                    onClick={() => handleClick(index)}
                    className={`group flex flex-col items-center gap-1.5 transition-transform duration-300 focus:outline-none ${isActive ? "scale-110" : "hover:scale-105 active:scale-95"}`}
                    aria-label={a.name}
                  >
                    <span className="relative flex items-center justify-center">
                      {isActive && (
                        <span
                          className="absolute inset-0 -m-3 rounded-full opacity-80 blur-md"
                          style={{ background: `radial-gradient(circle, hsl(${a.color} / 0.55), transparent 70%)` }}
                        />
                      )}
                      <span
                        className={`relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border bg-black/70 backdrop-blur-md transition-all ${isActive ? "border-white/70 ring-2 ring-white/40" : "border-white/15"}`}
                        style={{
                          boxShadow: isActive
                            ? `0 0 22px hsl(${a.color} / 0.7)`
                            : `0 0 8px hsl(${a.color} / 0.18)`,
                        }}
                      >
                        <NodeIcon
                          className="h-5 w-5 md:h-6 md:w-6"
                          style={{ color: `hsl(${a.color})` }}
                          strokeWidth={2}
                        />
                      </span>
                    </span>
                    <span
                      className={`text-[9px] md:text-[10px] leading-tight text-center font-display uppercase tracking-wide line-clamp-2 ${isActive ? "text-white" : "text-white/55"}`}
                    >
                      {a.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtracoesSection;
