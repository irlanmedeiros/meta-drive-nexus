import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import decoCloud from "@/assets/deco-cloud.png";
import glitchSedutor from "@/assets/glitch-sedutor.png";

const SobreSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sobre" className="relative py-24 px-4 overflow-hidden halftone">
      <img src={decoCloud} alt="" className="absolute top-10 left-5 w-40 opacity-15 pointer-events-none hidden md:block" />
      <img src={glitchSedutor} alt="Glitch" className="absolute bottom-8 right-4 w-28 md:w-44 opacity-30 pointer-events-none hidden md:block" />

      <div className="absolute bottom-16 left-10 w-12 h-12 bg-neon-yellow starburst opacity-30 hidden md:block" />

      <div ref={ref} className="relative z-10 container mx-auto max-w-4xl text-center">
        <h2 className={`font-display text-4xl md:text-6xl mb-8 text-comic-cyan text-glow-blue transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          SOBRE NÓS 
        </h2>
        <div className={`comic-card bg-card p-8 md:p-12 text-left transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
            Por trás do <span className="text-neon-purple font-display text-xl">Metaverso Experience</span> está a <span className="text-neon-green font-display text-xl">Flama Studio</span>, uma agência de marketing e produtora de eventos que nasce em João Pessoa e é movida por talentos locais.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
            Nosso propósito vai além de criar eventos: trabalhamos para <span className="text-neon-pink font-display text-xl">fortalecer a cena geek nordestina</span> e impulsionar artistas e criadores da Paraíba, dando visibilidade a quem transforma ideias em cultura.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Acreditamos que a cultura pop é uma poderosa ferramenta de transformação, capaz de conectar pessoas, promover inclusão e entregar experiências únicas de entretenimento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SobreSection;
