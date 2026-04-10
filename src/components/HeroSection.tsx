import { useRef, useState, useEffect } from "react";
import logo from "@/assets/logo-metaverso.png";
import glitchApresentador from "@/assets/glitch-apresentador.png";
import Particles from "./Particles";
import { Volume2, VolumeX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEventDate } from "@/hooks/useEventDate";
import { useCountdown } from "@/hooks/useCountdown";

const HERO_TAG = "[HERO]";

const formatNumber = (n: number) =>
  n.toLocaleString("pt-BR");

const CountdownBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center px-3 md:px-5">
    <span className="font-display text-4xl sm:text-5xl md:text-7xl text-white leading-none tracking-tight">
      {formatNumber(value)}
    </span>
    <span className="mt-1 text-[10px] sm:text-xs font-display uppercase tracking-[0.25em] text-white/60">
      {label}
    </span>
  </div>
);

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [heroVideoUrl, setHeroVideoUrl] = useState("");

  const { eventDate } = useEventDate();
  const { days, hours, minutes, seconds } = useCountdown(eventDate);

  useEffect(() => {
    const fetchHeroVideo = async () => {
      const { data, error } = await supabase
        .from("galeria_media")
        .select("url, label, created_at")
        .eq("type", "video")
        .order("created_at", { ascending: false });

      if (error || !data) return;

      const cloudVideos = data.filter((item) => !item.url.includes("youtube.com/embed"));
      const taggedHero = cloudVideos.find((item) =>
        (item.label ?? "").trim().toUpperCase().startsWith(HERO_TAG)
      );

      const selected = taggedHero ?? cloudVideos[0];
      if (selected?.url) setHeroVideoUrl(selected.url);
    };

    void fetchHeroVideo();
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  const handleAudioToggle = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
    if (!next) {
      videoRef.current.play().catch(() => {
        videoRef.current!.muted = true;
        setIsMuted(true);
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heroVideoUrl ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            src={heroVideoUrl}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,221,87,0.08),transparent_45%)]" />
      </div>

      <div className="absolute inset-0 halftone pointer-events-none" />
      <Particles />

      {/* Sound toggle — bottom left */}
      {heroVideoUrl && (
        <button
          onClick={handleAudioToggle}
          className={`absolute bottom-6 left-4 sm:left-6 z-30 flex items-center gap-2 min-h-[44px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-105 font-display uppercase tracking-[0.15em] text-[10px] sm:text-xs ${
            isMuted
              ? "bg-black/50 border-white/15 text-white/60 hover:text-white hover:border-white/30"
              : "bg-black/60 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,255,255,0.25)]"
          }`}
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? (
            <VolumeX size={16} className="shrink-0" />
          ) : (
            <Volume2 size={16} className="shrink-0 animate-pulse" />
          )}
          <span>{isMuted ? "Som Desligado" : "Som Ligado"}</span>
        </button>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6 md:gap-8">
        <img
          src={logo}
          alt="Metaverso Experience"
          className="w-52 sm:w-64 md:w-80 lg:w-[420px] drop-shadow-[0_0_40px_rgba(107,33,168,0.5)]"
        />

        <div className="flex items-start justify-center">
          <CountdownBlock value={days} label="Dias" />
          <CountdownBlock value={hours} label="Horas" />
          <CountdownBlock value={minutes} label="Minutos" />
          <CountdownBlock value={seconds} label="Segundos" />
        </div>

        <p className="text-base sm:text-lg md:text-1xl text-white/80 leading-relaxed max-w-md font-light tracking-wide">
          Faça parte do maior
          <br />
          evento geek do nordeste.
        </p>

        <a
          href="#contato"
          className="inline-block font-display text-sm sm:text-base md:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full border-2 border-white text-white uppercase tracking-[0.15em] transition-all hover:bg-white hover:text-background hover:scale-105"
        >
          Seja um patrocinador
        </a>
      </div>

      {/* Glitch mascot */}
      <img
        src={glitchApresentador}
        alt="Glitch - Mascote do Metaverso Experience"
        className="absolute bottom-4 right-4 md:right-12 w-24 md:w-40 opacity-85 animate-float pointer-events-none drop-shadow-[0_0_30px_rgba(107,33,168,0.6)]"
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
