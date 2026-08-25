import type { ActivityData } from '../engine/types';
import { TEMA_BANK } from './shared-bank';

const get  = (id: string) => TEMA_BANK.find((e) => e.id === id)!;
const rep  = (id: string) => get(id).repertorio;
const tb   = (id: string) => get(id).temaBrasil;
const prob = (id: string) => get(id).problematica;
const tema = (id: string) => get(id).tema;

// Shared closing clause — literal string so there is no risk of encoding
// mismatch when used as a fragment text.
const CLOSING = 'são problemas decorrentes desse tema.';

const promptBuild = (id: string) => `Monte a problemática correta para o tema "${tema(id)}".`;
const promptOrder = (id: string) => `Organize as 3 partes da introdução até aqui. Tema: "${tema(id)}".`;

export const faseProblematicasActivities: ActivityData[] = [
  // ── 6 × BuildActivity ────────────────────────────────────────────────────
  // 2 correct fragments: the combined-problems clause + the shared closing.
  // 2 distractors: combined-problems clause from a paired tema (plausible mismatch)
  //                + a first-person/tese closing variant.

  // 1. saude  (cross-distractor: preconceito's clause)
  // prob('saude') = "A escassez de profissionais em regiões afastadas e a superlotação das unidades de saúde são problemas decorrentes desse tema."
  {
    id: 'fase-problematicas-build-1',
    kind: 'build',
    prompt: promptBuild('saude'),
    fragments: [
      { id: 'p1-f1', text: 'A escassez de profissionais em regiões afastadas e a superlotação das unidades de saúde', correct: true  },
      { id: 'p1-f2', text: CLOSING,                                                                                   correct: true  },
      { id: 'p1-d1', text: 'A naturalização de discursos discriminatórios e a ausência de punição a atos de exclusão', correct: false },
      { id: 'p1-d2', text: 'são, na minha visão, os principais problemas.',                                           correct: false },
    ],
    correctSequence: ['p1-f1', 'p1-f2'],
  },

  // 2. preconceito  (cross-distractor: saude's clause)
  // prob('preconceito') = "A naturalização de discursos discriminatórios e a ausência de punição a atos de exclusão são problemas decorrentes desse tema."
  {
    id: 'fase-problematicas-build-2',
    kind: 'build',
    prompt: promptBuild('preconceito'),
    fragments: [
      { id: 'p2-f1', text: 'A naturalização de discursos discriminatórios e a ausência de punição a atos de exclusão', correct: true  },
      { id: 'p2-f2', text: CLOSING,                                                                                    correct: true  },
      { id: 'p2-d1', text: 'A escassez de profissionais em regiões afastadas e a superlotação das unidades de saúde',  correct: false },
      { id: 'p2-d2', text: 'eu considero, são os problemas centrais.',                                                 correct: false },
    ],
    correctSequence: ['p2-f1', 'p2-f2'],
  },

  // 3. meioambiente  (cross-distractor: violenciaurbana's clause)
  // prob('meioambiente') = "O descarte inadequado de resíduos e a fiscalização insuficiente contra o desmatamento são problemas decorrentes desse tema."
  {
    id: 'fase-problematicas-build-3',
    kind: 'build',
    prompt: promptBuild('meioambiente'),
    fragments: [
      { id: 'p3-f1', text: 'O descarte inadequado de resíduos e a fiscalização insuficiente contra o desmatamento', correct: true  },
      { id: 'p3-f2', text: CLOSING,                                                                                  correct: true  },
      { id: 'p3-d1', text: 'A ausência de policiamento em áreas periféricas e a impunidade de crimes violentos',    correct: false },
      { id: 'p3-d2', text: 'são, em minha opinião, os maiores problemas.',                                          correct: false },
    ],
    correctSequence: ['p3-f1', 'p3-f2'],
  },

  // 4. violenciaurbana  (cross-distractor: meioambiente's clause)
  // prob('violenciaurbana') = "A ausência de policiamento em áreas periféricas e a impunidade de crimes violentos são problemas decorrentes desse tema."
  {
    id: 'fase-problematicas-build-4',
    kind: 'build',
    prompt: promptBuild('violenciaurbana'),
    fragments: [
      { id: 'p4-f1', text: 'A ausência de policiamento em áreas periféricas e a impunidade de crimes violentos',   correct: true  },
      { id: 'p4-f2', text: CLOSING,                                                                                 correct: true  },
      { id: 'p4-d1', text: 'O descarte inadequado de resíduos e a fiscalização insuficiente contra o desmatamento', correct: false },
      { id: 'p4-d2', text: 'são os problemas centrais, na minha perspectiva.',                                      correct: false },
    ],
    correctSequence: ['p4-f1', 'p4-f2'],
  },

  // 5. solidao  (cross-distractor: luto's clause)
  // prob('solidao') = "A falta de espaços de convívio comunitário e o abandono familiar de idosos são problemas decorrentes desse tema."
  {
    id: 'fase-problematicas-build-5',
    kind: 'build',
    prompt: promptBuild('solidao'),
    fragments: [
      { id: 'p5-f1', text: 'A falta de espaços de convívio comunitário e o abandono familiar de idosos',                            correct: true  },
      { id: 'p5-f2', text: CLOSING,                                                                                                 correct: true  },
      { id: 'p5-d1', text: 'A escassez de suporte psicológico gratuito e o silenciamento do luto no ambiente de trabalho',          correct: false },
      { id: 'p5-d2', text: 'são, a meu ver, os problemas mais relevantes.',                                                         correct: false },
    ],
    correctSequence: ['p5-f1', 'p5-f2'],
  },

  // 6. luto  (cross-distractor: solidao's clause; tese-variant closing)
  // prob('luto') = "A escassez de suporte psicológico gratuito e o silenciamento do luto no ambiente de trabalho são problemas decorrentes desse tema."
  {
    id: 'fase-problematicas-build-6',
    kind: 'build',
    prompt: promptBuild('luto'),
    fragments: [
      { id: 'p6-f1', text: 'A escassez de suporte psicológico gratuito e o silenciamento do luto no ambiente de trabalho', correct: true  },
      { id: 'p6-f2', text: CLOSING,                                                                                         correct: true  },
      { id: 'p6-d1', text: 'A falta de espaços de convívio comunitário e o abandono familiar de idosos',                   correct: false },
      { id: 'p6-d2', text: 'comprovam, portanto, a minha tese sobre o tema.',                                               correct: false },
    ],
    correctSequence: ['p6-f1', 'p6-f2'],
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
