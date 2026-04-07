import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import glitchCpe from "@/assets/glitch-cpe.png";

const atracoes = [
  { emoji: "🏆", name: "CPE", desc: "Campeonato Pessoense de E-Sports — 6 anos de história", accent: "border-neon-yellow" },
  { emoji: "🎵", name: "Campeonato de K-Pop", desc: "Performances e batalhas de dança e cover", accent: "border-neon-pink" },
  { emoji: "🕹️", name: "Arena Freeplay", desc: "Games clássicos e atuais em modo livre", accent: "border-comic-cyan" },
  { emoji: "🃏", name: "Card Games", desc: "Torneios de TCG, Magic, Pokémon e Yu-Gi-Oh!", accent: "border-neon-purple" },
  { emoji: "🥽", name: "Laser Tag + VR", desc: "Ativações imersivas de realidade virtual e combate", accent: "border-neon-green" },
  { emoji: "🎤", name: "Shows de Música", desc: "Apresentações ao vivo no palco principal", accent: "border-neon-pink" },
  { emoji: "🎨", name: "Artist Alley", desc: "Espaço para artistas independentes exporem e venderem", accent: "border-neon-yellow" },
  { emoji: "🛍️", name: "Lojinhas", desc: "Produtos geek, colecionáveis e itens exclusivos", accent: "border-comic-orange" },
  { emoji: "🍔", name: "Área de Alimentação", desc: "Food trucks e opções gastronômicas temáticas", accent: "border-comic-cyan" },
  { emoji: "📱", name: "Influencers", desc: "Encontro com criadores de conteúdo do universo geek", accent: "border-neon-purple" },
  { emoji: "🏛️", name: "Deck Cultural", desc: "18 totens históricos da Paraíba em linguagem de HQ e Games", accent: "border-neon-green" },
];

const AtracoesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="atracoes" className="relative py-24 px-4 halftone">
      <img src={glitchCpe} alt="Glitch" className="absolute bottom-8 left-4 w-32 md:w-48 opacity-30 pointer-events-none hidden md:block" />

      {/* Comic starbursts */}
      <div className="absolute top-20 right-10 w-14 h-14 bg-neon-pink starburst opacity-40 hidden md:block" />
      <div className="absolute bottom-20 right-20 w-10 h-10 bg-neon-yellow starburst opacity-30 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-6xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center mb-16 text-comic-cyan text-glow-blue transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          ATRAÇÕES 💥
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {atracoes.map((a, i) => (
            <div
              key={a.name}
              className={`group comic-card bg-card p-4 border-l-[6px] ${a.accent} transition-all duration-500 hover:scale-105 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <span className="text-3xl mb-3 block">{a.emoji}</span>
              <h3 className="font-display text-sm md:text-base mb-1">{a.name}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtracoesSection;
