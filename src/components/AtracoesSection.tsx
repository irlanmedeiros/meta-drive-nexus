import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import glitchCpe from "@/assets/glitch-cpe.png";

const atracoes = [
  { emoji: "🏆", name: "CPE", desc: "Campeonato Pessoense de E-Sports — 6 anos de história" },
  { emoji: "🎵", name: "Campeonato de K-Pop", desc: "Performances e batalhas de dança e cover" },
  { emoji: "🕹️", name: "Arena Freeplay", desc: "Games clássicos e atuais em modo livre" },
  { emoji: "🃏", name: "Card Games", desc: "Torneios de TCG, Magic, Pokémon e Yu-Gi-Oh!" },
  { emoji: "🥽", name: "Laser Tag + VR", desc: "Ativações imersivas de realidade virtual e combate" },
  { emoji: "🎤", name: "Shows de Música", desc: "Apresentações ao vivo no palco principal" },
  { emoji: "🎨", name: "Artist Alley", desc: "Espaço para artistas independentes exporem e venderem" },
  { emoji: "🛍️", name: "Lojinhas", desc: "Produtos geek, colecionáveis e itens exclusivos" },
  { emoji: "🍔", name: "Área de Alimentação", desc: "Food trucks e opções gastronômicas temáticas" },
  { emoji: "📱", name: "Influencers", desc: "Encontro com criadores de conteúdo do universo geek" },
  { emoji: "🏛️", name: "Deck Cultural", desc: "18 totens históricos da Paraíba em linguagem de HQ e Games" },
];

const AtracoesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="atracoes" className="relative py-24 px-4 grid-bg">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <h2 className={`font-display text-3xl md:text-5xl font-bold text-center mb-16 text-glow-blue transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          ATRAÇÕES
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {atracoes.map((a, i) => (
            <div
              key={a.name}
              className={`group rounded-lg p-4 bg-card border border-border hover:neon-border-blue transition-all duration-500 hover:scale-105 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <span className="text-3xl mb-3 block">{a.emoji}</span>
              <h3 className="font-display text-xs md:text-sm font-bold mb-1">{a.name}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtracoesSection;
