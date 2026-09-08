import type { ActivityData } from '../engine/types';

// Conclusão — os dois primeiros elementos da proposta de intervenção: o
// conectivo conclusivo de abertura (Portanto / Dessa forma / Assim / Logo /
// Sendo assim) e o agente (um órgão específico, nunca o genérico "o governo").
// O conectivo aparece o tempo todo colado ao agente, no início do parágrafo.
// ChoiceSelect e ErrorSpot de aquecimento, TagMatch (bijetivo e um-para-muitos)
// e uma rampa de BuildFromScratch.

export const faseConclusaoAgenteActivities: ActivityData[] = [
  // ── Q1 — ChoiceSelect: conectivo conclusivo + agente específico (saúde) ─────
  {
    id: 'fase-conclusao-agente-1',
    kind: 'choice',
    prompt:
      'Qual opção combina corretamente um conectivo conclusivo com um agente específico para tratar da superlotação das unidades de saúde?',
    options: [
      { id: 'q1-b', text: 'Portanto, o governo deve...' },
      { id: 'q1-a', text: 'Portanto, o Ministério da Saúde deve...' },
      { id: 'q1-c', text: 'Além disso, o Ministério da Saúde deve...' },
      { id: 'q1-d', text: 'Portanto, a escola deve...' },
    ],
    correctOptionId: 'q1-a',
    explanation:
      'A proposta abre com um conectivo conclusivo (Portanto) + um agente específico (o Ministério da Saúde). "O governo" é genérico demais; "Além disso" não é conclusivo; e "a escola" não é o órgão responsável por este tema.',
  },

  // ── Q2 — ChoiceSelect: conectivo conclusivo + agente específico (violência) ──
  {
    id: 'fase-conclusao-agente-2',
    kind: 'choice',
    prompt:
      'Qual opção combina corretamente um conectivo conclusivo com um agente específico para tratar da impunidade de crimes violentos?',
    options: [
      { id: 'q2-b', text: 'Assim, a polícia deve...' },
      { id: 'q2-c', text: 'Porém, as secretarias estaduais de segurança pública devem...' },
      { id: 'q2-a', text: 'Assim, as secretarias estaduais de segurança pública devem...' },
      { id: 'q2-d', text: 'Assim, o Ministério da Saúde deve...' },
    ],
    correctOptionId: 'q2-a',
    explanation:
      'A abertura correta usa um conectivo conclusivo (Assim) + um agente específico (as secretarias estaduais de segurança pública). "A polícia" não indica o nível de governo; "Porém" é conectivo de oposição, não conclusivo; e "o Ministério da Saúde" é de outro tema.',
  },

  // ── Q3 — ErrorSpot (single): agente genérico "o governo" (solidão) ──────────
  // The sentence is split into tappable blocks; the generic agent is the error.
  {
    id: 'fase-conclusao-agente-3',
    kind: 'error-spot',
    prompt: 'Nesta proposta de intervenção sobre solidão, uma parte está mal formulada. Toque na parte com o problema.',
    sentences: [
      { id: 'q3-s1', text: 'Logo,' },
      { id: 'q3-s2', text: 'o governo' },
      { id: 'q3-s3', text: 'deve criar centros de convivência para idosos mediante parcerias com organizações não governamentais e voluntários da comunidade.' },
    ],
    errorSentenceIds: ['q3-s2'],
    explanation:
      '"O governo" é um agente genérico demais — o ideal é indicar um órgão específico, como "as secretarias municipais de assistência social".',
  },

  // ── Q4 — ErrorSpot (multiple): dois agentes errados (trabalho de cuidado) ───
  {
    id: 'fase-conclusao-agente-4',
    kind: 'error-spot',
    prompt:
      'Tema: trabalho de cuidado. Duas das opções de agente abaixo estão erradas — toque em um agente que NÃO serve para a proposta deste tema.',
    contextText:
      'A proposta de intervenção deve indicar um órgão específico e coerente com o tema da invisibilidade do trabalho de cuidado exercido pela mulher.',
    sentences: [
      { id: 'q4-a1', text: 'o Ministério da Mulher, da Família e dos Direitos Humanos' },
      { id: 'q4-a2', text: 'as autoridades competentes' },
      { id: 'q4-a3', text: 'o Ministério da Agricultura' },
    ],
    errorSentenceIds: ['q4-a2', 'q4-a3'],
    explanation:
      '"As autoridades competentes" é genérico demais — não indica um órgão específico. "O Ministério da Agricultura" não tem relação com o tema. O agente adequado é "o Ministério da Mulher, da Família e dos Direitos Humanos".',
  },

  // ── Q5 — TagMatch (bijective): agente → tema correspondente ─────────────────
  {
    id: 'fase-conclusao-agente-5',
    kind: 'tag-match',
    prompt: 'Associe cada agente ao tema para o qual ele é o órgão mais adequado.',
    sentences: [
      { id: 'q5-s1', text: 'Portanto, o Ministério da Saúde' },
      { id: 'q5-s2', text: 'Assim, as secretarias estaduais de segurança pública' },
      { id: 'q5-s3', text: 'Logo, as secretarias municipais de assistência social' },
      { id: 'q5-s4', text: 'Sendo assim, o Ministério da Mulher, da Família e dos Direitos Humanos' },
    ],
    tags: [
      { id: 'saude',     label: 'Saúde' },
      { id: 'violencia', label: 'Violência urbana' },
      { id: 'solidao',   label: 'Solidão' },
      { id: 'cuidado',   label: 'Trabalho de cuidado' },
    ],
    mapping: {
      'q5-s1': 'saude',
      'q5-s2': 'violencia',
      'q5-s3': 'solidao',
      'q5-s4': 'cuidado',
    },
  },

  // ── Q6 — TagMatch (many-to-few): agente específico vs. genérico/incoerente ──
  {
    id: 'fase-conclusao-agente-6',
    kind: 'tag-match',
    prompt:
      'Classifique cada abertura de conclusão: o agente é específico e adequado, ou genérico/incoerente?',
    sentences: [
      { id: 'q6-s1', text: 'Portanto, o Ministério da Saúde deve...' },
      { id: 'q6-s2', text: 'Portanto, o governo deve...' },
      { id: 'q6-s3', text: 'Assim, as secretarias estaduais de segurança pública devem...' },
      { id: 'q6-s4', text: 'Assim, as autoridades devem...' },
      { id: 'q6-s5', text: 'Logo, as secretarias municipais de assistência social devem...' },
      { id: 'q6-s6', text: 'Logo, alguém deveria...' },
      { id: 'q6-s7', text: 'Sendo assim, o Ministério da Mulher, da Família e dos Direitos Humanos deve...' },
      { id: 'q6-s8', text: 'Sendo assim, as pessoas devem...' },
    ],
    tags: [
      { id: 'correto', label: 'Agente específico — correto' },
      { id: 'errado',  label: 'Agente genérico ou incoerente — errado' },
    ],
    mapping: {
      'q6-s1': 'correto',
      'q6-s2': 'errado',
      'q6-s3': 'correto',
      'q6-s4': 'errado',
      'q6-s5': 'correto',
      'q6-s6': 'errado',
      'q6-s7': 'correto',
      'q6-s8': 'errado',
    },
  },

  // ── Q7 — BuildFromScratch: conectivo + agente + verbo (saúde) ───────────────
  {
    id: 'fase-conclusao-agente-7',
    kind: 'build',
    prompt: 'Tema "saúde": monte a abertura da conclusão (conectivo + agente) na ordem correta.',
    fragments: [
      { id: 'q7-f1', text: 'Portanto',              correct: true  },
      { id: 'q7-f2', text: 'o Ministério da Saúde', correct: true  },
      { id: 'q7-f3', text: 'deve',                  correct: true  },
      { id: 'q7-d1', text: 'o governo',             correct: false },
      { id: 'q7-d2', text: 'poderia',              correct: false },
    ],
    acceptedOrders: [['q7-f1', 'q7-f2', 'q7-f3']],
  },

  // ── Q8 — BuildFromScratch: conectivo + agente + verbo (violência urbana) ────
  {
    id: 'fase-conclusao-agente-8',
    kind: 'build',
    prompt: 'Tema "violência urbana": monte a abertura da conclusão (conectivo + agente) na ordem correta.',
    fragments: [
      { id: 'q8-f1', text: 'Assim',                                          correct: true  },
      { id: 'q8-f2', text: 'as secretarias estaduais de segurança pública',  correct: true  },
      { id: 'q8-f3', text: 'devem',                                          correct: true  },
      { id: 'q8-d1', text: 'Apesar disso',                                   correct: false },
      { id: 'q8-d2', text: 'o Ministério da Educação',                       correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3']],
  },
];
