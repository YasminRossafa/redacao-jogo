import type { ActivityData } from '../engine/types';

// Each paragraph is stored as an ordered segment list. Non-selectable segments
// carry the connective, the joining punctuation, and the inter-sentence spaces,
// so concatenating every `text` reproduces the original paragraph exactly. Only
// the four clauses that can be a quiz target are `selectable`.

// ── Paragraph A — preconceito (questions 1 & 2) ──────────────────────────────
const paragraphA = [
  { id: 'a-con', text: 'Em segundo lugar, ', selectable: false },
  {
    id: 'a-prob',
    text: 'evidencia-se a ausência de punição a atos de exclusão como um fator que perpetua o preconceito na sociedade brasileira',
    selectable: true,
  },
  { id: 'a-sep1', text: ', ', selectable: false },
  {
    id: 'a-mot',
    text: 'visto que a impunidade reforça a sensação de normalidade em relação a comportamentos discriminatórios',
    selectable: true,
  },
  { id: 'a-sep2', text: '. ', selectable: false },
  {
    id: 'a-cit',
    text: 'Segundo o filósofo Zygmunt Bauman, a modernidade líquida enfraquece os vínculos de responsabilidade coletiva, tornando mais fácil ignorar o sofrimento alheio.',
    selectable: true,
  },
  { id: 'a-sep3', text: ' ', selectable: false },
  {
    id: 'a-arg',
    text: 'Logo, a falta de consequências para atitudes excludentes contribui para a manutenção de uma cultura de indiferença, dificultando avanços reais na construção de uma sociedade mais igualitária.',
    selectable: true,
  },
];

// ── Paragraph B — meio ambiente (questions 3 & 4) ────────────────────────────
const paragraphB = [
  { id: 'b-con', text: 'Ademais, ', selectable: false },
  {
    id: 'b-prob',
    text: 'destaca-se a fiscalização insuficiente contra o desmatamento como um entrave à preservação ambiental no Brasil',
    selectable: true,
  },
  { id: 'b-sep1', text: ', ', selectable: false },
  {
    id: 'b-mot',
    text: 'uma vez que a falta de agentes de controle permite a expansão de atividades ilegais em áreas protegidas',
    selectable: true,
  },
  { id: 'b-sep2', text: '. ', selectable: false },
  {
    id: 'b-cit',
    text: "Conforme o filósofo Hans Jonas, em sua obra 'O Princípio Responsabilidade', as gerações atuais têm o dever ético de garantir a continuidade da vida no planeta.",
    selectable: true,
  },
  { id: 'b-sep3', text: ' ', selectable: false },
  {
    id: 'b-arg',
    text: 'Assim, a leniência na fiscalização compromete não apenas os ecossistemas atuais, mas também o futuro das próximas gerações.',
    selectable: true,
  },
];

export const faseD2FormulaActivities: ActivityData[] = [
  // 1. citação (paragraph A)
  {
    id: 'fase-d2-formula-1',
    kind: 'segment-spot',
    prompt: 'Toque na oração que representa a citação.',
    segments: paragraphA,
    targetSegmentId: 'a-cit',
  },

  // 2. argumento (paragraph A)
  {
    id: 'fase-d2-formula-2',
    kind: 'segment-spot',
    prompt: 'Toque na oração que representa o argumento.',
    segments: paragraphA,
    targetSegmentId: 'a-arg',
  },

  // 3. problemática (paragraph B)
  {
    id: 'fase-d2-formula-3',
    kind: 'segment-spot',
    prompt: 'Toque na oração que representa a problemática.',
    segments: paragraphB,
    targetSegmentId: 'b-prob',
  },

  // 4. motivo (paragraph B)
  {
    id: 'fase-d2-formula-4',
    kind: 'segment-spot',
    prompt: 'Toque na oração que representa o motivo.',
    segments: paragraphB,
    targetSegmentId: 'b-mot',
  },
];
