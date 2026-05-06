## Alterações em `src/components/AtracoesSection.tsx`

**1. Clique pausa rotação por 8s**
- Estado `isPaused` + ref `resumeTimerRef`.
- `handleNodeClick(i)` define `activeIndex`, pausa, e agenda `setTimeout(8000)` para retomar.
- `setInterval` que avança índice só roda quando `!isPaused`.
- Unificar: usar apenas `activeIndex` (remover `pulseIndex`) — o card central reflete sempre o ativo.

**2. Trocar emojis por ícones lucide-react**
- Tipo `Atracao.emoji` → `Atracao.Icon: LucideIcon`.
- Mapeamento: CPE→Trophy, K-Pop→Music2, Arena Freeplay→Gamepad2, Card Games→Spade, Laser Tag+VR→Glasses, Shows→Mic2, Artist Alley→Palette, Lojinhas→ShoppingBag, Alimentação→UtensilsCrossed, Influencers→Smartphone, Deck Cultural→Landmark, Apoiadores→Briefcase.
- Renderizar com `color: hsl(<a.color>)` e drop-shadow colorido.

**3. Card central exibe o ícone da atração ativa**
- Remover `logoMetaverso`; renderizar o ícone grande (h-10/h-12) com glow da cor da atração.
- Adicionar `key={activeAtracao.name}` + `animate-scale-in` no card para transição suave ao trocar.

**4. Beam flow**
- O `beam-flow` passa a seguir o nó ativo (em vez do `pulseIndex` separado).

Sem mudanças em layout, paleta, posições ou outras seções.