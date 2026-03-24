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
            Por trás do <span className="text-neon-purple font-semibold">Metaverso Experience</span> está uma agência de marketing e produtora de eventos com experiência em captação, produção, design, tráfego e conteúdo — tudo feito em <span className="text-neon-green font-semibold">João Pessoa</span> com talentos locais.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Nosso compromisso é com o <span className="text-neon-pink font-semibold">fortalecimento da cena geek nordestina</span> e a valorização de artistas e criadores da Paraíba. Acreditamos que a cultura pop é um veículo de transformação, inclusão e entretenimento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SobreSection;
