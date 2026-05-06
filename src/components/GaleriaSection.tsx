import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import glitchColerico from "@/assets/glitch-colerico.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Camera, Play } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

type MediaItem = {
  id: string;
  type: string;
  url: string;
  label: string | null;
  display_order: number;
};

const photoPlaceholders = Array.from({ length: 8 }, (_, i) => ({
  id: `p${i + 1}`,
  label: `Foto ${i + 1}`,
}));

const videoPlaceholders = [
  { id: "v1", label: "Vídeo 1 — Aftermovie / Teaser" },
  { id: "v2", label: "Vídeo 2 — Highlights" },
  { id: "v3", label: "Vídeo 3 — Backstage" },
  { id: "v4", label: "Vídeo 4 — Cosplay" },
];

const getYouTubeId = (url: string): string | null => {
  const m = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
};

const getYouTubeThumb = (url: string): string | null => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

const cleanLabel = (label: string | null) =>
  (label ?? "").replace(/^\[HERO\]\s*/i, "").trim();

const GaleriaSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);

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
    <section id="galeria" className="relative py-24 px-4 halftone">
      <div className="absolute inset-0 halftone pointer-events-none" />
      <img
        src={glitchColerico}
        alt="Glitch"
        className="absolute bottom-0 right-10 w-40 md:w-64 opacity-40 pointer-events-none hidden md:block z-0"
      />
      <div className="absolute bottom-16 w-16 h-16 bg-neon-yellow starburst opacity-40 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-6xl">
        <h2
          className={`font-display text-4xl md:text-6xl text-center mb-4 text-neon-pink text-glow-pink transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          GALERIA DO EVENTO
        </h2>
        <p
          className={`text-center text-muted-foreground max-w-2xl mx-auto mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Confira os melhores momentos das edições anteriores do Metaverso Experience
        </p>

        {/* Photos Carousel */}

        <div
          className={`mb-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay:3000 })]}
            className="w-full px-2 md:px-0"
          >
            <CarouselContent className="-ml-4">
              {(hasPhotos ? photos : photoPlaceholders).map((photo) => (
                <CarouselItem
                  key={photo.id}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  {hasPhotos ? (
                    <div className="group relative aspect-[4/3] comic-card bg-card overflow-hidden">
                      <img
                        src={(photo as MediaItem).url}
                        alt={cleanLabel((photo as MediaItem).label) || "Foto do evento"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="group relative aspect-[4/3] comic-card bg-card overflow-hidden">
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 halftone-dense">
                        <Camera className="w-8 h-8 opacity-40" aria-hidden="true" />
                        <span className="text-xs text-muted-foreground font-display uppercase tracking-wider text-center px-2">
                          {(photo as { label: string }).label}
                        </span>
                      </div>
                    </div>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-background/80 border-neon-pink/40 text-neon-pink hover:bg-neon-pink hover:text-background" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-background/80 border-neon-pink/40 text-neon-pink hover:bg-neon-pink hover:text-background" />
          </Carousel>
        </div>

        {/* Videos */}
        <div
          className={`transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 4000 })]}
            className="w-full px-2 md:px-0"
          >
            <CarouselContent className="-ml-4">
              {(hasVideos ? videos : videoPlaceholders).map((video) => (
                <CarouselItem
                  key={video.id}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/4"
                >
                  {hasVideos ? (
                    <VideoCard
                      video={video as MediaItem}
                      onPlay={() => setActiveVideo(video as MediaItem)}
                    />
                  ) : (
                    <div className="relative aspect-video comic-card bg-card overflow-hidden">
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 halftone-dense">
                        <div className="w-16 h-16 rounded-full bg-neon-pink/20 border-3 border-neon-pink/60 flex items-center justify-center">
                          <Play className="ml-1 text-neon-pink" />
                        </div>
                        <span className="text-sm text-muted-foreground font-display uppercase tracking-wider text-center px-2">
                          {(video as { label: string }).label}
                        </span>
                      </div>
                    </div>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-background/80 border-comic-cyan/40 text-comic-cyan hover:bg-comic-cyan hover:text-background" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-background/80 border-comic-cyan/40 text-comic-cyan hover:bg-comic-cyan hover:text-background" />
          </Carousel>
        </div>
      </div>

      {/* Modal Player */}
      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-neon-pink/40 overflow-hidden">
          <DialogTitle className="sr-only">
            {activeVideo ? cleanLabel(activeVideo.label) || "Vídeo" : "Vídeo"}
          </DialogTitle>
          {activeVideo && (
            <div className="aspect-video w-full bg-black">
              {activeVideo.url.includes("youtube.com/embed") ? (
                <iframe
                  key={activeVideo.id}
                  src={`${activeVideo.url}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title={cleanLabel(activeVideo.label) || "Vídeo"}
                />
              ) : (
                <video
                  key={activeVideo.id}
                  src={activeVideo.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

const VideoCard = ({
  video,
  onPlay,
}: {
  video: MediaItem;
  onPlay: () => void;
}) => {
  const isYouTube = video.url.includes("youtube.com/embed");
  const ytThumb = isYouTube ? getYouTubeThumb(video.url) : null;
  const label = cleanLabel(video.label);

  return (
    <button
      type="button"
      onClick={onPlay}
      className="group relative aspect-video w-full comic-card bg-card overflow-hidden block text-left"
      aria-label={`Reproduzir ${label || "vídeo"}`}
    >
      {isYouTube ? (
        ytThumb ? (
          <img
            src={ytThumb}
            alt={label || "Vídeo"}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-card" />
        )
      ) : (
        <video
          src={video.url}
          preload="metadata"
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neon-pink/90 border-2 border-white flex items-center justify-center shadow-[0_0_25px_hsl(var(--neon-pink)/0.6)] transition-transform group-hover:scale-110">
          <Play className="ml-1 text-white" fill="currentColor" size={26} />
        </div>
      </div>

      {/* Label */}
      {label && (
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-xs md:text-sm font-display text-white uppercase tracking-wider truncate">
            {label}
          </p>
        </div>
      )}
    </button>
  );
};

export default GaleriaSection;
