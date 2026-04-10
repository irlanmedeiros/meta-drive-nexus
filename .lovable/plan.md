

## Plano: Hero com Countdown Timer + Painel Admin para Data do Evento

### Resumo
Redesenhar a HeroSection com um countdown timer central e visual premium, e adicionar ao painel Admin um campo para configurar a data do evento. O timer será alimentado dinamicamente pelo banco de dados.

### 1. Banco de Dados - Nova tabela `event_settings`

Criar uma migration com:
```sql
CREATE TABLE public.event_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.event_settings ENABLE ROW LEVEL SECURITY;

-- Leitura pública (para o timer no frontend)
CREATE POLICY "Anyone can read event_settings"
  ON public.event_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Escrita apenas autenticado (admin usa client anon, mas RLS aberta para insert/update)
CREATE POLICY "Anyone can insert event_settings"
  ON public.event_settings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update event_settings"
  ON public.event_settings FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Inserir data padrão (Outubro 2026)
INSERT INTO public.event_settings (key, value)
VALUES ('event_date', '2026-10-15T09:00:00-03:00');
```

### 2. Hook reutilizavel - `useEventDate`

Novo arquivo `src/hooks/useEventDate.ts`:
- Busca `event_settings` onde `key = 'event_date'`
- Retorna a data como `Date` object
- Usado tanto no HeroSection quanto em qualquer outro timer do site

### 3. Hook - `useCountdown`

Novo arquivo `src/hooks/useCountdown.ts`:
- Recebe um `targetDate: Date`
- Retorna `{ days, hours, minutes, seconds }`
- Atualiza a cada segundo via `setInterval`

### 4. HeroSection - Redesign completo

Estrutura visual (de cima para baixo, centralizado):
1. **Video de fundo** (mantido, com mute/unmute)
2. **Logo** `logo-metaverso.png` centralizada
3. **Countdown Timer** - 4 blocos (DIAS / HORAS / MINUTOS / SEGUNDOS) com visual forte, tipografia Bangers/Orbitron, cores neon
4. **Texto**: "Faça parte do maior encontro geek do nordeste"
5. **Botao CTA**: "SEJA UM PATROCINADOR"
6. **Mascote Glitch** mantido no canto inferior direito
7. **Particulas e decoracoes** mantidas

Estilo do timer inspirado na referencia (numeros grandes, labels pequenos abaixo), adaptado para a estetica HQ/neon do projeto.

### 5. Painel Admin - Campo de data do evento

Adicionar ao `Admin.tsx`:
- Seção "Configuracoes do Evento" com input de data/hora
- Botao "Salvar" que faz upsert na tabela `event_settings`
- Ao salvar, o timer na HeroSection atualiza automaticamente na proxima visita

### 6. Responsividade

- **Mobile**: logo menor, timer com blocos em grid 2x2 ou 4 em linha compacta, botao com largura confortavel
- **Desktop**: composicao central elegante, numeros grandes, boa hierarquia visual

### Arquivos modificados/criados
- `src/hooks/useEventDate.ts` (novo)
- `src/hooks/useCountdown.ts` (novo)
- `src/components/HeroSection.tsx` (reescrito)
- `src/pages/Admin.tsx` (adicionada secao de config)
- Migration SQL (nova tabela `event_settings`)

