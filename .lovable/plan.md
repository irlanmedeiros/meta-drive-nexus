## Ajuste: restaurar fundo original na seção Atrações

Manter o layout circular minimalista atual, mas voltar ao fundo que existia antes (degradê roxo `radial-burst-purple` + grid sutil de pontos cyan), removendo o fundo preto chapado.

### Mudanças em `src/components/AtracoesSection.tsx`

1. **Section wrapper** — trocar o `style={{ background: radial-gradient... preto }}` de volta para `className="... radial-burst-purple"` (classe utilitária já existente no projeto).
2. **Reintroduzir o overlay de grid** de pontos cyan sutis (`opacity-20`, espaçamento 32px) como camada absoluta atrás do conteúdo.
3. **Manter intacto** todo o resto do componente: nós minimalistas, conexões finas, pulso único azul suave, logo central, card de detalhes.
4. Ajustar levemente o stroke das conexões inativas para `hsl(0 0% 100% / 0.12)` para garantir contraste sobre o fundo roxo (em vez do quase invisível 0.1 atual sobre preto).

### Fora de escopo

- Sem alterar a animação, paleta de destaque (azul) ou tipografia.
- Sem mexer em outros componentes.
