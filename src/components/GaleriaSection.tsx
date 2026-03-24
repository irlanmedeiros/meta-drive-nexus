import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import glitchColerico from "@/assets/glitch-colerico.png";

const photoPlaceholders = [
  { id: 1, label: "Foto 1", aspect: "aspect-[4/3]" },
  { id: 2, label: "Foto 2", aspect: "aspect-[4/3]" },
  { id: 3, label: "Foto 3", aspect: "aspect-[4/3]" },
  { id: 4, label: "Foto 4", aspect: "aspect-[4/3]" },
  { id: 5, label: "Foto 5", aspect: "aspect-[4/3]" },
  { id: 6, label: "Foto 6", aspect: "aspect-[4/3]" },
  { id: 7, label: "Foto 7", aspect: "aspect-[4/3]" },
  { id: 8, label: "Foto 8", aspect: "aspect-[4/3]" },
];

const videoPlaceholders = [
  { id: 1, label: "Vídeo 1 — Aftermovie / Teaser" },
  { id: 2, label: "Vídeo 2 — Highlights" },
];

const GaleriaSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="galeria" className="relative py-24 px-4 overflow-hidden">
      <img src={glitchColerico} alt="Glitch" className="absolute top-10 left-4 w-24 md:w-36 opacity-25 pointer-events-none hidden md:block" />
      <div ref={ref} className="container mx-auto max-w-6xl">
        <h2
          className={`font-display text-3xl md:text-5xl font-bold text-center mb-4 text-glow-pink transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          GALERIA DO EVENTO
        </h2>
        <p
          className={`text-center text-muted-foreground max-w-2xl mx-auto mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Confira os melhores momentos das edições anteriores do Metaverso Experience
        </p>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {photoPlaceholders.map((photo, i) => (
            <div
              key={photo.id}
              className={`group relative ${photo.aspect} rounded-xl bg-card border-2 border-dashed border-border hover:border-neon-pink overflow-hidden transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 80}ms` }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-3xl opacity-40">📷</span>
                <span className="text-xs text-muted-foreground font-display uppercase tracking-wider">
                  {photo.label}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Videos */}
        <h3
          className={`font-display text-xl md:text-2xl font-bold text-center mb-8 text-neon-blue transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          🎬 VÍDEOS
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {videoPlaceholders.map((video, i) => (
            <div
              key={video.id}
              className={`group relative aspect-video rounded-xl bg-card border-2 border-dashed border-border hover:border-neon-blue overflow-hidden transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${700 + i * 150}ms` }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-neon-blue/20 border-2 border-neon-blue/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl ml-1">▶</span>
                </div>
                <span className="text-sm text-muted-foreground font-display uppercase tracking-wider">
                  {video.label}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GaleriaSection;
