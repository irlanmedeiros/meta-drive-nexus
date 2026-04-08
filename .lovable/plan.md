

## Correção: HeroSection.tsx com conflitos de merge

O arquivo `HeroSection.tsx` contém marcadores de conflito Git (`<<<<<<< HEAD`, `=======`, `>>>>>>> parent of`) que quebram o TypeScript.

### Solução
Reescrever o `HeroSection.tsx` removendo os conflitos e mantendo a versão com vídeo dinâmico (que busca do banco) + botão mute/unmute, já que o admin de galeria foi implementado.

### Arquivo: `src/components/HeroSection.tsx`
- Remover todos os marcadores de conflito (`<<<<<<<`, `=======`, `>>>>>>>`)
- Manter a versão com `useRef`, `useState`, `useEffect` para buscar vídeo hero do banco (`galeria_media`)
- Manter botão de mute/unmute com ícones `Volume2`/`VolumeX`
- Manter gradientes sobre o vídeo de fundo
- Preservar todo o conteúdo visual (logo, badges, mascote, partículas)

