# CONTEXT.md — redacao-jogo

## Objetivo
Jogo educacional browser-based para ajudar estudantes do ensino médio a memorizar e praticar a estrutura da redação no formato ENEM.

## Estrutura alvo da redação
1. **Introdução** — apresentação do tema e tese
2. **Desenvolvimento 1** — primeiro argumento com evidência
3. **Desenvolvimento 2** — segundo argumento com evidência
4. **Conclusão** — proposta de intervenção

## Usuário-alvo
Estudantes do ensino médio preparando-se para o ENEM, sem necessidade de conta ou login.

## Decisões de Arquitetura
- **Sem backend, sem banco de dados** — todo progresso persiste em localStorage
- **Roteamento client-side** — react-router-dom, SPA pura
- **Engine desacoplada do conteúdo** — componentes de atividade em `engine/` recebem dados de `content/` via props/dados tipados
- **Fases construídas incrementalmente** — cada fase é uma combinação de atividades da engine com conteúdo específico

## Fases do Jogo (planejado)
- Fase 1: Identificar as partes (OrderPuzzle)
- Fase 2: Classificar trechos (TagMatch)
- Fase 3: Encontrar erros (ErrorSpot)
- Fase 4: Construir do zero (BuildFromScratch)

## Restrições
- Sem dependência de rede em runtime (exceto o carregamento inicial da SPA)
- Sem autenticação — anônimo por design
- Sem CSS framework externo — CSS Modules apenas
