# Ajustes responsivos mobile

Foco principal: **Atrações** (atualmente a órbita circular de 12 ícones fica espremida e ilegível no mobile). Ajustes secundários nas outras seções para padding/tipografia/espaçamento.

## 1. Atrações (`src/components/AtracoesSection.tsx`)

Hoje no mobile o SVG circular ocupa quase toda a tela, os ícones se sobrepõem ao card central e o texto fica ilegível.

**Solução: dois layouts via `useIsMobile()` (já existe em `src/hooks/use-mobile.tsx`).**

### Layout mobile (< 768px)
- Esconder a órbita circular completamente.
- Renderizar:
  1. **Card central destacado no topo** (mesmo card atual, full width, com ícone grande, nome e descrição). Mantém o auto-rotate de 8 em 8s e o `animate-scale-in` na troca.
  2. **Grid 4 colunas de ícones** abaixo (12 atrações = 3 linhas). Cada item: círculo pequeno (h-14 w-14) com o `Lucide Icon` colorido + nome curto abaixo (text-[10px]).
  3. Item ativo recebe `ring-2`, `scale-110` e box-shadow colorido para destacar.
  4. Click pausa auto-rotate por 8s (mesma lógica do `handleNodeClick`).
- Remover decorações flutuantes pesadas no mobile (já estão `hidden md:block`).

### Layout desktop (≥ 768px)
- Mantém a órbita atual sem alterações além de tornar o container responsivo (já está `aspect-square w-full max-w-5xl`).

### Detalhes técnicos
- Importar `useIsMobile` e fazer um `if (isMobile) return <MobileView/>` dentro do componente.
- Compartilhar `activeIndex`, `isPaused`, `handleNodeClick`, `useEffect` do auto-rotate entre os dois (definidos uma vez no componente pai).
- O título "ATRAÇÕES" continua acima de ambos.

## 2. Hero (`src/components/HeroSection.tsx`)
- Countdown: no mobile os blocos de `px-3` ficam apertados. Reduzir para `px-2 sm:px-3 md:px-5` e diminuir o `text-4xl` para `text-3xl` em telas < 360px usando `text-[28px] xs:text-4xl`. Reduzir o gap entre números.
- Mascote Glitch (bottom-right) sobrepõe o botão CTA "Seja um patrocinador" no mobile — reduzir para `w-20` no mobile e ajustar `bottom-2 right-2`.
- Scroll indicator (bottom center) também conflita com o mascote/áudio button — esconder no mobile (`hidden sm:flex`).

## 3. Cotas (`src/components/CotasSection.tsx`)
- Card MASTER: o grid `md:grid-cols-3` de benefícios fica bom, mas o padding `p-8 md:p-10` pode reduzir para `p-6 md:p-10` no mobile.
- Botão "Quero a cota Master" com `text-lg px-10` quebra em telas pequenas — usar `text-base sm:text-lg px-6 sm:px-10`.

## 4. Números (`src/components/NumerosSection.tsx`)
- Já é `grid-cols-2 md:grid-cols-4`, ok. Apenas reduzir gap mobile e tipografia do `font-display text-3xl` para `text-2xl sm:text-3xl` para caber melhor em telas pequenas.

## 5. Galeria (`src/components/GaleriaSection.tsx`)
- No mobile não há setas de navegação no carrossel. Adicionar dots/indicadores simples ou habilitar setas pequenas inline em mobile (mostrar `CarouselPrevious/Next` em todas as telas com tamanho menor `h-8 w-8`).

## 6. Navbar (`src/components/Navbar.tsx`)
- Menu mobile abre OK. Apenas garantir que o `nav` seja `z-50` (já é) e que tenha um shadow no estado aberto.

## 7. Sobre / Por Que / Público / Contato
- Apenas reduzir paddings de seções de `py-24` para `py-16 md:py-24` para reduzir espaço vertical excessivo no mobile.
- ContatoSection: o `text-4xl md:text-6xl` do título quebra mal. Trocar para `text-3xl sm:text-4xl md:text-6xl`.

## Fora do escopo
- Mudar paleta, tipografia, posições da órbita desktop, conteúdo textual.
- Refatorar o sistema de auto-rotate além do necessário para compartilhar entre layouts.

## Arquivos a editar
- `src/components/AtracoesSection.tsx` (principal)
- `src/components/HeroSection.tsx`
- `src/components/CotasSection.tsx`
- `src/components/NumerosSection.tsx`
- `src/components/GaleriaSection.tsx`
- `src/components/ContatoSection.tsx`
- `src/components/SobreSection.tsx`, `PublicoSection.tsx`, `PorQueSection.tsx`, `EventoSection.tsx` (apenas padding `py-16 md:py-24`)
