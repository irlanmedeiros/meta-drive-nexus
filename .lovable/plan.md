## Redesign: Hub de Atrações Minimalista

Refazer `src/components/AtracoesSection.tsx` com estética premium/minimalista, mantendo as 11 atrações e o layout circular — mas removendo o excesso visual da versão atual (anéis girando, partículas múltiplas, halos coloridos, gradientes pesados).

### Conceito

```text
              · Atração ·
        ·                   ·
   ·         ┌───────┐         ·
              │ LOGO │
   ·         └───────┘         ·
        ·                   ·
              · Atração ·
```

- Fundo escuro quase uniforme (slate/near-black) com degradê radial suave.
- Logo central isolada, sem anéis decorativos pesados — apenas um halo muito sutil.
- 11 nós em círculo: pequenos círculos brancos com borda fina, label clean.
- Conexões: linhas finas (`strokeWidth 1`) brancas com baixa opacidade (~0.15).

### Animação de fluxo (única, sequencial)

Em vez de partículas em todas as conexões + ciclo rápido de 1.4s, terá um único pulso por vez:

- A cada ~3.5s, o `pulseIndex` avança para a próxima atração.
- Apenas a conexão ativa recebe um único ponto de luz suave que vai do nó até o centro (`animateMotion`, ~2.2s, ease-out).
- A linha ativa sobe levemente de opacidade (0.15 → 0.5) e a cor passa de branca para azul/roxo suave.
- Nó ativo recebe glow muito discreto (drop-shadow leve), sem mudança de tamanho brusca.

### Paleta

- Base: branco (`hsl(0 0% 95%)`) e cinza-claro para textos secundários.
- Único destaque: azul suave `hsl(210 90% 70%)` (ou roxo `hsl(260 80% 75%)`) — usado APENAS no pulso ativo e hover.
- Fundo: degradê radial de `hsl(230 25% 8%)` (centro) para `hsl(230 30% 4%)` (bordas).
- Remover uso das cores neon individuais por atração — todas compartilham a mesma paleta neutra para manter coesão.

### Tipografia

- Título da seção: `font-orbitron` (já no projeto) ou Inter light, tracking amplo, peso leve.
- Labels dos nós: Inter, `font-size 14`, branco com 80% opacidade.
- Remover `SuperbusyActivity/Bangers` desta seção (conflita com "premium minimalista").

### Interação

- Hover no nó: scale `1.0 → 1.08` (transition 300ms ease-out), conexão correspondente sobe para opacidade 0.6 e ganha cor de destaque.
- Click: abre card de detalhes (`foreignObject`) ancorado ao nó, com visual minimalista — fundo `bg-background/95 backdrop-blur`, borda fina branca/10, sem glow forte; mesma lógica de clamp dentro do viewBox.
- Sem `setActive(null)` automático; botão `×` discreto no canto.

### Mudanças técnicas em `AtracoesSection.tsx`

1. Remover do SVG: anéis rotativos (`ring-rotate-slow/rev`), gradiente roxo `bgRadial`, `coreRing`, halos coloridos por nó, partícula em todas as conexões, `strongGlow`.
2. Manter: cálculo trig dos nós, paths Bezier (mas com curvatura menor — offset de 90 → 30, quase reto), `foreignObject` do detail card.
3. Adicionar: um único `<circle>` de partícula renderizado apenas para `pulseIndex` corrente, com `<animateMotion key={pulseIndex}>` para reiniciar a cada troca.
4. Trocar `setInterval` 1400ms → 3500ms.
5. Remover gradientes do background da seção (`radial-burst-purple`) e o grid de pontos cyan — substituir por um `bg` sólido escuro com um `radial-gradient` sutil inline.
6. Simplificar `<defs>`: manter apenas um `softGlow` com `stdDeviation 2`.
7. Logo central: `<image>` 160×160 com `drop-shadow` muito sutil (`0 0 20px hsl(210 90% 70% / 0.25)`), sem círculos sobrepostos — opcionalmente um único `<circle r=110>` com stroke branco/10.
8. Container: manter `aspect-square max-w-[820px]`.

### Responsividade

- Mantém o SVG responsivo com `viewBox 0 0 1000 1000` e `width:100%`.
- Em mobile, `font-size` dos labels via SVG escala automaticamente.

### Fora de escopo

- Sem mexer em outros componentes ou no tema global.
- Sem novas dependências.
- Manter dados/atrações inalterados.
