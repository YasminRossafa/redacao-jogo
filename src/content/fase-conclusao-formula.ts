import type { ActivityData } from '../engine/types';

// Each paragraph is stored as an ordered segment list. Non-selectable segments
// carry the opening connective, the joining punctuation, and the inter-sentence
// spaces, so concatenating every `text` reproduces the original paragraph
// exactly. Only the clauses of the proposta de intervenção that can be a quiz
// target are `selectable`.

// ── Paragraph A — saúde (questions 1 & 2) ────────────────────────────────────
const paragraphA = [
  { id: 'a-con', text: 'Portanto, ', selectable: false },
  {
    id: 'a-agente',
    text: 'o Ministério da Saúde deve investir em infraestrutura hospitalar',
    selectable: true,
  },
  { id: 'a-sep1', text: ' ', selectable: false },
  {
    id: 'a-meio',
    text: 'por meio da destinação de verba específica para a contratação de novos profissionais',
    selectable: true,
  },
  { id: 'a-sep2', text: ', ', selectable: false },
  {
    id: 'a-fim',
    text: 'com a finalidade de reduzir a sobrecarga das unidades de saúde',
    selectable: true,
  },
  { id: 'a-sep3', text: '. ', selectable: false },
  {
    id: 'a-det',
    text: 'Em detalhe, é urgente ampliar o número de leitos e equipes médicas em regiões afastadas dos grandes centros.',
    selectable: true,
  },
  { id: 'a-sep4', text: ' ', selectable: false },
  {
    id: 'a-ret',
    text: "Dessa forma, cenários como os retratados em 'Grey's Anatomy', marcados pela escassez de recursos, deixarão de refletir a realidade brasileira.",
    selectable: true,
  },
];

// ── Paragraph B — violência urbana (questions 3 & 4) ─────────────────────────
const paragraphB = [
  { id: 'b-con', text: 'Assim, ', selectable: false },
  {
    id: 'b-agente',
    text: 'as secretarias estaduais de segurança pública devem ampliar o policiamento comunitário',
    selectable: true,
  },
  { id: 'b-sep1', text: ' ', selectable: false },
  {
    id: 'b-meio',
    text: 'por meio da criação de bases fixas em bairros periféricos',
    selectable: true,
  },
  { id: 'b-sep2', text: ', ', selectable: false },
  {
    id: 'b-fim',
    text: 'com o objetivo de reduzir os índices de criminalidade nessas regiões',
    selectable: true,
  },
  { id: 'b-sep3', text: '. ', selectable: false },
  {
    id: 'b-det',
    text: 'Como, por exemplo, o investimento em câmeras de monitoramento e iluminação pública.',
    selectable: true,
  },
  { id: 'b-sep4', text: ' ', selectable: false },
  {
    id: 'b-ret',
    text: "Dessa maneira, o cenário de caos retratado em 'The Walking Dead' permanecerá restrito à ficção, distante da realidade das comunidades brasileiras.",
    selectable: true,
  },
];

export const faseConclusaoFormulaActivities: ActivityData[] = [
  // 1. modo/meio (paragraph A)
  {
    id: 'fase-conclusao-formula-1',
    kind: 'segment-spot',
    prompt: 'Toque na oração que representa o modo/meio.',
    segments: paragraphA,
    targetSegmentId: 'a-meio',
  },

  // 2. detalhamento (paragraph A)
  {
    id: 'fase-conclusao-formula-2',
    kind: 'segment-spot',
    prompt: 'Toque na oração que representa o detalhamento.',
    segments: paragraphA,
    targetSegmentId: 'a-det',
  },

  // 3. agente + ação (paragraph B)
  {
    id: 'fase-conclusao-formula-3',
    kind: 'segment-spot',
    prompt: 'Toque na oração que representa o agente e a ação.',
    segments: paragraphB,
    targetSegmentId: 'b-agente',
  },

  // 4. retomada do repertório (paragraph B)
  {
    id: 'fase-conclusao-formula-4',
    kind: 'segment-spot',
    prompt: 'Toque na oração que representa a retomada do repertório.',
    segments: paragraphB,
    targetSegmentId: 'b-ret',
  },
];
