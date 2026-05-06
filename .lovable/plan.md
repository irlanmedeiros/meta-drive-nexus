## Programação — TV única responsiva

Substituir o layout atual (TV horizontal + TV vertical separadas) por **uma única TV** (asset transparente novo `Asset_3-2.png`) com fundo roxo liso. As atrações passam dentro da tela da TV, em loop, e o grid de ícones fica abaixo.

### Mudanças

**Asset**
- Copiar `user-uploads://Asset_3-2.png` para `src/assets/tv-transparent.png` (TV em PNG transparente, mesma para todos os tamanhos).
- Remover dependência de `tv-bg.png` e `tv-bg-vertical.png` no componente.

**`src/components/AtracoesSection.tsx` (rewrite)**
- Fundo: cor roxa lisa (`hsl(280 50% 14%)`), sem radial burst nem decorações flutuantes.
- Título: `PROGRAMAÇÃO` (mantém estilo cyan glow).
- Subtítulo: "Confira a nossa programação no Canal Metaverso. Clique em cada atração para ver os detalhes — ou apenas relaxe e assista."
- Container único centralizado (`max-w-3xl`) com:
  1. **TV**: `<img>` da TV em `aspect-ratio: 1944/1296` (proporção do PNG). Sobre ela, um overlay absoluto posicionado em % cobrindo apenas a área da tela preta (~`left:26%`, `top:33%`, `width:41%`, `height:47%`).
  2. Dentro da tela: ícone Lucide grande + nome + descrição da atração ativa, com `animate-scale-in` na troca. Tipografia escala com breakpoints (`text-[11px] sm:text-base md:text-2xl`) para caber em qualquer tamanho.
  3. **Grid abaixo da TV**: 4 colunas no mobile, 6 colunas em ≥sm; cada item é botão clicável, com glow e ring quando ativo.
- Auto-rotate a cada 4.5s; clique pausa por 8s e depois volta o loop (lógica já existente preservada).
- Como é uma TV só, não precisa mais do `useIsMobile` — fica tudo responsivo via Tailwind/percentuais.

### Detalhes técnicos
- Coordenadas da tela em % do PNG (medidas no asset enviado): `left 26.2%, top 32.5%, width 41.2%, height 46.5%`. Caso fique levemente fora, ajustar em ±1%.
- `overflow-hidden` no overlay da tela para garantir que textos longos não vazem.
- `line-clamp-3` na descrição.
- Manter cores HSL via design tokens (`text-comic-cyan`, `text-glow-blue`).

### Fora do escopo
- Outras seções, fontes, paleta global, conteúdo das 12 atrações.
