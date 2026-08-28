import type { ActivityData } from '../engine/types';

// Each paragraph is stored as an ordered segment list. Non-selectable segments
// carry the connective, the joining punctuation, and the inter-sentence spaces,
// so concatenating every `text` reproduces the original paragraph exactly. Only
// the four clauses that can be a quiz target are `selectable`.

// ── Paragraph A — acessibilidade / inclusão de surdos (questions 1 & 2) ──────
const paragraphA = [
  { id: 'a-con', text: 'Primeiramente, ', selectable: false },
  {
    id: 'a-prob',
    text: 'destaca-se a falta de acessibilidade nas instituições de ensino como um dos principais entraves à inclusão educacional de surdos,',
    selectable: true,
  },
  {
    id: 'a-mot',
    text: 'uma vez que muitas escolas públicas não possuem intérpretes de Libras disponíveis em tempo integral.',
    selectable: true,
  },
  {
    id: 'a-cit',
    text: 'Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade.',
    selectable: true,
  },
  { id: 'a-sep3', text: ' ', selectable: false },
  {
    id: 'a-arg',
    text: 'Desse modo, a ausência de recursos inclusivos contribui para o sentimento de exclusão, levando ao abandono escolar e à limitação de oportunidades no futuro.',
    selectable: true,
  },
];

// ── Paragraph B — trabalho de cuidado / desvalorização da mulher (questions 3 & 4) ──
const paragraphB = [
  { id: 'b-con', text: 'Em primeiro lugar, ', selectable: false },
  {
    id: 'b-prob',
    text: 'a normalização do trabalho de cuidado com responsabilidade exclusiva da mulher é um problema, ',
    selectable: true,
  },
  {
    id: 'b-mot',
    text: 'pois contribui para sua desvalorização social econômica.',
    selectable: true,
  },
  {
    id: 'b-cit',
    text: 'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
    selectable: true,
  },
  { id: 'b-sep3', text: ' ', selectable: false },
  {
    id: 'b-arg',
    text: 'Apesar desses serviços serem fundamentais para o funcionamento da sociedade, em sua maioria, não são reconhecidos ou remunerados.',
    selectable: true,
  },
];

export const faseD1FormulaActivities: ActivityData[] = [
  // 1. problemática (paragraph A)
  {
    id: 'fase-d1-formula-1',
    kind: 'segment-spot',
    prompt: 'Toque na oração que retoma a problemática — o problema trazido da introdução.',
    segments: paragraphA,
    targetSegmentId: 'a-prob',
  },

  // 2. motivo (paragraph A)
  {
    id: 'fase-d1-formula-2',
    kind: 'segment-spot',
    prompt: 'Toque na oração que apresenta o motivo — a explicação de por que isso é um problema.',
    segments: paragraphA,
    targetSegmentId: 'a-mot',
  },

  // 3. citação (paragraph B)
  {
    id: 'fase-d1-formula-3',
    kind: 'segment-spot',
    prompt: 'Toque na frase que traz a citação — o dado ou fato que reforça a problemática.',
    segments: paragraphB,
    targetSegmentId: 'b-cit',
  },

  // 4. argumento (paragraph B)
  {
    id: 'fase-d1-formula-4',
    kind: 'segment-spot',
    prompt: 'Toque na frase que traz o argumento — o aprofundamento sobre o impacto do problema.',
    segments: paragraphB,
    targetSegmentId: 'b-arg',
  },
];
