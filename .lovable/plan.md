## Refinar animações da seção Atrações

Ajustes focados em `src/components/AtracoesSection.tsx`:

### 1. Hover dos nós — apenas pulsação suave
- Remover o `scale(1.12)` brusco no hover.
- Substituir por uma **pulsação contínua e sutil** apenas enquanto o mouse está sobre o nó:
  - Animar `r` do círculo entre `NODE_R` e `NODE_R + 4` (ou usar `transform: scale(1) ↔ scale(1.06)`) com duração ~1.2s, ease-in-out, infinito.
  - Glow do `drop-shadow` acompanhando o pulso (intensidade oscilando levemente).
- Manter um leve destaque (cor da conexão acende), mas sem "saltar" o nó.
- Para nós ativos (clicados), aplicar uma escala fixa bem discreta (1.05) sem pulsar, para diferenciar do hover.

### 2. Logo central — sem fundo
- Remover o `<circle>` escuro de fundo (`hsl(270 40% 12% / 0.6)`) e o anel tracejado rosa.
- Manter apenas a `<image>` da logo com `drop-shadow` cyan/magenta para integração com o tema, sem moldura circular.
- Opcional: aumentar levemente a logo (de 180 para ~200) já que o fundo sai.
- As ramificações continuam terminando próximas ao centro (raio ~95–100) para não invadir a logo.

### 3. Pulso percorrendo as ramificações
- Manter o pulso atual (ponto luminoso viajando do nó até o centro), mas:
  - Suavizar com `calcMode="spline"` e easing (`keySplines="0.4 0 0.2 1"`).
  - Reduzir intervalo entre ciclos para 3s.
  - Garantir que a linha da ramificação ativa acenda **gradualmente** (transição de 0.6s) em vez de "piscar".

### 4. Conexões — transições mais suaves
- Aumentar `transition` de 0.5s para 0.6s com `cubic-bezier(0.4, 0, 0.2, 1)`.
- Diferença entre estado inativo/ativo mais sutil: `strokeWidth` 1 → 1.5 (em vez de 1.8) e opacidade do glow reduzida.

### 5. Card de detalhes
- Manter como está, apenas trocar a animação de entrada para `scale-in` (já existe no Tailwind config) para uma aparição mais natural.

### Fora de escopo
- Não alterar layout circular, posições dos nós, paleta, fontes, ou outras seções.
- Não mexer em dados das atrações.
