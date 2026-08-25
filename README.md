# Jogo da Redação ENEM

Jogo web para alunos memorizarem a estrutura da redação nota 1000 do ENEM. O progresso é dividido em fases (Introdução, Desenvolvimento 1, Desenvolvimento 2, Conclusão, Redação Completa) e salvo diretamente no `localStorage` do navegador — sem backend nem banco de dados.

## Stack

- **Vite + React + TypeScript** — sem bibliotecas de estado externas (sem Redux, Zustand etc.)
- CSS Modules para todos os estilos
- PWA instalável via `manifest.webmanifest`

## Como rodar localmente

```bash
npm install
npm run dev
```

O endereço local (geralmente `http://localhost:5173`) aparece no terminal após o servidor iniciar.

## Build de produção

```bash
npm run build       # gera a pasta dist/
npm run preview     # sobe um servidor local para testar o build
```

## Estrutura de pastas

```
src/
  engine/    # componentes de atividade reutilizáveis (OrderPuzzle, TagMatch, ErrorSpot, BuildFromScratch)
  content/   # dados de conteúdo por fase — editável sem mexer no motor
  progress/  # persistência via localStorage (useProgress.ts)
  pages/     # páginas no nível de rota (Menu, Fase)
```

## Como editar o conteúdo de uma fase

Os dados de cada fase ficam em `src/content/`. Por exemplo, as atividades da Introdução estão em `src/content/fase1-introducao.ts`.

Cada atividade segue um dos tipos definidos em `src/engine/types.ts` (`order`, `tag-match`, `error-spot`, `build`). Para adicionar ou alterar atividades, edite o arquivo de conteúdo correspondente sem precisar tocar nos componentes do motor.

## Como instalar no celular (PWA)

O jogo pode ser instalado como aplicativo direto na tela inicial, sem passar pela loja de aplicativos.

**Android (Chrome):**
1. Acesse o jogo no Chrome.
2. Toque no menu (⋮) no canto superior direito.
3. Selecione **"Adicionar à tela inicial"** (ou "Instalar aplicativo").
4. Confirme o nome e toque em **Adicionar**.

**iOS (Safari):**
1. Acesse o jogo no Safari.
2. Toque no ícone de **compartilhar** (quadrado com seta para cima) na barra inferior.
3. Role e selecione **"Adicionar à Tela de Início"**.
4. Confirme o nome e toque em **Adicionar**.

> **Importante:** Após instalar, abra o jogo sempre pelo ícone na tela inicial — não pelo navegador embutido de aplicativos de mensagens (WhatsApp, Instagram etc.). Isso garante que o progresso salvo no dispositivo seja preservado entre as sessões.

## Aviso sobre localStorage

O progresso fica salvo no navegador e no aparelho usados para jogar. Limpar os dados do navegador ou usar um dispositivo diferente apaga o progresso salvo.
