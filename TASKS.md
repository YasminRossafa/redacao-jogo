# TASKS.md — redacao-jogo

## Engine Build Milestones

- [ ] **M1 — Types + Progress Hook**
  - Definir tipos TypeScript para fases, atividades e progresso
  - Implementar hook `useProgress` com leitura/escrita em localStorage

- [ ] **M2 — OrderPuzzle**
  - Componente de arrastar e soltar (ou clicar em ordem) partes da redação
  - Recebe lista de blocos de texto; valida sequência correta

- [ ] **M3 — TagMatch**
  - Componente de classificação: dado um trecho, o estudante seleciona a qual parte pertence
  - Recebe pares (trecho, rótulo correto)

- [ ] **M4 — ErrorSpot**
  - Componente de identificação de erros: trecho com problemas destacáveis
  - Estudante clica nos trechos incorretos; recebe feedback

- [ ] **M5 — BuildFromScratch**
  - Componente de escrita guiada: campo de texto por seção com checklist de critérios
  - Avaliação local (heurísticas simples de comprimento/palavras-chave)

- [ ] **M6 — Página Orquestradora de Fase**
  - Página que sequencia atividades de uma fase
  - Integra `useProgress` para marcar fase como concluída

- [ ] **M7 — Menu Principal + Roteamento + Conteúdo Dummy**
  - Página de menu listando fases com status (bloqueado/disponível/concluído)
  - Configuração de rotas com react-router-dom
  - Conteúdo dummy para testar o fluxo completo end-to-end
