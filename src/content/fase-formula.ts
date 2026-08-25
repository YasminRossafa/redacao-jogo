import type { ActivityData } from '../engine/types';

export const faseFormulaActivities: ActivityData[] = [
  {
    id: 'fase-formula-1',
    kind: 'choice',
    prompt: 'Qual é a ordem correta da fórmula da introdução?',
    options: [
      { id: 'a', text: 'Repertório + Tema e Brasil + Problemáticas' },
      { id: 'b', text: 'Tema e Brasil + Repertório + Problemáticas' },
      { id: 'c', text: 'Problemáticas + Repertório + Tema e Brasil' },
    ],
    correctOptionId: 'a',
    explanation:
      'O repertório vem primeiro para contextualizar; depois se conecta ao tema e ao Brasil; as problemáticas fecham a introdução.',
  },
  {
    id: 'fase-formula-2',
    kind: 'choice',
    prompt: 'O que precisa aparecer na parte de Tema + Brasil?',
    options: [
      { id: 'a', text: 'Uma opinião pessoal sobre o tema' },
      { id: 'b', text: 'A relação entre o repertório e o tema, citando o Brasil' },
      { id: 'c', text: 'Uma proposta de solução para o problema' },
    ],
    correctOptionId: 'b',
    explanation:
      'Essa parte não opina nem propõe solução — só conecta o repertório ao tema, trazendo para a realidade brasileira.',
  },
  {
    id: 'fase-formula-3',
    kind: 'choice',
    prompt: 'Quantas problemáticas devem aparecer na introdução?',
    options: [
      { id: 'a', text: 'Apenas 1' },
      { id: 'b', text: 'Exatamente 2' },
      { id: 'c', text: '3 ou mais' },
    ],
    correctOptionId: 'b',
    explanation:
      'As duas problemáticas apresentadas aqui serão retomadas depois, uma em cada parágrafo de desenvolvimento.',
  },
];
