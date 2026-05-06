import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-neon-yellow text-background font-display text-xl comic-card flex items-center justify-center hover:scale-110 transition-all rounded-full"
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="w-6 h-6" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
