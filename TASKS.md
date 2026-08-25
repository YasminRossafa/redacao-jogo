# TASKS.md — redacao-jogo

## Engine Build Milestones

- [x] **M1 — Types + Progress Hook**
  - Definir tipos TypeScript para fases, atividades e progresso → `src/engine/types.ts`
  - Implementar hook `useProgress` com leitura/escrita em localStorage → `src/progress/useProgress.ts`
  - ⚠️ Testes unitários pendentes — nenhum test runner configurado no projeto ainda.
    Adicionar Vitest + @testing-library/react antes de M2 para cobrir: unlock logic, error counting, localStorage fallback.

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
