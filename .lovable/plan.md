

## Plano: Melhorias no Sistema de Mídia (ADM + Galeria + Hero)

### 1. ADM — Upload e Gestão de Vídeos (`src/pages/Admin.tsx`)

**Upload múltiplo de vídeos:**
- Adicionar atributo `multiple` no input de arquivo de vídeo (atualmente só aceita 1).
- Mostrar progresso `Enviando X de Y...` durante upload em batch.

**Lista/galeria de vídeos com ação "Definir como Destaque":**
- Substituir o checkbox global "Usar este video como fundo do Hero" por um botão **"⭐ Definir como Hero"** em cada card de vídeo da lista.
- Ao clicar: remover a tag `[HERO]` de todos os outros vídeos e aplicar no selecionado (UPDATE no `label`).
- Card do vídeo Hero atual destacado com borda amarela neon e badge "🎬 HERO ATIVO".
- Como a tabela `galeria_media` não tem UPDATE no RLS, vou adicionar via migração: política `UPDATE` para `galeria_media`.

**Organização visual:**
- Cards em grid responsivo, com thumbnail/preview, label editável inline, botão "Definir como Hero", botão deletar.

### 2. HeroSection (`src/components/HeroSection.tsx`)

- Manter lógica atual de buscar vídeo com tag `[HERO]`.
- Adicionar **fallback**: enquanto o vídeo carrega ou se falhar, mostrar uma imagem de poster (overlay com gradiente já existente cobre bem). Usar evento `onLoadedData` para fade-in suave do vídeo.
- Adicionar `poster` no `<video>` (usar primeira foto da galeria ou imagem placeholder existente).

### 3. GaleriaSection — Carrosséis (`src/components/GaleriaSection.tsx`)

Substituir os grids fixos por carrosséis usando o componente `embla-carousel-react` já presente em `src/components/ui/carousel.tsx`.

**Carrossel de Fotos:**
- Desktop: 8 por vez (4 colunas × 2 linhas via grid dentro de cada slide, OU `basis-1/8`). Vou usar `basis-[12.5%]` para 8 visíveis em uma fileira deslizante.
- Tablet: 4 por vez (`md:basis-1/4`).
- Mobile: 2 por vez (`basis-1/2`).
- Setas laterais + suporte a swipe (nativo do Embla).
- `loading="lazy"` mantido nas `<img>`.

**Carrossel de Vídeos:**
- Desktop: 4 por vez (`lg:basis-1/4`).
- Tablet: 2 por vez (`md:basis-1/2`).
- Mobile: 1 por vez (`basis-full`).
- Cada slide mostra **thumbnail/preview** (não auto-play em loop para economizar dados): 
  - Para vídeos do storage: usar `<video preload="metadata">` com `poster` quando disponível, exibindo overlay com botão ▶ play.
  - Para YouTube: thumbnail `https://img.youtube.com/vi/{id}/hqdefault.jpg` com botão play.
- Ao clicar no card → abre **Modal (Dialog)** com player completo (controls, fullscreen, autoplay com som permitido pois é gesto do usuário).

### 4. Modal de Player de Vídeo

- Usar `Dialog` de `src/components/ui/dialog.tsx`.
- Conteúdo: vídeo HTML5 com `controls` ou `<iframe>` do YouTube em `aspect-video`, largura responsiva (max-w-4xl).
- Fechar pausa o vídeo automaticamente (unmount do conteúdo).

### 5. Migração SQL

```sql
-- Permitir UPDATE em galeria_media
CREATE POLICY "Anyone can update gallery media"
ON public.galeria_media FOR UPDATE
USING (true) WITH CHECK (true);
```

### 6. Performance e UX

- `loading="lazy"` em todas as imagens.
- `preload="metadata"` em vídeos do carrossel (não baixa todo o arquivo).
- Thumbnails de YouTube via URL pública (sem custo de banda).
- Modal só monta o player quando aberto.

### Arquivos modificados/criados
- `src/pages/Admin.tsx` (upload múltiplo, botão "Definir Hero" por vídeo)
- `src/components/GaleriaSection.tsx` (carrosséis + modal)
- `src/components/HeroSection.tsx` (fallback/poster + fade-in)
- Migration SQL (RLS UPDATE em `galeria_media`)

