# TASKS.md — redacao-jogo

## Engine Build Milestones

- [x] **M1 — Types + Progress Hook**
  - Definir tipos TypeScript para fases, atividades e progresso → `src/engine/types.ts`
  - Implementar hook `useProgress` com leitura/escrita em localStorage → `src/progress/useProgress.ts`
  - ⚠️ Testes unitários pendentes — nenhum test runner configurado no projeto ainda.
    Adicionar Vitest + @testing-library/react antes de M2 para cobrir: unlock logic, error counting, localStorage fallback.

- [x] **M2 — OrderPuzzle** → `src/engine/OrderPuzzle.tsx`

- [x] **M3 — TagMatch** → `src/engine/TagMatch.tsx`

- [x] **M4 — ErrorSpot** → `src/engine/ErrorSpot.tsx`

- [x] **M5 — BuildFromScratch** → `src/engine/BuildFromScratch.tsx`

- [x] **M6 — Página Orquestradora de Fase** → `src/pages/Fase.tsx`
  - Sequencia atividades; avança só após onComplete(true)
  - Desbloqueia próxima fase ao concluir; unlock persiste via localStorage

- [x] **M7 — Menu Principal + Roteamento + Conteúdo Real (Fase 1)**
  - `src/pages/Menu.tsx` — lista 5 fases com estado bloqueado/desbloqueado
  - `src/content/fase1-introducao.ts` — 4 atividades com conteúdo real (tema: desinformação no Brasil)
  - `src/content/index.ts` — registry de conteúdo + metadados de fases
  - `src/App.tsx` — BrowserRouter + Routes (`/` e `/fase/:phaseId`)

## Próximos passos

- [ ] **Testes (pendente desde M1)** — adicionar Vitest + @testing-library/react; cobrir useProgress e lógica dos componentes
- [ ] **Conteúdo fase 2** — Desenvolvimento 1
- [ ] **Conteúdo fase 3** — Desenvolvimento 2
- [ ] **Conteúdo fase 4** — Conclusão
- [ ] **Conteúdo fase 5** — Redação completa
