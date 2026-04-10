import { useRef, useState, useEffect } from "react";
import logo from "@/assets/logo-metaverso.png";
import glitchApresentador from "@/assets/glitch-apresentador.png";
import Particles from "./Particles";
import { Volume2, VolumeX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEventDate } from "@/hooks/useEventDate";
import { useCountdown } from "@/hooks/useCountdown";

const HERO_TAG = "[HERO]";

const CountdownBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-20 h-24 md:w-28 md:h-32 flex items-center justify-center rounded-xl bg-black/60 backdrop-blur-md border border-neon-yellow/30 shadow-[0_0_25px_rgba(255,221,87,0.15)]">
      <span className="font-display text-4xl md:text-6xl text-neon-yellow drop-shadow-[0_0_12px_rgba(255,221,87,0.6)] tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-2 text-xs md:text-sm font-display uppercase tracking-[0.2em] text-foreground/70">
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

  const handleAudioToggle = async () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      try { await videoRef.current?.play(); } catch { setIsMuted(true); }
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
            muted
            playsInline
            preload="metadata"
            src={heroVideoUrl}
          />
        ) : null}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,221,87,0.12),transparent_40%)]" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 halftone pointer-events-none" />
      <Particles />

      {/* Mute/Unmute */}
      {heroVideoUrl && (
        <button
          onClick={handleAudioToggle}
          className="absolute bottom-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-display hover:bg-black/70 transition-colors border border-white/10"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          <span className="hidden sm:inline">{isMuted ? "Som Desligado" : "Som Ligado"}</span>
        </button>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-10">
        {/* Logo */}
        <img
          src={logo}
          alt="Metaverso Experience"
          className="w-56 md:w-80 lg:w-96 drop-shadow-[0_0_40px_rgba(255,221,87,0.3)]"
        />

        {/* Countdown */}
        <div className="flex items-center gap-3 md:gap-6">
          <CountdownBlock value={days} label="Dias" />
          <span className="text-neon-yellow text-3xl md:text-5xl font-display mt-[-1.5rem]">:</span>
          <CountdownBlock value={hours} label="Horas" />
          <span className="text-neon-yellow text-3xl md:text-5xl font-display mt-[-1.5rem]">:</span>
          <CountdownBlock value={minutes} label="Min" />
          <span className="text-neon-yellow text-3xl md:text-5xl font-display mt-[-1.5rem]">:</span>
          <CountdownBlock value={seconds} label="Seg" />
        </div>

        {/* Tagline */}
        <p className="font-display text-xl md:text-3xl lg:text-4xl text-foreground/90 tracking-wide leading-tight max-w-2xl">
          Faça Parte do maior encontro{" "}
          <span className="text-neon-yellow text-glow-yellow">geek</span>{" "}
          do nordeste
        </p>

        {/* CTA Button */}
        <a
          href="#contato"
          className="inline-block font-display text-base md:text-lg px-10 py-4 rounded-lg bg-neon-yellow text-background uppercase tracking-[0.15em] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,221,87,0.4)] border-2 border-neon-yellow/80"
        >
          Seja um Patrocinador 💥
        </a>
      </div>

      {/* Glitch mascot */}
      <img
        src={glitchApresentador}
        alt="Glitch - Mascote do Metaverso Experience"
        className="absolute bottom-4 right-4 md:right-16 w-28 md:w-44 opacity-80 animate-float pointer-events-none drop-shadow-[0_0_30px_rgba(107,33,168,0.6)]"
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-neon-yellow/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-neon-yellow rounded-full animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
