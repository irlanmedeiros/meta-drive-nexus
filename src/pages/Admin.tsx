import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Upload, LogOut, Image, Film, Plus, CalendarCheck2, Save } from "lucide-react";

const ADMIN_USER = "midiaflama";
const ADMIN_PASS = "Vagalume255*";
const HERO_TAG = "[HERO]";

type MediaItem = {
  id: string;
  type: string;
  url: string;
  label: string | null;
  display_order: number;
  created_at: string;
};

const isHeroVideo = (label: string | null) =>
  (label ?? "").trim().toUpperCase().startsWith(HERO_TAG);

const formatVideoLabel = (label: string, hero: boolean) => {
  const cleanLabel = label.trim() || "Video";
  const withoutTag = cleanLabel.replace(/^\[HERO\]\s*/i, "");
  return hero ? `${HERO_TAG} ${withoutTag}` : withoutTag;
};

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [activeTab, setActiveTab] = useState<"photo" | "video">("photo");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLabel, setVideoLabel] = useState("");
  const [settingHeroId, setSettingHeroId] = useState<string | null>(null);
  const [eventDate, setEventDate] = useState("");
  const [savingDate, setSavingDate] = useState(false);
  const [dateSaved, setDateSaved] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === ADMIN_USER && password === ADMIN_PASS) {
      setAuthenticated(true);
      setLoginError("");
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setLoginError("Login ou senha incorretos");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") {
      setAuthenticated(true);
    }
  }, []);

  const fetchMedia = useCallback(async () => {
    const { data } = await supabase
      .from("galeria_media")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setMedia(data);
  }, []);

  useEffect(() => {
    if (authenticated) fetchMedia();
  }, [authenticated, fetchMedia]);

  // Fetch event date
  useEffect(() => {
    if (!authenticated) return;
    const fetchDate = async () => {
      const { data } = await supabase
        .from("event_settings")
        .select("value")
        .eq("key", "event_date")
        .maybeSingle();
      if (data?.value) {
        // Convert to datetime-local format
        const d = new Date(data.value);
        const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
        setEventDate(local);
      }
    };
    void fetchDate();
  }, [authenticated]);

  const handleSaveEventDate = async () => {
    if (!eventDate) return;
    setSavingDate(true);
    const isoDate = new Date(eventDate).toISOString();
    await supabase
      .from("event_settings")
      .update({ value: isoDate, updated_at: new Date().toISOString() })
      .eq("key", "event_date");
    setSavingDate(false);
    setDateSaved(true);
    setTimeout(() => setDateSaved(false), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const fileArr = Array.from(files);
    setUploadProgress({ current: 0, total: fileArr.length });

    let i = 0;
    for (const file of fileArr) {
      i++;
      setUploadProgress({ current: i, total: fileArr.length });
      const ext = file.name.split(".").pop();
      const path = `${activeTab}s/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("galeria")
        .upload(path, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        continue;
      }

      const { data: publicData } = supabase.storage
        .from("galeria")
        .getPublicUrl(path);

      const baseLabel = file.name.replace(/\.[^.]+$/, "");
      const label = activeTab === "video" ? formatVideoLabel(baseLabel, false) : baseLabel;

      await supabase.from("galeria_media").insert({
        type: activeTab,
        url: publicData.publicUrl,
        label,
        display_order: media.length + i,
      });
    }

    setUploading(false);
    setUploadProgress(null);
    fetchMedia();
    e.target.value = "";
  };

  const handleSetHero = async (videoId: string) => {
    setSettingHeroId(videoId);
    // Remove [HERO] tag from all videos
    const videosToReset = media.filter(
      (m) => m.type === "video" && m.id !== videoId && isHeroVideo(m.label)
    );
    for (const v of videosToReset) {
      const cleanLabel = (v.label ?? "Video").replace(/^\[HERO\]\s*/i, "").trim() || "Video";
      await supabase.from("galeria_media").update({ label: cleanLabel }).eq("id", v.id);
    }
    // Tag the selected video
    const target = media.find((m) => m.id === videoId);
    if (target) {
      const newLabel = formatVideoLabel(target.label ?? "Video", true);
      await supabase.from("galeria_media").update({ label: newLabel }).eq("id", videoId);
    }
    setSettingHeroId(null);
    fetchMedia();
  };

  const handleAddVideo = async () => {
    if (!videoUrl.trim()) return;

    let embedUrl = videoUrl.trim();
    const ytMatch = embedUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
    );
    if (ytMatch) {
      embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    await supabase.from("galeria_media").insert({
      type: "video",
      url: embedUrl,
      label: formatVideoLabel(videoLabel || "Video", false),
      display_order: media.length,
    });

    setVideoUrl("");
    setVideoLabel("");
    fetchMedia();
  };

  const handleDelete = async (item: MediaItem) => {
    if (item.url.includes("/storage/")) {
      const path = item.url.split("/galeria/")[1];
      if (path) {
        await supabase.storage.from("galeria").remove([path]);
      }
    }
    await supabase.from("galeria_media").delete().eq("id", item.id);
    fetchMedia();
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="comic-card bg-card p-8 w-full max-w-sm space-y-6"
        >
          <h1 className="font-display text-3xl text-center text-neon-pink">
            🔐 ADMIN
          </h1>
          <p className="text-center text-muted-foreground text-sm">
            Painel de gestao da galeria
          </p>

          {loginError && (
            <div className="bg-destructive/20 text-destructive text-sm p-3 rounded border border-destructive/40 text-center">
              {loginError}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-display text-foreground">Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full bg-background border-2 border-foreground/20 rounded px-3 py-2 text-foreground focus:border-neon-pink outline-none"
              placeholder="Usuario"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-display text-foreground">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border-2 border-foreground/20 rounded px-3 py-2 text-foreground focus:border-neon-pink outline-none"
              placeholder="Senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-neon-pink text-white font-display py-3 rounded-lg hover:brightness-110 transition-all uppercase tracking-wider"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  const photos = media.filter((m) => m.type === "photo");
  const videos = media.filter((m) => m.type === "video");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b-3 border-foreground/20 bg-card">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl text-neon-pink">
            📸 Galeria Admin
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Event Date Config */}
        <div className="comic-card bg-card p-6">
          <h2 className="font-display text-xl mb-4 text-neon-yellow flex items-center gap-2">
            <CalendarCheck2 size={20} /> Configurações do Evento
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 space-y-1">
              <label className="text-sm font-display text-foreground">Data e Hora do Evento</label>
              <input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-background border-2 border-foreground/20 rounded px-3 py-2 text-foreground focus:border-neon-yellow outline-none"
              />
            </div>
            <button
              onClick={handleSaveEventDate}
              disabled={savingDate || !eventDate}
              className="flex items-center gap-2 bg-neon-yellow text-background font-display px-6 py-2 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
            >
              <Save size={16} />
              {savingDate ? "Salvando..." : dateSaved ? "Salvo ✓" : "Salvar Data"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Essa data será usada no countdown timer da página principal.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("photo")}
            className={`flex items-center gap-2 px-6 py-3 font-display rounded-lg border-2 transition-all ${
              activeTab === "photo"
                ? "bg-neon-pink text-white border-neon-pink"
                : "bg-card border-foreground/20 text-muted-foreground hover:border-neon-pink/50"
            }`}
          >
            <Image size={18} /> Fotos
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center gap-2 px-6 py-3 font-display rounded-lg border-2 transition-all ${
              activeTab === "video"
                ? "bg-comic-cyan text-black border-comic-cyan"
                : "bg-card border-foreground/20 text-muted-foreground hover:border-comic-cyan/50"
            }`}
          >
            <Film size={18} /> Videos
          </button>
        </div>

        {activeTab === "photo" ? (
          <div className="comic-card bg-card p-6">
            <h2 className="font-display text-xl mb-4 text-neon-yellow flex items-center gap-2">
              <Upload size={20} /> Upload de Fotos
            </h2>
            <label className="block border-2 border-dashed border-foreground/20 rounded-lg p-8 text-center cursor-pointer hover:border-neon-pink/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
              <Plus size={32} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">
                {uploading
                  ? uploadProgress
                    ? `Enviando ${uploadProgress.current} de ${uploadProgress.total}...`
                    : "Enviando..."
                  : "Clique ou arraste fotos aqui (multiplas permitidas)"}
              </p>
            </label>
          </div>
        ) : (
          <div className="comic-card bg-card p-6 space-y-4">
            <h2 className="font-display text-xl mb-4 text-neon-yellow flex items-center gap-2">
              <Film size={20} /> Adicionar Video
            </h2>

            <p className="text-xs text-muted-foreground">
              💡 Após enviar, use o botão <strong className="text-neon-yellow">"Definir como Hero"</strong> em qualquer vídeo abaixo para escolher qual será o fundo da home.
            </p>

            <div>
              <p className="text-sm text-muted-foreground mb-2 font-display">Upload de arquivos de video (múltiplos permitidos):</p>
              <label className="block border-2 border-dashed border-foreground/20 rounded-lg p-6 text-center cursor-pointer hover:border-comic-cyan/50 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <Plus size={24} className="mx-auto mb-1 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                  {uploading
                    ? uploadProgress
                      ? `Enviando ${uploadProgress.current} de ${uploadProgress.total}...`
                      : "Enviando..."
                    : "Clique para enviar vídeos (selecione vários)"}
                </p>
              </label>
            </div>

            <div className="border-t border-foreground/10 pt-4">
              <p className="text-sm text-muted-foreground mb-2 font-display">Ou cole um link do YouTube:</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={videoLabel}
                  onChange={(e) => setVideoLabel(e.target.value)}
                  placeholder="Titulo do video"
                  className="bg-background border-2 border-foreground/20 rounded px-3 py-2 text-foreground focus:border-comic-cyan outline-none sm:w-1/3"
                />
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="flex-1 bg-background border-2 border-foreground/20 rounded px-3 py-2 text-foreground focus:border-comic-cyan outline-none"
                />
                <button
                  onClick={handleAddVideo}
                  className="bg-comic-cyan text-black font-display px-6 py-2 rounded-lg hover:brightness-110 transition-all"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "photo" && (
          <div>
            <h3 className="font-display text-lg mb-4 text-foreground">
              Fotos ({photos.length})
            </h3>
            {photos.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Nenhuma foto adicionada ainda
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-[4/3] comic-card bg-card overflow-hidden"
                  >
                    <img
                      src={photo.url}
                      alt={photo.label || "Foto"}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleDelete(photo)}
                      className="absolute top-2 right-2 bg-destructive text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                    {photo.label && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                        <p className="text-xs text-white truncate">{photo.label}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "video" && (
          <div>
            <h3 className="font-display text-lg mb-4 text-foreground">
              Videos ({videos.length})
            </h3>
            {videos.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Nenhum video adicionado ainda
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {videos.map((video) => {
                  const isHero = isHeroVideo(video.label);
                  return (
                    <div
                      key={video.id}
                      className={`comic-card bg-card overflow-hidden transition-all ${
                        isHero
                          ? "ring-2 ring-neon-yellow shadow-[0_0_25px_hsl(var(--neon-yellow)/0.4)]"
                          : ""
                      }`}
                    >
                      <div className="aspect-video relative">
                        {video.url.includes("youtube.com/embed") ? (
                          <iframe
                            src={video.url}
                            className="w-full h-full"
                            allowFullScreen
                            title={video.label || "Video"}
                          />
                        ) : (
                          <video
                            src={video.url}
                            controls
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                        )}
                        {isHero && (
                          <span className="absolute top-2 left-2 text-[10px] px-2 py-1 rounded bg-neon-yellow text-background font-display whitespace-nowrap shadow-lg">
                            🎬 HERO ATIVO
                          </span>
                        )}
                      </div>
                      <div className="p-3 space-y-2">
                        <p className="text-sm font-display text-foreground truncate">
                          {(video.label ?? "").replace(/^\[HERO\]\s*/i, "") || "Video"}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleSetHero(video.id)}
                            disabled={isHero || settingHeroId === video.id}
                            className={`flex-1 text-xs font-display px-3 py-2 rounded transition-all ${
                              isHero
                                ? "bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/40 cursor-default"
                                : "bg-foreground/5 hover:bg-neon-yellow hover:text-background border border-foreground/20"
                            } disabled:opacity-60`}
                          >
                            {isHero
                              ? "⭐ É o Hero atual"
                              : settingHeroId === video.id
                              ? "Definindo..."
                              : "⭐ Definir como Hero"}
                          </button>
                          <button
                            onClick={() => handleDelete(video)}
                            className="text-destructive hover:text-destructive/80 transition-colors p-2"
                            aria-label="Deletar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
