import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import glitchColerico from "@/assets/glitch-colerico.png";

type MediaItem = {
  id: string;
  type: string;
  url: string;
  label: string | null;
  display_order: number;
};

const photoPlaceholders = [
  { id: "p1", label: "Foto 1", aspect: "aspect-[4/3]" },
  { id: "p2", label: "Foto 2", aspect: "aspect-[4/3]" },
  { id: "p3", label: "Foto 3", aspect: "aspect-[4/3]" },
  { id: "p4", label: "Foto 4", aspect: "aspect-[4/3]" },
  { id: "p5", label: "Foto 5", aspect: "aspect-[4/3]" },
  { id: "p6", label: "Foto 6", aspect: "aspect-[4/3]" },
  { id: "p7", label: "Foto 7", aspect: "aspect-[4/3]" },
  { id: "p8", label: "Foto 8", aspect: "aspect-[4/3]" },
];

const videoPlaceholders = [
  { id: "v1", label: "Vídeo 1 — Aftermovie / Teaser" },
  { id: "v2", label: "Vídeo 2 — Highlights" },
];

const GaleriaSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const { data } = await supabase
        .from("galeria_media")
        .select("*")
        .order("display_order", { ascending: true });
      if (data) {
        setPhotos(data.filter((m) => m.type === "photo"));
        setVideos(data.filter((m) => m.type === "video"));
      }
    };
    fetchMedia();
  }, []);

  const hasPhotos = photos.length > 0;
  const hasVideos = videos.length > 0;

  return (
    <section id="galeria" className="relative py-24 px-4 overflow-hidden radial-burst-purple">
      <div className="absolute inset-0 halftone pointer-events-none" />
      <img src={glitchColerico} alt="Glitch" className="absolute top-10 left-4 w-28 md:w-40 opacity-30 pointer-events-none hidden md:block" />
      <div className="absolute bottom-16 right-10 w-16 h-16 bg-neon-yellow starburst opacity-40 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-6xl">
        <h2 className={`font-display text-4xl md:text-6xl text-center mb-4 text-neon-pink text-glow-pink transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          GALERIA DO EVENTO 📸
        </h2>
        <p className={`text-center text-muted-foreground max-w-2xl mx-auto mb-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Confira os melhores momentos das edições anteriores do Metaverso Experience
        </p>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {hasPhotos
            ? photos.map((photo, i) => (
                <div
                  key={photo.id}
                  className={`group relative aspect-[4/3] comic-card bg-card overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <img
                    src={photo.url}
                    alt={photo.label || "Foto do evento"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))
            : photoPlaceholders.map((photo, i) => (
                <div
                  key={photo.id}
                  className={`group relative ${photo.aspect} comic-card bg-card overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 halftone-dense">
                    <span className="text-3xl opacity-40">📷</span>
                    <span className="text-xs text-muted-foreground font-display uppercase tracking-wider">
                      {photo.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
        </div>

        {/* Videos */}
        <h3 className={`font-display text-2xl md:text-3xl text-center mb-8 text-comic-cyan transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          🎬 VÍDEOS
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {hasVideos
            ? videos.map((video, i) => (
                <div
                  key={video.id}
                  className={`group relative aspect-video comic-card bg-card overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${700 + i * 150}ms` }}
                >
                  {video.url.includes("youtube.com/embed") ? (
                    <iframe
                      src={`${video.url}${video.url.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&playlist=${video.url.split('/').pop()?.split('?')[0] || ''}&controls=0`}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={video.label || "Vídeo"}
                    />
                  ) : (
                    <LoopingVideo src={video.url} />
                  )}
                </div>
              ))
            : videoPlaceholders.map((video, i) => (
                <div
                  key={video.id}
                  className={`group relative aspect-video comic-card bg-card overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${700 + i * 150}ms` }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 halftone-dense">
                    <div className="w-16 h-16 rounded-full bg-neon-pink/20 border-3 border-neon-pink/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl ml-1">▶</span>
                    </div>
                    <span className="text-sm text-muted-foreground font-display uppercase tracking-wider">
                      {video.label}
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default GaleriaSection;
