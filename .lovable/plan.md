

## Plano: Corrigir botão de Som na HeroSection

### Problema
1. **Não funciona**: O vídeo tem o atributo `muted` fixo no JSX (linha 78), então mesmo mudando `videoRef.current.muted` via state, o atributo HTML permanece. Precisa controlar `muted` via ref/state, não via atributo fixo.
2. **Visual fraco**: É apenas um ícone pequeno sem texto, difícil de identificar.
3. **Sem responsividade mobile**: Tamanho fixo, pode ficar apertado.

### Correções em `src/components/HeroSection.tsx`

1. **Remover `muted` fixo do `<video>`** — usar `muted={isMuted}` para que o React controle o atributo dinamicamente.

2. **Refazer o botão de som** com visual melhor:
   - Ícone + texto "Som Ligado" / "Som Desligado"
   - Posição: canto inferior esquerdo (evita conflito com mascote Glitch no canto inferior direito)
   - Estilo: fundo semi-transparente com backdrop-blur, borda sutil, cantos arredondados
   - Mobile: texto menor, padding ajustado, `min-h-[44px]` para área de toque confortável

3. **Corrigir `handleAudioToggle`** — garantir que `play()` é chamado dentro do contexto de gesto do usuário (sincronamente antes do await):
   ```tsx
   const handleAudioToggle = () => {
     if (!videoRef.current) return;
     const next = !isMuted;
     videoRef.current.muted = next;
     setIsMuted(next);
     if (!next) {
       videoRef.current.play().catch(() => {
         videoRef.current!.muted = true;
         setIsMuted(true);
       });
     }
   };
   ```

### Arquivo alterado
- `src/components/HeroSection.tsx`

