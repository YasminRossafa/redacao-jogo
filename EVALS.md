# EVALS.md — redacao-jogo

## M1 — Types + Progress Hook
### Critérios de Aceitação
- `ActivityData` cobre os 4 kinds com discriminação correta por `kind`
- `useProgress` persiste estado no localStorage sob a chave `redacao-jogo:progress`
- Falha silenciosa (sem crash) quando localStorage não está disponível; emite um único `console.warn`
- `unlockPhase` é idempotente — chamar duas vezes não duplica o id na lista

---

## M2 — OrderPuzzle
### Critérios de Aceitação
- Itens nunca aparecem na ordem correta ao montar o componente
- Toque em bloco da pool move para o próximo slot vazio; toque em bloco colocado devolve à pool
- Conferir com slots incompletos exibe mensagem inline sem desabilitar o botão
- Conferir com ordem incorreta marca slots errados em vermelho sem revelar a resposta
- Conferir com ordem correta chama `onComplete(true)` e exibe estado de sucesso

---

## M3 — TagMatch
### Critérios de Aceitação
- Toque em frase → toque em categoria (ou vice-versa) cria associação
- Toque na mesma frase selecionada desfaz o link
- Badge na categoria reflete contagem de frases associadas
- Cor de cada par frase↔categoria é consistente e distinta entre pares
- Conferir incompleto exibe aviso inline
- Conferir incorreto marca frases erradas em vermelho; retry limpa o estado

---

## M4 — ErrorSpot
### Critérios de Aceitação
- Toque seleciona frase; segundo toque na mesma frase não a deseleciona (permanece selecionada)
- Conferir sem seleção exibe aviso amber inline
- Resposta correta: bloco fica verde, explicação aparece, `onComplete(true)` chamado
- Resposta errada: bloco fica vermelho, frase correta fica verde com label "← com erro", explicação aparece, `onComplete(false)` chamado
- Retry limpa seleção e estado de feedback

---

## M5 — BuildFromScratch
### Critérios de Aceitação
- Todos os fragmentos (corretos + distratores) embaralhados e visualmente idênticos
- Slots crescem dinamicamente conforme fragmentos são selecionados
- Toque em slot colocado devolve fragmento à pool
- Conferir desabilitado com zero fragmentos; habilitado com ≥ 1
- Feedback "wrong-set" e "wrong-order" são mensagens distintas
- Retry reembaralha tudo na pool

---

## M6 — Página Orquestradora de Fase
### Critérios de Aceitação
- Progresso `1/N` reflete a atividade atual no cabeçalho
- Botão "Próxima atividade →" aparece somente após `onComplete(true)`; nunca após `onComplete(false)`
- Trocar de atividade reseta completamente o estado do componente anterior (via `key`)
- Ao concluir a última atividade, próxima fase é desbloqueada e tela de conclusão é exibida
- Botão "← Menu" na conclusão navega para "/" e o menu já mostra a nova fase desbloqueada

---

## M7 + Conteúdo Real — Motor funciona fim a fim (Fase 1)
### Critérios de Aceitação

**Fluxo completo:**
- [ ] Abrir "/" mostra fase 1 desbloqueada e fases 2–5 bloqueadas
- [ ] Toque em fase 1 navega para "/fase/fase1"
- [ ] Completar OrderActivity (acerto) exibe "Próxima atividade →"
- [ ] Completar TagMatchActivity (acerto) exibe "Próxima atividade →"
- [ ] Completar ErrorSpotActivity (acerto) exibe "Próxima atividade →"
- [ ] Completar BuildActivity (acerto) exibe "Concluir fase →"
- [ ] Toque em "Concluir fase →" exibe tela de conclusão mencionando fase 2
- [ ] Toque em "← Voltar ao menu" mostra fase 2 desbloqueada no menu

**Persistência:**
- [ ] Recarregar a página no meio de uma fase mantém o progresso (fase 1 ainda desbloqueada)
- [ ] Recarregar após concluir fase 1 mantém fase 2 desbloqueada no menu

**Conteúdo (tema: desinformação no Brasil):**
- [ ] OrderActivity: 4 blocos embaralhados; sequência correta é repertório → tema+Brasil → prob1 → prob2
- [ ] TagMatch: 4 frases corretas; mapping 1:1 para as 4 tags
- [ ] ErrorSpot: problemática 2 genérica é a frase com erro; explicação é exibida após a resposta
- [ ] Build: 7 fragmentos (4 corretos + 3 distratores); só os 4 corretos na ordem certa passam

**Falhas inaceitáveis:**
- Atividade avança sem `onComplete(true)`
- Rota "/fase/inexistente" causa crash (deve redirecionar para "/")
- Progresso perdido ao recarregar
- Distrator aceito como fragmento correto no Build

---

## Falhas Inaceitáveis (globais)
- Progresso perdido ao recarregar a página
- Rota inexistente causa crash sem fallback
- Atividade aceita resposta errada como correta
