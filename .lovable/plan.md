

## Plano: Melhorar visual do botão de Som na HeroSection

### Objetivo
Redesenhar o botão de som com visual mais elegante, usando a fonte SuperbusyActivity e um estilo que combine com a identidade visual do projeto.

### Alteração em `src/components/HeroSection.tsx`

Substituir o botão atual (linhas 97-106) por um botão com:

- **Fonte**: `font-display` (SuperbusyActivity) para o texto
- **Visual**: Fundo com gradiente escuro semi-transparente, borda com brilho sutil roxo/ciano, ícone animado com pulse quando som ligado
- **Layout**: Ícone + texto sempre visível (inclusive mobile), com tamanho ajustado
- **Texto**: "SOM LIGADO" / "SOM DESLIGADO" em uppercase com tracking
- **Hover**: Glow sutil e scale leve
- **Mobile**: Texto menor, padding compacto, min-h-[44px] mantido
- **Posição**: Canto inferior esquerdo (mantido)

Estilo inspirado na referência enviada mas com acabamento premium usando a identidade visual do projeto (bordas neon, backdrop blur, fonte customizada).

### Arquivo alterado
- `src/components/HeroSection.tsx` (apenas o bloco do botão de som)

