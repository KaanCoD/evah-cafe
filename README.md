# Evah Checklist — PWA

App instalável do checklist operacional do Evah Café. Funciona offline.

## Arquivos

- `index.html` — o checklist (já com manifest e SW registrados)
- `manifest.json` — define nome, ícones, cores
- `service-worker.js` — cache offline
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png` — ícones

## Como publicar no GitHub Pages

### 1. Criar o repositório

1. Vai em https://github.com/new
2. Nome: `evah-checklist` (ou outro qualquer)
3. **Public** (Pages grátis só funciona em público)
4. Marca "Add a README" e cria

### 2. Subir os arquivos

No repo, clica em **Add file → Upload files** e arrasta TODOS os 7 arquivos desta pasta (menos este README, se quiser). Commit.

### 3. Ligar o Pages

1. **Settings** → **Pages** (menu lateral)
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / `(root)` → **Save**
4. Espera 1-2 min. A URL aparece no topo da página: `https://SEU-USUARIO.github.io/evah-checklist/`

### 4. Testar

Abre a URL no Chrome do celular. Tem que aparecer o checklist com a logo e fundo verde. Sem isso, não adianta seguir.

## Como instalar no celular (cada funcionário faz isso uma vez)

### Android (Chrome)

1. Abre a URL no Chrome
2. Aparece um banner "Instalar Evah Checklist" — toca
3. Se não aparecer: menu (3 pontinhos) → **Instalar app** ou **Adicionar à tela inicial**
4. Vira ícone na home, abre fullscreen, sem barra do navegador

### iPhone (Safari — Chrome no iOS não instala PWA)

1. Abre a URL no **Safari** (não funciona no Chrome iOS)
2. Botão de compartilhar (quadrado com seta pra cima)
3. **Adicionar à Tela de Início**
4. Confirma

## Atualizar o app depois

Sempre que mexer no `index.html` (ou qualquer arquivo):

1. **Abre `service-worker.js` e muda** `CACHE_VERSION = 'evah-v1'` pra `'evah-v2'`, `'v3'`, etc.
2. Sobe os arquivos novos no GitHub
3. Próxima vez que cada celular abrir o app com internet, baixa a versão nova automaticamente

**Sem mudar o CACHE_VERSION, os celulares vão continuar vendo a versão antiga** (é cache offline funcionando como deveria). Esse é o único pulo do gato.

## Funcionamento offline

Primeira vez que o funcionário abre o app, ele baixa tudo. Depois disso, abre sem internet — o checklist roda normal. Só precisa de internet pra:
- Receber atualização (quando você mudar o CACHE_VERSION)
- Primeira abertura

## Distribuir pros funcionários

Manda a URL no grupo do WhatsApp do café com a instrução:
> Abre no Chrome, toca em "Instalar app" quando aparecer. Vira ícone na tela inicial.

Pra iPhone, instrução separada (Safari + Compartilhar + Adicionar à Tela de Início).
