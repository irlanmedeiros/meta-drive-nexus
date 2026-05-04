# Reformulação: Atrações como Hub Circular Futurista

Vou substituir o "mapa Overcooked" atual por uma interface circular estilo metaverso/neural-hub, mantendo as 11 atrações e o componente único `src/components/AtracoesSection.tsx`.

## Conceito visual

```text
             [Atração 2]
       [Atração 1]   [Atração 3]
                ╲    ╱
   [Atração 11] ─[ LOGO ]─ [Atração 4]
                ╱    ╲
       [Atração 10]  [Atração 5]
             [...]
```

- Fundo escuro com gradiente radial roxo/azul-marinho profundo, partículas/pontos de "rede" sutis.
- Logo central (`logo-metaverso.png`) dentro de um anel neon com glow pulsante e leve "respiração" (scale 1↔1.04).
- 11 nós distribuídos em círculo (ângulo = i × 360/11), cada um com glow na cor neon da atração.
- Conexões = curvas Bezier orgânicas (não retas) ligando cada nó ao centro, com leve curvatura tangencial — parecem sinapses/fluxo neural.

## Animações de energia

- Cada conexão tem uma linha base sutil (stroke fino, baixa opacidade).
- Sobre cada conexão corre uma "partícula de energia" (pequeno `<circle>` com glow) usando `<animateMotion>` ao longo do path da curva.
- Ciclo global: a cada ~1.2s, o pulso "ativo" muda para a próxima atração no sentido horário → ela acende, sua conexão fica intensa, partícula viaja até o centro; em seguida o centro dispara para o próximo nó. Implementado via `setInterval` em React state `pulseIndex`.
- Quando `pulseIndex === i` ou `hover === i` ou `active === i`: stroke da conexão vira cor neon cheia + filter glow, partícula acelera (dur menor).

## Interação

- Hover: nó faz scale leve, halo expande, conexão correspondente intensifica.
- Clique: abre card de detalhes ancorado ao nó (mantendo a abordagem `foreignObject` já validada antes — card aparece próximo ao nó, com setinha; auto-clamp dentro do viewBox; botão fechar).
- Reaproveitamento do array `atracoes` (mesmos emoji/nome/desc/cor), apenas removendo `x/y` fixos — posições calculadas por trig.

## Detalhes técnicos

Arquivo único alterado: `src/components/AtracoesSection.tsx` (substituição completa do conteúdo do mapa, mantendo wrapper de seção, título e dica abaixo).

Layout SVG:
- viewBox `0 0 1000 1000` (quadrado, melhor para circular). Container com `max-w-[820px] mx-auto` e `aspect-square`. No mobile mantém aspect-square (sem scroll horizontal — ocupa largura total).
- Centro: (500, 500). Raio dos nós: 380. Logo: `<image>` 180×180 centralizada em anel `<circle r=120>` com `filter url(#neonGlow)`.
- Nós: raio 42, com anel externo pulsante quando ativo. Label curto abaixo (rect arredondado preto translúcido + texto branco font-display).
- Defs:
  - `neonGlow` (feGaussianBlur stdDeviation 6 + merge)
  - `strongGlow` (stdDeviation 12) para conexões ativas
  - Gradientes radiais para fundo do anel central (cyan → roxo).
- Conexões: para cada nó, path `M cx cy Q ctrlX ctrlY nodeX nodeY` onde o ponto de controle é deslocado ~30% perpendicular à reta nó-centro, alternando lado por índice par/ímpar → curvas orgânicas.
- Partículas: um `<circle r=5>` por conexão com `<animateMotion dur="3s" repeatCount="indefinite" path="<mesma curva>"/>`. Quando ativa, dur=1s e r=7.

Paleta: usar tokens existentes — `--neon-purple`, `--comic-cyan`, `--neon-blue`, `--neon-pink`. Fundo da seção mantém `radial-burst-purple`.

Responsividade:
- Desktop (>=768px): círculo completo, labels visíveis.
- Mobile (<768px): mesmo layout (SVG escala via `width:100%`); fontes do label reduzidas via `font-size` no SVG (auto-escala com viewBox).

CSS adicional (inline `<style>`):
- `@keyframes breathe { 0%,100% { transform: scale(1) } 50% { transform: scale(1.04) } }` aplicado ao grupo central.
- Ciclo de rotação muito lenta (60s) opcional no anel externo decorativo (não nos nós).

## Fora de escopo

- Sem mudanças em outros componentes, rotas, dados ou Supabase.
- Sem novas dependências — tudo SVG + CSS + React state.
