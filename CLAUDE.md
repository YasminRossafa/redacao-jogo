# CLAUDE.md — redacao-jogo

## Comandos do Projeto
```bash
npm run dev       # dev server (Vite, port 5173)
npm run build     # production build
npm run preview   # preview production build
npm run lint      # ESLint check
```

## Convenções de Código
- TypeScript strict mode (`"strict": true` em tsconfig)
- CSS Modules para todos os estilos — sem Tailwind, sem CSS framework externo
- Sem biblioteca de estado global (sem Redux, Zustand, etc.) — estado local + Context API quando necessário
- Commits atômicos por feature/milestone

## Estrutura de Pastas
```
src/
  engine/    # componentes de atividade reutilizáveis
  content/   # dados de conteúdo por fase
  progress/  # wrapper localStorage de progresso
  pages/     # páginas no nível de rota
```

## Pegadinhas Conhecidas
- Todo progresso é localStorage — sem backend, sem banco de dados
- Roteamento client-side via react-router-dom (sem SSR)

## Decisões Arquiteturais
- Projeto de jogo educacional para ENEM; estrutura da redação: introdução, desenvolvimento 1, desenvolvimento 2, conclusão
- Fases construídas incrementalmente; engine desacoplada do conteúdo
