import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import decoCloud from "@/assets/deco-cloud.png";

const SobreSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sobre" className="relative py-24 px-4 overflow-hidden">
      <img src={decoCloud} alt="" className="absolute top-10 left-5 w-40 opacity-10 pointer-events-none hidden md:block" />
      <div ref={ref} className="container mx-auto max-w-4xl text-center">
        <h2 className={`font-display text-3xl md:text-5xl font-bold mb-8 text-glow-blue transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          SOBRE NÓS
        </h2>
        <div className={`rounded-xl p-8 md:p-12 bg-card border border-border transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
            Por trás do <span className="text-neon-purple font-semibold">Metaverso Experience</span> está a <span className="text-neon-green font-semibold">Flama Studio</span>, uma agência de marketing e produtora de eventos que nasce em João Pessoa e é movida por talentos locais.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
            Nosso propósito vai além de criar eventos: trabalhamos para <span className="text-neon-pink font-semibold">fortalecer a cena geek nordestina</span> e impulsionar artistas e criadores da Paraíba, dando visibilidade a quem transforma ideias em cultura.
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
