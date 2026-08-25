// Example content for the "introdução" paragraph — engine testing.
// Methodology: repertório sociocultural → tema+Brasil → problemática 1 → problemática 2.
// This content will be revised paragraph by paragraph as the methodology is refined.

import type { ActivityData } from '../engine/types';

const REPERTORIO =
  'Na obra "1984", de George Orwell, o Ministério da Verdade manipula registros históricos para controlar a percepção da população sobre a realidade, evidenciando como a distorção da informação pode servir como instrumento de dominação.';

const TEMA_BRASIL =
  'Nesse viés, os desafios para o enfrentamento da desinformação na sociedade brasileira contemporânea revelam-se um obstáculo à formação de uma opinião pública consciente, o que decorre, sobretudo, de dois fatores.';

const PROBLEMATICA_1 =
  'Em primeiro lugar, a disseminação de notícias falsas em aplicativos de mensagens instantâneas dificulta a verificação de fontes confiáveis pela população.';

const PROBLEMATICA_2 =
  'Além disso, a ausência de políticas educacionais voltadas ao letramento midiático nas escolas brasileiras compromete a capacidade crítica dos estudantes diante do excesso de informações.';

const PROBLEMATICA_2_FALHA =
  'Além disso, a falta de educação prejudica o senso crítico da população.';

export const fase1Activities: ActivityData[] = [
  // 1 — Order
  {
    kind: 'order',
    prompt: 'Organize os blocos na ordem certa da introdução.',
    items: [
      { id: 'repertorio',    label: REPERTORIO },
      { id: 'tema-brasil',   label: TEMA_BRASIL },
      { id: 'problematica-1', label: PROBLEMATICA_1 },
      { id: 'problematica-2', label: PROBLEMATICA_2 },
    ],
  },

  // 2 — Tag match
  {
    kind: 'tag-match',
    prompt: 'Toque em cada trecho e marque o que ele representa.',
    sentences: [
      { id: 'repertorio',    text: REPERTORIO },
      { id: 'tema-brasil',   text: TEMA_BRASIL },
      { id: 'problematica-1', text: PROBLEMATICA_1 },
      { id: 'problematica-2', text: PROBLEMATICA_2 },
    ],
    tags: [
      { id: 'tag-rep',   label: 'Repertório sociocultural' },
      { id: 'tag-tema',  label: 'Tema + Brasil' },
      { id: 'tag-prob1', label: 'Problemática 1' },
      { id: 'tag-prob2', label: 'Problemática 2' },
    ],
    mapping: {
      'repertorio':    'tag-rep',
      'tema-brasil':   'tag-tema',
      'problematica-1': 'tag-prob1',
      'problematica-2': 'tag-prob2',
    },
  },

  // 3 — Error spot: problemática 2 replaced with a flawed, generic version
  {
    kind: 'error-spot',
    prompt: 'Uma das frases tem um problema. Encontre qual é.',
    sentences: [
      { id: 'es-rep',    text: REPERTORIO },
      { id: 'es-tema',   text: TEMA_BRASIL },
      { id: 'es-prob1',  text: PROBLEMATICA_1 },
      { id: 'es-prob2f', text: PROBLEMATICA_2_FALHA },
    ],
    errorSentenceId: 'es-prob2f',
    explanation:
      'Essa problemática é genérica demais: fala em "falta de educação" sem conectar a uma causa específica ligada à desinformação, como verificação de fontes ou letramento midiático. Toda problemática precisa citar algo concreto, tirado dos textos de apoio.',
  },

  // 4 — Build: 4 correct fragments + 3 distractors
  {
    kind: 'build',
    prompt: 'Monte a introdução usando só os trechos certos, na ordem certa.',
    fragments: [
      { id: 'f-rep',   text: REPERTORIO,    correct: true },
      { id: 'f-tema',  text: TEMA_BRASIL,   correct: true },
      { id: 'f-prob1', text: PROBLEMATICA_1, correct: true },
      { id: 'f-prob2', text: PROBLEMATICA_2, correct: true },
      {
        id: 'd-1',
        text: 'Eu acredito que a desinformação é um problema muito sério no Brasil atual.',
        correct: false,
      },
      {
        id: 'd-2',
        text: 'No filme "Divertida Mente", as emoções da protagonista disputam o controle de suas decisões, mostrando a complexidade do desenvolvimento emocional.',
        correct: false,
      },
      {
        id: 'd-3',
        text: PROBLEMATICA_2_FALHA,
        correct: false,
      },
    ],
    correctSequence: ['f-rep', 'f-tema', 'f-prob1', 'f-prob2'],
  },
];
