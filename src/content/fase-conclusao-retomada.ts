import type { ActivityData } from '../engine/types';

// Conclusão — o último elemento: o conectivo de fechamento (Dessa forma / Assim
// / Logo…, muitas vezes DIFERENTE do que abriu o parágrafo) somado à retomada,
// uma breve menção ao repertório/obra/personagem usado na introdução, fechando
// o circuito da redação. O conectivo de fechamento é reforçado o tempo todo,
// como fase-conclusao-agente reforçou o de abertura.

export const faseConclusaoRetomadaActivities: ActivityData[] = [
  // ── Q1 — ChoiceSelect: retomada do repertório (saúde) ───────────────────────
  {
    id: 'fase-conclusao-retomada-1',
    kind: 'choice',
    prompt:
      "Qual opção retoma adequadamente o repertório usado na introdução (a série 'Grey's Anatomy'), fechando o circuito da redação?",
    options: [
      { id: 'q1-b', text: 'Dessa forma, o Brasil terá mais hospitais.' },
      { id: 'q1-a', text: "Dessa forma, cenários como os retratados em 'Grey's Anatomy', marcados pela escassez de recursos, deixarão de refletir a realidade brasileira." },
      { id: 'q1-c', text: "Assim, os médicos de 'Grey's Anatomy' ficarão felizes." },
      { id: 'q1-d', text: 'Portanto, investir em saúde é importante.' },
    ],
    correctOptionId: 'q1-a',
    explanation:
      "A retomada menciona o repertório da introdução ('Grey's Anatomy') e reconecta com o problema, fechando o circuito. \"O Brasil terá mais hospitais\" e \"investir em saúde é importante\" não retomam o repertório; \"os médicos ficarão felizes\" trivializa e não fecha o raciocínio.",
  },

  // ── Q2 — ChoiceSelect: retomada do repertório (violência urbana) ────────────
  {
    id: 'fase-conclusao-retomada-2',
    kind: 'choice',
    prompt:
      "Qual opção retoma adequadamente o repertório usado na introdução (a série 'The Walking Dead'), fechando o circuito da redação?",
    options: [
      { id: 'q2-b', text: 'Dessa maneira, zumbis não existem de verdade.' },
      { id: 'q2-c', text: 'Assim, a segurança pública é um tema sério.' },
      { id: 'q2-a', text: "Dessa maneira, o cenário de caos retratado em 'The Walking Dead' permanecerá restrito à ficção, distante da realidade das comunidades brasileiras." },
      { id: 'q2-d', text: "Portanto, 'The Walking Dead' é uma série de sucesso." },
    ],
    correctOptionId: 'q2-a',
    explanation:
      "A retomada reconecta o repertório ('The Walking Dead') com o problema da violência, fechando o circuito. \"Zumbis não existem\" e \"'The Walking Dead' é uma série de sucesso\" trivializam ou não reconectam com o problema; \"a segurança pública é um tema sério\" é genérica e não retoma o repertório.",
  },

  // ── Q3 — ErrorSpot (single): menciona a obra mas não fecha o circuito (solidão) ─
  // Only one candidate mentions the obra without reconnecting to the problem —
  // that loose mention is the error to spot.
  {
    id: 'fase-conclusao-retomada-3',
    kind: 'error-spot',
    prompt:
      'As frases abaixo deveriam fechar a redação sobre solidão retomando o repertório. Uma delas menciona a obra, mas não fecha o raciocínio. Toque na frase com o problema.',
    contextText:
      "Repertório da introdução: o personagem Carl, do filme 'Up: Altas Aventuras', que se isola após a perda da esposa.",
    sentences: [
      { id: 'q3-s1', text: "Dessa forma, o filme 'Up: Altas Aventuras' é muito emocionante." },
      { id: 'q3-s2', text: "Dessa forma, histórias como a do personagem Carl, de 'Up: Altas Aventuras', deixarão de representar a realidade de tantos idosos brasileiros." },
      { id: 'q3-s3', text: "Assim, a experiência de isolamento vivida por Carl, em 'Up: Altas Aventuras', deixará de ser a realidade da população idosa." },
    ],
    errorSentenceIds: ['q3-s1'],
    explanation:
      'Essa frase menciona a obra, mas não fecha o raciocínio nem reconecta com o problema apresentado na redação.',
  },

  // ── Q4 — ErrorSpot (multiple): duas retomadas erradas (trabalho de cuidado) ─
  {
    id: 'fase-conclusao-retomada-4',
    kind: 'error-spot',
    prompt:
      'Tema: trabalho de cuidado. Só uma das frases abaixo fecha a redação retomando o repertório; as outras duas estão erradas — toque em uma frase que NÃO fecha corretamente o circuito.',
    contextText:
      "Repertório da introdução: o filme 'Que Horas Ela Volta?', que retrata a invisibilidade do trabalho de cuidado exercido pela mulher.",
    sentences: [
      { id: 'q4-a1', text: "Assim, a sociedade deixa de reproduzir a realidade de exclusão retratada em 'Que Horas Ela Volta?'." },
      { id: 'q4-a2', text: 'Assim, o trabalho doméstico é importante.' },
      { id: 'q4-a3', text: "Assim, 'Que Horas Ela Volta?' é um bom filme." },
    ],
    errorSentenceIds: ['q4-a2', 'q4-a3'],
    explanation:
      '"O trabalho doméstico é importante" não retoma o repertório, e "\'Que Horas Ela Volta?\' é um bom filme" menciona a obra de forma solta, sem reconectar com o problema. Só a primeira fecha o circuito da redação.',
  },

  // ── Q5 — TagMatch (bijective): tema → retomada correta ──────────────────────
  {
    id: 'fase-conclusao-retomada-5',
    kind: 'tag-match',
    prompt: 'Associe cada tema à retomada que fecha corretamente a sua conclusão.',
    sentences: [
      { id: 'q5-s1', text: "Dessa forma, cenários como os retratados em 'Grey's Anatomy', marcados pela escassez de recursos, deixarão de refletir a realidade brasileira." },
      { id: 'q5-s2', text: "Dessa maneira, o cenário de caos retratado em 'The Walking Dead' permanecerá restrito à ficção, distante da realidade das comunidades brasileiras." },
      { id: 'q5-s3', text: "Dessa forma, histórias como a do personagem Carl, de 'Up: Altas Aventuras', deixarão de representar a realidade de tantos idosos brasileiros." },
      { id: 'q5-s4', text: "Assim, a sociedade deixa de reproduzir a realidade de exclusão retratada em 'Que Horas Ela Volta?'." },
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

  // ── Q6 — TagMatch (many-to-few): retoma e fecha vs. não retoma / fica solto ─
  {
    id: 'fase-conclusao-retomada-6',
    kind: 'tag-match',
    prompt:
      'Classifique cada fechamento: ele retoma o repertório e fecha o circuito (correto) ou não retoma / fica solto (errado)?',
    sentences: [
      { id: 'q6-s1', text: "Dessa forma, cenários como os retratados em 'Grey's Anatomy'... deixarão de refletir a realidade brasileira." },
      { id: 'q6-s2', text: 'Dessa forma, a saúde pública é essencial.' },
      { id: 'q6-s3', text: "Dessa maneira, o cenário de caos retratado em 'The Walking Dead' permanecerá restrito à ficção." },
      { id: 'q6-s4', text: 'Assim, a série é muito assistida.' },
      { id: 'q6-s5', text: "Dessa forma, histórias como a do personagem Carl, de 'Up: Altas Aventuras', deixarão de se repetir." },
      { id: 'q6-s6', text: 'Logo, os idosos merecem respeito.' },
      { id: 'q6-s7', text: "Assim, a sociedade deixa de reproduzir a realidade de exclusão retratada em 'Que Horas Ela Volta?'." },
      { id: 'q6-s8', text: 'Portanto, o filme é muito bom.' },
    ],
    tags: [
      { id: 'correto', label: 'Retoma o repertório e fecha o circuito — correto' },
      { id: 'errado',  label: 'Não retoma ou fica solto — errado' },
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

  // ── Q7 — BuildFromScratch: conectivo de fechamento + retomada (saúde) ───────
  {
    id: 'fase-conclusao-retomada-7',
    kind: 'build',
    prompt: 'Tema "saúde": monte o fechamento da conclusão (conectivo + retomada do repertório) na ordem correta.',
    fragments: [
      { id: 'q7-f1', text: 'Dessa forma',                                      correct: true  },
      { id: 'q7-f2', text: "cenários como os retratados em 'Grey's Anatomy'",  correct: true  },
      { id: 'q7-f3', text: 'marcados pela escassez de recursos',               correct: true  },
      { id: 'q7-f4', text: 'deixarão de refletir a realidade brasileira',      correct: true  },
      { id: 'q7-d1', text: 'e os médicos ficarão satisfeitos',                 correct: false },
      { id: 'q7-d2', text: 'sem qualquer relação com o filme',                 correct: false },
    ],
    acceptedOrders: [['q7-f1', 'q7-f2', 'q7-f3', 'q7-f4']],
  },

  // ── Q8 — BuildFromScratch: conectivo de fechamento + retomada (violência) ───
  {
    id: 'fase-conclusao-retomada-8',
    kind: 'build',
    prompt: 'Tema "violência urbana": monte o fechamento da conclusão (conectivo + retomada do repertório) na ordem correta.',
    fragments: [
      { id: 'q8-f1', text: 'Dessa maneira',                                          correct: true  },
      { id: 'q8-f2', text: "o cenário de caos retratado em 'The Walking Dead'",      correct: true  },
      { id: 'q8-f3', text: 'permanecerá restrito à ficção',                          correct: true  },
      { id: 'q8-f4', text: 'distante da realidade das comunidades brasileiras',      correct: true  },
      { id: 'q8-d1', text: 'e os zumbis nunca existirão',                            correct: false },
      { id: 'q8-d2', text: 'sem qualquer relação com a segurança pública',          correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3', 'q8-f4']],
  },
];
