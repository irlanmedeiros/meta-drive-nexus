import logo from "@/assets/logo-metaverso.png";
import decoScribble from "@/assets/deco-scribble.png";
import glitchApresentador from "@/assets/glitch-apresentador.png";
import Particles from "./Particles";
<<<<<<< HEAD
<<<<<<< HEAD
import { AlarmClockCheck, CalendarCheck2, MapPinX, Volume2, VolumeX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const HERO_TAG = "[HERO]";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [heroVideoUrl, setHeroVideoUrl] = useState("");

  useEffect(() => {
    const fetchHeroVideo = async () => {
      const { data, error } = await supabase
        .from("galeria_media")
        .select("url, label, created_at")
        .eq("type", "video")
        .order("created_at", { ascending: false });

      if (error || !data) {
        return;
      }

      const cloudVideos = data.filter((item) => !item.url.includes("youtube.com/embed"));
      const taggedHero = cloudVideos.find((item) =>
        (item.label ?? "").trim().toUpperCase().startsWith(HERO_TAG)
      );

      const selected = taggedHero ?? cloudVideos[0];
      if (selected?.url) {
        setHeroVideoUrl(selected.url);
      }
    };

    void fetchHeroVideo();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleAudioToggle = async () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      try {
        await videoRef.current?.play();
      } catch {
        setIsMuted(true);
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden radial-burst">
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/55 to-background/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,221,87,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(107,33,168,0.25),transparent_28%)]" />
      </div>

=======
import { MapPinX, CalendarCheck2, AlarmClockCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden radial-burst">
>>>>>>> parent of 868a184 (Atualizacao do design)
=======
import { MapPinX, CalendarCheck2, AlarmClockCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden radial-burst">
>>>>>>> parent of 868a184 (Atualizacao do design)
      <div className="absolute inset-0 halftone pointer-events-none" />
      <Particles />

      {/* Comic starburst decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-neon-pink starburst opacity-60 hidden md:block animate-float" />
      <div className="absolute bottom-32 left-20 w-14 h-14 bg-neon-yellow starburst opacity-50 hidden md:block" style={{ animationDelay: "1s" }} />
      <div className="absolute top-40 right-20 w-16 h-16 bg-comic-cyan starburst opacity-40 hidden md:block animate-float" style={{ animationDelay: "2s" }} />

      {/* Decorative element */}
      <img src={decoScribble} alt="" className="absolute top-10 right-10 w-32 opacity-30 animate-float pointer-events-none hidden md:block" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-glitch-color mb-6">
          <img src={logo} alt="Metaverso Experience" className="mx-auto w-72 md:w-96 drop-shadow-2xl" />
        </div>

        <p className="font-display text-2xl md:text-4xl text-neon-yellow text-glow-yellow mb-4 tracking-wider">
          O maior encontro Jovem do Nordeste
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-muted-foreground font-body mb-2">
          <span className="flex items-center gap-2 bg-card/60 px-4 py-1 rounded-full border-2 border-border"><MapPinX /> Usina Cultural Energisa — João Pessoa, PB</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-muted-foreground font-body mb-8">
          <span className="flex items-center gap-2 bg-card/60 px-4 py-1 rounded-full border-2 border-border"><CalendarCheck2 /> Outubro / Novembro 2026</span>
          <span className="flex items-center gap-2 bg-card/60 px-4 py-1 rounded-full border-2 border-border"><AlarmClockCheck  /> 3 dias de evento</span>
        </div>

        <a
          href="#contato"
          className="inline-block font-display text-lg md:text-xl px-8 py-4 rounded-lg bg-neon-yellow text-background uppercase tracking-widest transition-all hover:scale-105 comic-card border-4 border-black"
        >
          Seja um Patrocinador 💥
        </a>
      </div>

      {/* Glitch mascot */}
      <img src={glitchApresentador} alt="Glitch - Mascote do Metaverso Experience" className="absolute bottom-4 right-4 md:right-16 w-36 md:w-56 opacity-90 animate-float pointer-events-none drop-shadow-[0_0_30px_rgba(107,33,168,0.6)]" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-3 border-neon-yellow flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-neon-yellow rounded-full animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
