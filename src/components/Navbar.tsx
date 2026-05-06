import { useState, useEffect } from "react";
import logo from "@/assets/Ativo15.svg";

const navItems = [
  { label: "O Evento", href: "#evento" },
  { label: "Galeria", href: "#galeria" },
  { label: "Atrações", href: "#atracoes" },
  { label: "Números", href: "#numeros" },
  { label: "Público", href: "#publico" },
  { label: "Cotas", href: "#cotas" },
  { label: "Por quê?", href: "#porque" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b-3 border-black shadow-[0_4px_0_hsl(270,76%,50%)]" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#hero" className="font-display text-lg text-neon-yellow text-glow-yellow">
          <img src={logo} alt="Metaverso Experience" className="h-8 w-auto" />
        </a>
        <div className="hidden md:flex gap-6">
          {navItems.map(item => (
            <a key={item.href} href={item.href} className="text-xs font-display uppercase tracking-wider text-muted-foreground hover:text-neon-yellow transition-colors">
              {item.label}
            </a>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b-3 border-black px-4 pb-4">
          {navItems.map(item => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-display uppercase text-muted-foreground hover:text-neon-yellow transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
