## Plano: Detalhes da atração ancorados ao nodo clicado

### Problema atual
Hoje o card de detalhes é renderizado **abaixo do SVG do mapa**, fora do container visível. Como o mapa é alto (viewBox 1600x900), ao clicar em uma estação o card nasce muito abaixo e fica fora da tela — o usuário precisa rolar para vê-lo.

### Solução
Renderizar o card de detalhes **dentro do próprio SVG**, posicionado logo abaixo do nodo ativo (como um "tooltip ancorado"), de forma que apareça imediatamente próximo da estação que o usuário clicou.

### Mudanças em `src/components/AtracoesSection.tsx`

1. **Remover o bloco de card atual** (`<div className="mt-6 min-h-[110px]">...</div>`) que fica fora do mapa.

2. **Adicionar um `<foreignObject>` dentro do SVG**, renderizado apenas quando há atração ativa, posicionado em `(active.x, active.y + 100)`:
   - Largura ~360px, altura ~140px
   - Centralizado horizontalmente no nodo (`x = active.x - 180`)
   - Se o nodo estiver perto da borda direita/esquerda do viewBox (ex: x < 200 ou x > 1400), deslocar o card para dentro para não cortar
   - Se o nodo estiver perto da borda inferior (y > 700), renderizar o card **acima** do nodo em vez de abaixo
   - Conteúdo: HTML normal (div com classe `comic-card`, emoji circular, título, descrição, botão fechar) — mesma identidade visual do card atual

3. **Adicionar uma "setinha" SVG** (pequeno triângulo) conectando o nodo ao card, para reforçar a relação visual.

4. **Animação de entrada**: aplicar `animate-comic-pop` no card via key={active} para re-disparar a animação a cada nova estação selecionada.

5. **Aumentar levemente o `min-h` ou padding-bottom da section** se necessário para acomodar cards próximos à borda inferior do mapa (evitar clipping no overflow-hidden do container do SVG — talvez trocar `overflow-hidden` por `overflow-visible` apenas no eixo Y, mantendo o scroll horizontal).

6. **Mensagem de instrução** (`👆 TOQUE EM UMA ESTAÇÃO...`) passa a aparecer abaixo do mapa apenas quando **nenhuma** estação está ativa, com altura mínima pequena para não criar espaço vazio.

### Resultado esperado
- Clique em qualquer estação → card aparece imediatamente colado ao nodo, visível sem scroll
- Em mobile (scroll horizontal): o card aparece junto do nodo, acompanhando a posição visível
- Borda inferior/lateral: card se reposiciona para nunca sair do mapa

### Arquivos modificados
- `src/components/AtracoesSection.tsx`