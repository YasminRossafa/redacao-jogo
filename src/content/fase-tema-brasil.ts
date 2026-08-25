import type { ActivityData } from '../engine/types';
import { TEMA_BANK } from './shared-bank';

const rep   = (id: string) => TEMA_BANK.find((e) => e.id === id)!.repertorio;
const tema  = (id: string) => TEMA_BANK.find((e) => e.id === id)!.tema;

const promptBuild = (id: string) =>
  `Monte a frase que liga o repertório ao tema, no Brasil, para o tema "${tema(id)}".`;
const promptOrder = (id: string) =>
  `Organize as frases: primeiro o repertório, depois o tema e Brasil. Tema: "${tema(id)}".`;

export const faseTemaBrasilActivities: ActivityData[] = [
  // ── 6 × BuildActivity ────────────────────────────────────────────────────
  // Each reconstructs the temaBrasil sentence from 4 correct fragments + 2 distractors.
  // Correct fragments are listed in sentence order; the component shuffles the full pool.

  // 1. saude
  // temaBrasil: "Nesse sentido, os desafios para a garantia do acesso à saúde pública
  //              na sociedade brasileira revelam-se um obstáculo à qualidade de vida da população."
  {
    id: 'fase-tema-brasil-build-1',
    kind: 'build',
    prompt: promptBuild('saude'),
    fragments: [
      { id: 'b1-f1', text: 'Nesse sentido,',                                                        correct: true  },
      { id: 'b1-f2', text: 'os desafios para a garantia do acesso à saúde pública',                 correct: true  },
      { id: 'b1-f3', text: 'na sociedade brasileira',                                               correct: true  },
      { id: 'b1-f4', text: 'revelam-se um obstáculo à qualidade de vida da população.',             correct: true  },
      { id: 'b1-d1', text: 'Eu acredito que',                                                       correct: false },
      { id: 'b1-d2', text: 'no contexto mundial',                                                   correct: false },
    ],
    correctSequence: ['b1-f1', 'b1-f2', 'b1-f3', 'b1-f4'],
  },

  // 2. preconceito
  // temaBrasil: "Diante disso, os desafios para a superação do preconceito e da exclusão social
  //              na sociedade brasileira ainda se mostram evidentes."
  {
    id: 'fase-tema-brasil-build-2',
    kind: 'build',
    prompt: promptBuild('preconceito'),
    fragments: [
      { id: 'b2-f1', text: 'Diante disso,',                                                         correct: true  },
      { id: 'b2-f2', text: 'os desafios para a superação do preconceito e da exclusão social',      correct: true  },
      { id: 'b2-f3', text: 'na sociedade brasileira',                                               correct: true  },
      { id: 'b2-f4', text: 'ainda se mostram evidentes.',                                           correct: true  },
      { id: 'b2-d1', text: 'Na minha opinião,',                                                     correct: false },
      { id: 'b2-d2', text: 'a tese que defendo é que',                                              correct: false },
    ],
    correctSequence: ['b2-f1', 'b2-f2', 'b2-f3', 'b2-f4'],
  },

  // 3. meioambiente
  // temaBrasil: "Fora da ficção, os desafios para a preservação do meio ambiente
  //              na sociedade brasileira também se mostram urgentes."
  {
    id: 'fase-tema-brasil-build-3',
    kind: 'build',
    prompt: promptBuild('meioambiente'),
    fragments: [
      { id: 'b3-f1', text: 'Fora da ficção,',                                                       correct: true  },
      { id: 'b3-f2', text: 'os desafios para a preservação do meio ambiente',                       correct: true  },
      { id: 'b3-f3', text: 'na sociedade brasileira',                                               correct: true  },
      { id: 'b3-f4', text: 'também se mostram urgentes.',                                           correct: true  },
      { id: 'b3-d1', text: 'Acredito que',                                                          correct: false },
      { id: 'b3-d2', text: 'no cenário internacional',                                              correct: false },
    ],
    correctSequence: ['b3-f1', 'b3-f2', 'b3-f3', 'b3-f4'],
  },

  // 4. violenciaurbana
  // temaBrasil: "Assim como na série, os desafios para o combate à violência urbana
  //              na sociedade brasileira comprometem a sensação de segurança da população."
  {
    id: 'fase-tema-brasil-build-4',
    kind: 'build',
    prompt: promptBuild('violenciaurbana'),
    fragments: [
      { id: 'b4-f1', text: 'Assim como na série,',                                                  correct: true  },
      { id: 'b4-f2', text: 'os desafios para o combate à violência urbana',                         correct: true  },
      { id: 'b4-f3', text: 'na sociedade brasileira',                                               correct: true  },
      { id: 'b4-f4', text: 'comprometem a sensação de segurança da população.',                     correct: true  },
      { id: 'b4-d1', text: 'Em minha visão,',                                                       correct: false },
      { id: 'b4-d2', text: 'em todo o mundo',                                                       correct: false },
    ],
    correctSequence: ['b4-f1', 'b4-f2', 'b4-f3', 'b4-f4'],
  },

  // 5. solidao
  // temaBrasil: "Fora da ficção, os desafios para o enfrentamento da solidão e do isolamento social
  //              na sociedade brasileira atingem principalmente a população idosa."
  {
    id: 'fase-tema-brasil-build-5',
    kind: 'build',
    prompt: promptBuild('solidao'),
    fragments: [
      { id: 'b5-f1', text: 'Fora da ficção,',                                                       correct: true  },
      { id: 'b5-f2', text: 'os desafios para o enfrentamento da solidão e do isolamento social',    correct: true  },
      { id: 'b5-f3', text: 'na sociedade brasileira',                                               correct: true  },
      { id: 'b5-f4', text: 'atingem principalmente a população idosa.',                             correct: true  },
      { id: 'b5-d1', text: 'Penso que',                                                             correct: false },
      { id: 'b5-d2', text: 'minha tese é que',                                                      correct: false },
    ],
    correctSequence: ['b5-f1', 'b5-f2', 'b5-f3', 'b5-f4'],
  },

  // 6. luto
  // temaBrasil: "Nesse contexto, os desafios para o acolhimento emocional de pessoas enlutadas
  //              na sociedade brasileira ainda carecem de atenção adequada."
  {
    id: 'fase-tema-brasil-build-6',
    kind: 'build',
    prompt: promptBuild('luto'),
    fragments: [
      { id: 'b6-f1', text: 'Nesse contexto,',                                                       correct: true  },
      { id: 'b6-f2', text: 'os desafios para o acolhimento emocional de pessoas enlutadas',         correct: true  },
      { id: 'b6-f3', text: 'na sociedade brasileira',                                               correct: true  },
      { id: 'b6-f4', text: 'ainda carecem de atenção adequada.',                                    correct: true  },
      { id: 'b6-d1', text: 'Considero que',                                                         correct: false },
      { id: 'b6-d2', text: 'no mundo todo',                                                         correct: false },
    ],
    correctSequence: ['b6-f1', 'b6-f2', 'b6-f3', 'b6-f4'],
  },

  // ── 4 × OrderActivity ────────────────────────────────────────────────────
  // 2-item sequence: repertório → temaBrasil.
  // The items array order IS the correct order (validated by index in OrderPuzzle).

  // order-1: meioambiente
  {
    id: 'fase-tema-brasil-order-1',
    kind: 'order',
    prompt: promptOrder('meioambiente'),
    items: [
      { id: 'rep',       label: rep('meioambiente') },
      { id: 'temabrasil', label: TEMA_BANK.find((e) => e.id === 'meioambiente')!.temaBrasil },
    ],
  },

  // order-2: violenciaurbana
  {
    id: 'fase-tema-brasil-order-2',
    kind: 'order',
    prompt: promptOrder('violenciaurbana'),
    items: [
      { id: 'rep',       label: rep('violenciaurbana') },
      { id: 'temabrasil', label: TEMA_BANK.find((e) => e.id === 'violenciaurbana')!.temaBrasil },
    ],
  },

  // order-3: solidao
  {
    id: 'fase-tema-brasil-order-3',
    kind: 'order',
    prompt: promptOrder('solidao'),
    items: [
      { id: 'rep',       label: rep('solidao') },
      { id: 'temabrasil', label: TEMA_BANK.find((e) => e.id === 'solidao')!.temaBrasil },
    ],
  },

  // order-4: luto
  {
    id: 'fase-tema-brasil-order-4',
    kind: 'order',
    prompt: promptOrder('luto'),
    items: [
      { id: 'rep',       label: rep('luto') },
      { id: 'temabrasil', label: TEMA_BANK.find((e) => e.id === 'luto')!.temaBrasil },
    ],
  },
];
