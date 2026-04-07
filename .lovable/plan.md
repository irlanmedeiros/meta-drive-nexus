

## Plano: Painel Admin para Upload de Fotos e Vídeos

### Resumo
Criar uma página `/admin` protegida por login simples (login: `midiaflama` / senha: `Vagalume255*`) onde será possível fazer upload de fotos e vídeos do evento. A galeria na página principal exibirá essas mídias dinamicamente.

### Armazenamento
Será necessário configurar o **Lovable Cloud** (Supabase) para:
1. **Bucket de storage** chamado `galeria` (público) para armazenar fotos e vídeos
2. **Tabela `galeria_media`** no banco para registrar os uploads com tipo (foto/vídeo), URL, ordem e data

### Arquivos a criar/editar

**1. Migração SQL** — Criar tabela `galeria_media` e bucket `galeria`
- Campos: `id`, `type` (photo/video), `url` (path no storage), `label`, `order`, `created_at`
- Bucket público para servir as mídias

**2. `src/pages/Admin.tsx`** — Página do painel admin
- Tela de login simples (credenciais fixas no código, sem banco de usuários)
- Após login: interface para upload de fotos (imagens) e vídeos (arquivos ou links do YouTube)
- Lista dos uploads existentes com opção de remover
- Preview das mídias antes de confirmar

**3. `src/App.tsx`** — Adicionar rota `/admin`

**4. `src/components/GaleriaSection.tsx`** — Atualizar para buscar mídias do banco
- Consultar `galeria_media` via Supabase client
- Exibir fotos no grid e vídeos na seção de vídeos
- Manter placeholders quando não houver mídias

**5. `src/integrations/supabase/`** — Configurar client Supabase (se ainda não existir)

### Fluxo
1. Admin acessa `/admin` → digita login/senha → entra no painel
2. Faz upload de fotos/vídeos → arquivos vão para o bucket, registro vai para a tabela
3. Visitante acessa a página principal → galeria carrega mídias do banco automaticamente

### Segurança
- As credenciais ficam hardcoded no frontend (login simples conforme solicitado)
- O bucket será público (leitura), mas uploads serão feitos via client autenticado ou RLS aberta para insert

