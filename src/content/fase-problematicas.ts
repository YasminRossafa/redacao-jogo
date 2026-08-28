import type { ActivityData } from '../engine/types';
import { TEMA_BANK } from './shared-bank';

const get   = (id: string) => TEMA_BANK.find((e) => e.id === id)!;
const rep   = (id: string) => get(id).repertorio;
const tb    = (id: string) => get(id).temaBrasil;
const prob  = (id: string) => get(id).problematica;
const prob1 = (id: string) => get(id).problematica1;
const prob2 = (id: string) => get(id).problematica2;
const tema  = (id: string) => get(id).tema;

const CLOSING = 'são problemas decorrentes desse tema.';

const promptBuild = (id: string) => `Monte a problemática correta para o tema "${tema(id)}".`;
const promptOrder = (id: string) => `Organize as 3 partes da introdução até aqui. Tema: "${tema(id)}".`;

export const faseProblematicasActivities: ActivityData[] = [
  // ── 6 × BuildActivity ────────────────────────────────────────────────────
  // 3 correct fragments: problematica1 + problematica2 (with leading connective) + CLOSING.
  // 2 distractors: problematica1 of the paired tema (plausible-but-wrong standalone clause)
  //                + a first-person/tese closing variant.

  // 1. saude  (cross-distractor: preconceito's problematica1)
  // "A escassez de profissionais em regiões afastadas" + "e a superlotação das unidades de saúde" + CLOSING
  {
    id: 'fase-problematicas-build-1',
    kind: 'build',
    prompt: promptBuild('saude'),
    fragments: [
      { id: 'p1-f1', text: prob1('saude'),       correct: true  },
      { id: 'p1-f2', text: prob2('saude'),       correct: true  },
      { id: 'p1-f3', text: CLOSING,              correct: true  },
      { id: 'p1-d1', text: prob1('preconceito'), correct: false },
      { id: 'p1-d2', text: 'são, na minha visão, os principais problemas.', correct: false },
    ],
    acceptedOrders: [['p1-f1', 'p1-f2', 'p1-f3']],
  },

  // 2. preconceito  (cross-distractor: saude's problematica1)
  // "A naturalização de discursos discriminatórios" + "e a ausência de punição a atos de exclusão" + CLOSING
  {
    id: 'fase-problematicas-build-2',
    kind: 'build',
    prompt: promptBuild('preconceito'),
    fragments: [
      { id: 'p2-f1', text: prob1('preconceito'), correct: true  },
      { id: 'p2-f2', text: prob2('preconceito'), correct: true  },
      { id: 'p2-f3', text: CLOSING,              correct: true  },
      { id: 'p2-d1', text: prob1('saude'),       correct: false },
      { id: 'p2-d2', text: 'eu considero, são os problemas centrais.', correct: false },
    ],
    acceptedOrders: [['p2-f1', 'p2-f2', 'p2-f3']],
  },

  // 3. meioambiente  (cross-distractor: violenciaurbana's problematica1)
  // "O descarte inadequado de resíduos" + "e a fiscalização insuficiente contra o desmatamento" + CLOSING
  {
    id: 'fase-problematicas-build-3',
    kind: 'build',
    prompt: promptBuild('meioambiente'),
    fragments: [
      { id: 'p3-f1', text: prob1('meioambiente'),    correct: true  },
      { id: 'p3-f2', text: prob2('meioambiente'),    correct: true  },
      { id: 'p3-f3', text: CLOSING,                  correct: true  },
      { id: 'p3-d1', text: prob1('violenciaurbana'), correct: false },
      { id: 'p3-d2', text: 'são, em minha opinião, os maiores problemas.', correct: false },
    ],
    acceptedOrders: [['p3-f1', 'p3-f2', 'p3-f3']],
  },

  // 4. violenciaurbana  (cross-distractor: meioambiente's problematica1)
  // "A ausência de policiamento em áreas periféricas" + "e a impunidade de crimes violentos" + CLOSING
  {
    id: 'fase-problematicas-build-4',
    kind: 'build',
    prompt: promptBuild('violenciaurbana'),
    fragments: [
      { id: 'p4-f1', text: prob1('violenciaurbana'), correct: true  },
      { id: 'p4-f2', text: prob2('violenciaurbana'), correct: true  },
      { id: 'p4-f3', text: CLOSING,                  correct: true  },
      { id: 'p4-d1', text: prob1('meioambiente'),    correct: false },
      { id: 'p4-d2', text: 'são os problemas centrais, na minha perspectiva.', correct: false },
    ],
    acceptedOrders: [['p4-f1', 'p4-f2', 'p4-f3']],
  },

  // 5. solidao  (cross-distractor: luto's problematica1)
  // "A falta de espaços de convívio comunitário" + "e o abandono familiar de idosos" + CLOSING
  {
    id: 'fase-problematicas-build-5',
    kind: 'build',
    prompt: promptBuild('solidao'),
    fragments: [
      { id: 'p5-f1', text: prob1('solidao'), correct: true  },
      { id: 'p5-f2', text: prob2('solidao'), correct: true  },
      { id: 'p5-f3', text: CLOSING,          correct: true  },
      { id: 'p5-d1', text: prob1('luto'),    correct: false },
      { id: 'p5-d2', text: 'são, a meu ver, os problemas mais relevantes.', correct: false },
    ],
    acceptedOrders: [['p5-f1', 'p5-f2', 'p5-f3']],
  },

  // 6. luto  (cross-distractor: solidao's problematica1; tese-variant closing)
  // "A escassez de suporte psicológico gratuito" + "e o silenciamento do luto no ambiente de trabalho" + CLOSING
  {
    id: 'fase-problematicas-build-6',
    kind: 'build',
    prompt: promptBuild('luto'),
    fragments: [
      { id: 'p6-f1', text: prob1('luto'),    correct: true  },
      { id: 'p6-f2', text: prob2('luto'),    correct: true  },
      { id: 'p6-f3', text: CLOSING,          correct: true  },
      { id: 'p6-d1', text: prob1('solidao'), correct: false },
      { id: 'p6-d2', text: 'comprovam, portanto, a minha tese sobre o tema.', correct: false },
    ],
    acceptedOrders: [['p6-f1', 'p6-f2', 'p6-f3']],
  },

  // ── 4 × OrderActivity ────────────────────────────────────────────────────
  // 3-item sequence: repertório → temaBrasil → problemática.
  // items array order IS the correct order (validated by index in OrderPuzzle).

  // order-1: meioambiente
  {
    id: 'fase-problematicas-order-1',
    kind: 'order',
    prompt: promptOrder('meioambiente'),
    items: [
      { id: 'rep',  label: rep('meioambiente') },
      { id: 'tb',   label: tb('meioambiente')  },
      { id: 'prob', label: prob('meioambiente') },
    ],
  },

  // order-2: violenciaurbana
  {
    id: 'fase-problematicas-order-2',
    kind: 'order',
    prompt: promptOrder('violenciaurbana'),
    items: [
      { id: 'rep',  label: rep('violenciaurbana') },
      { id: 'tb',   label: tb('violenciaurbana')  },
      { id: 'prob', label: prob('violenciaurbana') },
    ],
  },

  // order-3: solidao
  {
    id: 'fase-problematicas-order-3',
    kind: 'order',
    prompt: promptOrder('solidao'),
    items: [
      { id: 'rep',  label: rep('solidao') },
      { id: 'tb',   label: tb('solidao')  },
      { id: 'prob', label: prob('solidao') },
    ],
  },

  // order-4: luto
  {
    id: 'fase-problematicas-order-4',
    kind: 'order',
    prompt: promptOrder('luto'),
    items: [
      { id: 'rep',  label: rep('luto') },
      { id: 'tb',   label: tb('luto')  },
      { id: 'prob', label: prob('luto') },
    ],
  },
];
