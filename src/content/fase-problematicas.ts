import type { ActivityData } from '../engine/types';
import { TEMA_BANK } from './shared-bank';

const get  = (id: string) => TEMA_BANK.find((e) => e.id === id)!;
const rep  = (id: string) => get(id).repertorio;
const tb   = (id: string) => get(id).temaBrasil;
const prob = (id: string) => get(id).problematica;
const tema = (id: string) => get(id).tema;

// Each problematica splits cleanly at the closing clause.
// prob(id) = <clause> + ' são problemas decorrentes desse tema.'
// We derive the combined-problems clause by stripping the shared suffix.
const CLOSING = 'são problemas decorrentes desse tema.';
const clause = (id: string) => prob(id).replace(` ${CLOSING}`, '');

const promptBuild = (id: string) => `Monte a problemática correta para o tema "${tema(id)}".`;
const promptOrder = (id: string) => `Organize as 3 partes da introdução até aqui. Tema: "${tema(id)}".`;

export const faseProblematicasActivities: ActivityData[] = [
  // ── 6 × BuildActivity ────────────────────────────────────────────────────
  // 2 correct fragments: the combined-problems clause + the shared closing.
  // 2 distractors: combined-problems clause from a paired tema (plausible mismatch)
  //                + a first-person/tese closing variant.

  // 1. saude  (cross-distractor: preconceito's clause)
  {
    id: 'fase-problematicas-build-1',
    kind: 'build',
    prompt: promptBuild('saude'),
    fragments: [
      { id: 'p1-f1', text: clause('saude'),       correct: true  },
      { id: 'p1-f2', text: CLOSING,               correct: true  },
      { id: 'p1-d1', text: clause('preconceito'), correct: false },
      { id: 'p1-d2', text: 'são, na minha visão, os principais problemas.', correct: false },
    ],
    correctSequence: ['p1-f1', 'p1-f2'],
  },

  // 2. preconceito  (cross-distractor: saude's clause)
  {
    id: 'fase-problematicas-build-2',
    kind: 'build',
    prompt: promptBuild('preconceito'),
    fragments: [
      { id: 'p2-f1', text: clause('preconceito'), correct: true  },
      { id: 'p2-f2', text: CLOSING,               correct: true  },
      { id: 'p2-d1', text: clause('saude'),        correct: false },
      { id: 'p2-d2', text: 'eu considero, são os problemas centrais.',     correct: false },
    ],
    correctSequence: ['p2-f1', 'p2-f2'],
  },

  // 3. meioambiente  (cross-distractor: violenciaurbana's clause)
  {
    id: 'fase-problematicas-build-3',
    kind: 'build',
    prompt: promptBuild('meioambiente'),
    fragments: [
      { id: 'p3-f1', text: clause('meioambiente'),    correct: true  },
      { id: 'p3-f2', text: CLOSING,                   correct: true  },
      { id: 'p3-d1', text: clause('violenciaurbana'), correct: false },
      { id: 'p3-d2', text: 'são, em minha opinião, os maiores problemas.', correct: false },
    ],
    correctSequence: ['p3-f1', 'p3-f2'],
  },

  // 4. violenciaurbana  (cross-distractor: meioambiente's clause)
  {
    id: 'fase-problematicas-build-4',
    kind: 'build',
    prompt: promptBuild('violenciaurbana'),
    fragments: [
      { id: 'p4-f1', text: clause('violenciaurbana'), correct: true  },
      { id: 'p4-f2', text: CLOSING,                   correct: true  },
      { id: 'p4-d1', text: clause('meioambiente'),     correct: false },
      { id: 'p4-d2', text: 'são os problemas centrais, na minha perspectiva.', correct: false },
    ],
    correctSequence: ['p4-f1', 'p4-f2'],
  },

  // 5. solidao  (cross-distractor: luto's clause)
  {
    id: 'fase-problematicas-build-5',
    kind: 'build',
    prompt: promptBuild('solidao'),
    fragments: [
      { id: 'p5-f1', text: clause('solidao'), correct: true  },
      { id: 'p5-f2', text: CLOSING,           correct: true  },
      { id: 'p5-d1', text: clause('luto'),    correct: false },
      { id: 'p5-d2', text: 'são, a meu ver, os problemas mais relevantes.', correct: false },
    ],
    correctSequence: ['p5-f1', 'p5-f2'],
  },

  // 6. luto  (cross-distractor: solidao's clause; tese-variant closing)
  {
    id: 'fase-problematicas-build-6',
    kind: 'build',
    prompt: promptBuild('luto'),
    fragments: [
      { id: 'p6-f1', text: clause('luto'),    correct: true  },
      { id: 'p6-f2', text: CLOSING,           correct: true  },
      { id: 'p6-d1', text: clause('solidao'), correct: false },
      { id: 'p6-d2', text: 'comprovam, portanto, a minha tese sobre o tema.', correct: false },
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
