## Reformular seção Atrações: círculo limpo com ramificações da logo

Refazer o layout para ser um **círculo perfeito de atrações** ao redor da logo central, com **linhas retas** saindo da logo (raios/ramificações) até cada nó, e um **pulso percorrendo uma ramificação por vez**, alternando entre as atrações.

### Mudanças em `src/components/AtracoesSection.tsx`

1. **Conexões retas (raios)** — substituir o path com curva (`Q ctrlX ctrlY`) por uma linha reta `M cx cy L x y`. Visual de "ramificações" saindo do centro.

2. **Disposição circular igualmente espaçada** — manter os 11 nós distribuídos em ângulos iguais (`i / N * 2π`), começando do topo. Reduzir levemente o raio para `R = 340` para deixar respiro nas bordas.

3. **Pulso único viajando do nó para o centro** — manter um ponto luminoso que segue o caminho da atração ativa até a logo, e ao terminar avança para a próxima atração (loop). Duração ~2.4s, cor do nó atual.

4. **Estilo das ramificações**:
   - Inativa: `stroke hsl(0 0% 100% / 0.12)`, `strokeWidth 1`
   - Ativa/hover/pulse: `stroke hsl(n.color / 0.9)`, `strokeWidth 1.8`, glow sutil
   - Transição suave de 0.5s

5. **Núcleo da logo** — manter o círculo escuro de fundo + logo, mas adicionar um **anel sutil tracejado** girando lentamente (opcional, bem leve) só para reforçar o "hub central".

6. **Nós** — manter o estilo atual (círculo colorido + emoji + label retangular), apenas garantir que o tamanho `NODE_R = 42` e a escala no hover (1.12) sigam funcionando.

7. **Card de detalhes** — manter como está (posicionado para fora do nó, com borda na cor do nó).

8. **Fundo** — manter `radial-burst-purple` + grid sutil de pontos cyan (já está assim).

### Diagrama do layout

```text
              ●  ←  nó (atração)
             /
            /  ← ramificação reta
           /
        ╔═══╗
        ║LOGO║  ← centro
        ╚═══╝
           \
            \
             \
              ●

       (11 nós em círculo perfeito,
        linhas retas até a logo,
        pulso percorrendo um por vez)
```

### Fora de escopo

- Não mexer em outras seções, paleta global, fontes ou animações globais.
- Não alterar dados das atrações.
