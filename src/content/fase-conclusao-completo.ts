import type { ActivityData } from '../engine/types';

// Conclusão — capstone. Mirrors the "recap pieces → join progressively → final
// challenge" block structure of fase-d1-completo/fase-d2-completo, but scoped to
// ONE paragraph (a Conclusão), so it is intentionally shorter: 12 questions.
//   A (Q1-2)   recap misto dos elementos  — TagMatch many-to-few (6 categorias)
//   B (Q3-7)   reconstrução progressiva   — Build/OrderPuzzle até detalhamento
//   C (Q8-12)  desafio final              — OrderPuzzle do parágrafo inteiro + TagMatch
// Themes: saúde, violência urbana, solidão, trabalho de cuidado (textos canônicos
// construídos nas seis fases anteriores da Conclusão).

// ── Full paragraphs split into their 7 canonical slot-pieces (Q8-11) ─────────
const saudeFull = [
  'Portanto,',
  'o Ministério da Saúde deve investir em infraestrutura hospitalar',
  'por meio da destinação de verba específica para a contratação de novos profissionais,',
  'com a finalidade de reduzir a sobrecarga das unidades de saúde.',
  'Em detalhe, é urgente ampliar o número de leitos e equipes médicas em regiões afastadas dos grandes centros.',
  "Dessa forma, cenários como os retratados em 'Grey's Anatomy', marcados pela escassez de recursos,",
  'deixarão de refletir a realidade brasileira.',
];

const violenciaFull = [
  'Assim,',
  'as secretarias estaduais de segurança pública devem ampliar o policiamento comunitário',
  'por meio da criação de bases fixas em bairros periféricos,',
  'com o objetivo de reduzir os índices de criminalidade nessas regiões.',
  'Como, por exemplo, o investimento em câmeras de monitoramento e iluminação pública.',
  "Dessa maneira, o cenário de caos retratado em 'The Walking Dead' permanecerá restrito à ficção,",
  'distante da realidade das comunidades brasileiras.',
];

const solidaoFull = [
  'Logo,',
  'as secretarias municipais de assistência social devem criar centros de convivência para idosos',
  'mediante parcerias com organizações não governamentais e voluntários da comunidade,',
  'a fim de que a população idosa tenha acesso a espaços de socialização.',
  'Isto é, promover atividades recreativas e encontros intergeracionais regulares.',
  "Dessa forma, histórias como a do personagem Carl, de 'Up: Altas Aventuras',",
  'deixarão de representar a realidade de tantos idosos brasileiros.',
];

const cuidadoFull = [
  'Sendo assim,',
  'o Ministério da Mulher, da Família e dos Direitos Humanos deve criar campanhas nacionais de conscientização',
  'através de parcerias com emissoras de televisão e redes sociais,',
  'a fim de desnaturalizar a ideia de que os cuidados domésticos são responsabilidade exclusiva da mulher.',
  'Isto é, promover debates nas escolas e empresas sobre a divisão igualitária das tarefas.',
  'Assim,',
  "a sociedade deixa de reproduzir a realidade de exclusão retratada em 'Que Horas Ela Volta?'.",
];

// Builds a full-paragraph OrderPuzzle: 7 ordered slot-pieces + 2 off-theme
// pool-only distractors that fail the check if placed.
function fullOrder(n: number, prompt: string, pieces: string[], distractors: string[]): ActivityData {
  return {
    id: `fase-conclusao-completo-${n}`,
    kind: 'order',
    prompt,
    items: pieces.map((label, i) => ({ id: `q${n}-i${i + 1}`, label })),
    distractors: distractors.map((label, i) => ({ id: `q${n}-d${i + 1}`, label })),
  };
}

export const faseConclusaoCompletoActivities: ActivityData[] = [
  // ════════════════════════════════════════════════════════════════════════════
  // BLOCO A — recap misto dos elementos
  // ════════════════════════════════════════════════════════════════════════════

  // ── Q1 — TagMatch many-to-few: 8 frases → 6 elementos (saúde + violência) ────
  {
    id: 'fase-conclusao-completo-1',
    kind: 'tag-match',
    prompt: 'Classifique cada trecho da conclusão no elemento que ele representa.',
    sentences: [
      { id: 'q1-s1', text: 'Portanto' },
      { id: 'q1-s2', text: 'o Ministério da Saúde deve investir em infraestrutura hospitalar' },
      { id: 'q1-s3', text: 'por meio da destinação de verba específica para a contratação de novos profissionais' },
      { id: 'q1-s4', text: 'com a finalidade de reduzir a sobrecarga das unidades de saúde' },
      { id: 'q1-s5', text: 'Em detalhe, é urgente ampliar o número de leitos e equipes médicas em regiões afastadas dos grandes centros.' },
      { id: 'q1-s6', text: "Dessa forma, cenários como os retratados em 'Grey's Anatomy'... deixarão de refletir a realidade brasileira." },
      { id: 'q1-s7', text: 'Assim' },
      { id: 'q1-s8', text: 'as secretarias estaduais de segurança pública devem ampliar o policiamento comunitário' },
    ],
    tags: [
      { id: 'conectivo',    label: 'Conectivo' },
      { id: 'agente',       label: 'Agente + Ação' },
      { id: 'modo',         label: 'Modo/Meio' },
      { id: 'finalidade',   label: 'Finalidade' },
      { id: 'detalhamento', label: 'Detalhamento' },
      { id: 'retomada',     label: 'Retomada' },
    ],
    mapping: {
      'q1-s1': 'conectivo',
      'q1-s2': 'agente',
      'q1-s3': 'modo',
      'q1-s4': 'finalidade',
      'q1-s5': 'detalhamento',
      'q1-s6': 'retomada',
      'q1-s7': 'conectivo',
      'q1-s8': 'agente',
    },
  },

  // ── Q2 — TagMatch many-to-few: 8 frases → 6 elementos (solidão + cuidado) ────
  {
    id: 'fase-conclusao-completo-2',
    kind: 'tag-match',
    prompt: 'Classifique cada trecho da conclusão no elemento que ele representa.',
    sentences: [
      { id: 'q2-s1', text: 'Logo' },
      { id: 'q2-s2', text: 'Sendo assim' },
      { id: 'q2-s3', text: 'as secretarias municipais de assistência social devem criar centros de convivência para idosos' },
      { id: 'q2-s4', text: 'o Ministério da Mulher, da Família e dos Direitos Humanos deve criar campanhas nacionais de conscientização' },
      { id: 'q2-s5', text: 'mediante parcerias com organizações não governamentais e voluntários da comunidade' },
      { id: 'q2-s6', text: 'a fim de desnaturalizar a ideia de que os cuidados domésticos são responsabilidade exclusiva da mulher' },
      { id: 'q2-s7', text: 'Isto é, promover atividades recreativas e encontros intergeracionais regulares.' },
      { id: 'q2-s8', text: "Dessa forma, histórias como a do personagem Carl, de 'Up: Altas Aventuras', deixarão de representar a realidade de tantos idosos brasileiros." },
    ],
    tags: [
      { id: 'conectivo',    label: 'Conectivo' },
      { id: 'agente',       label: 'Agente + Ação' },
      { id: 'modo',         label: 'Modo/Meio' },
      { id: 'finalidade',   label: 'Finalidade' },
      { id: 'detalhamento', label: 'Detalhamento' },
      { id: 'retomada',     label: 'Retomada' },
    ],
    mapping: {
      'q2-s1': 'conectivo',
      'q2-s2': 'conectivo',
      'q2-s3': 'agente',
      'q2-s4': 'agente',
      'q2-s5': 'modo',
      'q2-s6': 'finalidade',
      'q2-s7': 'detalhamento',
      'q2-s8': 'retomada',
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // BLOCO B — reconstrução progressiva
  // ════════════════════════════════════════════════════════════════════════════

  // ── Q3 — BuildFromScratch: até a finalidade (saúde) ─────────────────────────
  {
    id: 'fase-conclusao-completo-3',
    kind: 'build',
    prompt: 'Tema "saúde": monte a conclusão até a finalidade (conectivo + agente + ação + modo/meio + finalidade).',
    fragments: [
      { id: 'q3-f1', text: 'Portanto',                                                                          correct: true  },
      { id: 'q3-f2', text: 'o Ministério da Saúde deve investir em infraestrutura hospitalar',                  correct: true  },
      { id: 'q3-f3', text: 'por meio da destinação de verba específica para a contratação de novos profissionais', correct: true },
      { id: 'q3-f4', text: 'com a finalidade de reduzir a sobrecarga das unidades de saúde',                    correct: true  },
      { id: 'q3-d1', text: 'Em detalhe, contratar mais enfermeiros',                                            correct: false },
      { id: 'q3-d2', text: 'sem qualquer relação com hospitais',                                                correct: false },
    ],
    acceptedOrders: [['q3-f1', 'q3-f2', 'q3-f3', 'q3-f4']],
  },

  // ── Q4 — BuildFromScratch: até a finalidade (violência urbana) ──────────────
  {
    id: 'fase-conclusao-completo-4',
    kind: 'build',
    prompt: 'Tema "violência urbana": monte a conclusão até a finalidade (conectivo + agente + ação + modo/meio + finalidade).',
    fragments: [
      { id: 'q4-f1', text: 'Assim',                                                                             correct: true  },
      { id: 'q4-f2', text: 'as secretarias estaduais de segurança pública devem ampliar o policiamento comunitário', correct: true },
      { id: 'q4-f3', text: 'por meio da criação de bases fixas em bairros periféricos',                         correct: true  },
      { id: 'q4-f4', text: 'com o objetivo de reduzir os índices de criminalidade nessas regiões',             correct: true  },
      { id: 'q4-d1', text: 'Como, por exemplo, mais iluminação pública',                                        correct: false },
      { id: 'q4-d2', text: 'sem qualquer relação com a criminalidade',                                          correct: false },
    ],
    acceptedOrders: [['q4-f1', 'q4-f2', 'q4-f3', 'q4-f4']],
  },

  // ── Q5 — OrderPuzzle: até o detalhamento, com distrator (solidão) ───────────
  fullOrder(
    5,
    'Tema "solidão": ordene a conclusão até o detalhamento. Cuidado com a frase de outro tema no pool.',
    [
      'Logo,',
      'as secretarias municipais de assistência social devem criar centros de convivência para idosos',
      'mediante parcerias com organizações não governamentais e voluntários da comunidade,',
      'a fim de que a população idosa tenha acesso a espaços de socialização.',
      'Isto é, promover atividades recreativas e encontros intergeracionais regulares.',
    ],
    ['Em detalhe, contratar mais enfermeiros para o sistema de saúde.']
  ),

  // ── Q6 — OrderPuzzle: até o detalhamento, com distrator (trabalho de cuidado) ─
  fullOrder(
    6,
    'Tema "trabalho de cuidado": ordene a conclusão até o detalhamento. Cuidado com a frase de outro tema no pool.',
    [
      'Sendo assim,',
      'o Ministério da Mulher, da Família e dos Direitos Humanos deve criar campanhas nacionais de conscientização',
      'através de parcerias com emissoras de televisão e redes sociais,',
      'a fim de desnaturalizar a ideia de que os cuidados domésticos são responsabilidade exclusiva da mulher.',
      'Isto é, promover debates nas escolas e empresas sobre a divisão igualitária das tarefas.',
    ],
    ['Como, por exemplo, o investimento em câmeras de monitoramento.']
  ),

  // ── Q7 — TagMatch bijetivo (bônus): um mesmo tema, agentes diferentes (surdos) ─
  {
    id: 'fase-conclusao-completo-7',
    kind: 'tag-match',
    prompt:
      'Tema: inclusão de surdos. Um mesmo tema aceita mais de um agente. Associe cada versão da conclusão ao órgão que a completa corretamente.',
    sentences: [
      { id: 'q7-s1', text: 'Por tudo isso, [órgão] deve ampliar as políticas públicas existentes, tornando-as mais eficazes no combate ao preconceito...' },
      { id: 'q7-s2', text: 'Portanto, [órgão] deve investir em infraestrutura por meio da destinação de verba específica para a compra de equipamentos tecnológicos...' },
      { id: 'q7-s3', text: 'Assim, [órgão], em conjunto com o MEC, deve fiscalizar o cumprimento das leis de inclusão...' },
    ],
    tags: [
      { id: 'assistencia', label: 'Ministério do Desenvolvimento, Assistência Social, Família e Combate à Fome' },
      { id: 'mec',         label: 'Ministério da Educação (MEC)' },
      { id: 'direitos',    label: 'Ministério dos Direitos Humanos e da Cidadania' },
    ],
    mapping: {
      'q7-s1': 'assistencia',
      'q7-s2': 'mec',
      'q7-s3': 'direitos',
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // BLOCO C — desafio final: parágrafo completo
  // ════════════════════════════════════════════════════════════════════════════

  // ── Q8 — OrderPuzzle: parágrafo inteiro com retomada (saúde) ────────────────
  fullOrder(
    8,
    'Tema "saúde": ordene a conclusão completa (do conectivo à retomada). Há duas frases de outros temas no pool.',
    saudeFull,
    [
      'por meio da criação de bases fixas em bairros periféricos',
      'a fim de que a população idosa tenha acesso a espaços de socialização',
    ]
  ),

  // ── Q9 — OrderPuzzle: parágrafo inteiro com retomada (violência urbana) ─────
  fullOrder(
    9,
    'Tema "violência urbana": ordene a conclusão completa (do conectivo à retomada). Há duas frases de outros temas no pool.',
    violenciaFull,
    [
      'com a finalidade de reduzir a sobrecarga das unidades de saúde',
      'Isto é, promover debates nas escolas e empresas sobre a divisão igualitária das tarefas.',
    ]
  ),

  // ── Q10 — OrderPuzzle: parágrafo inteiro com retomada (solidão) ─────────────
  fullOrder(
    10,
    'Tema "solidão": ordene a conclusão completa (do conectivo à retomada). Há duas frases de outros temas no pool.',
    solidaoFull,
    [
      'por meio da destinação de verba específica para a contratação de novos profissionais',
      'Como, por exemplo, o investimento em câmeras de monitoramento e iluminação pública.',
    ]
  ),

  // ── Q11 — OrderPuzzle: parágrafo inteiro com retomada (trabalho de cuidado) ─
  fullOrder(
    11,
    'Tema "trabalho de cuidado": ordene a conclusão completa (do conectivo à retomada). Há duas frases de outros temas no pool.',
    cuidadoFull,
    [
      'com o objetivo de reduzir os índices de criminalidade nessas regiões',
      'Em detalhe, é urgente ampliar o número de leitos e equipes médicas em regiões afastadas dos grandes centros.',
    ]
  ),

  // ── Q12 — TagMatch bijetivo (mais difícil): retomada → tema ─────────────────
  {
    id: 'fase-conclusao-completo-12',
    kind: 'tag-match',
    prompt: 'Só pela retomada (última frase), associe cada conclusão ao tema da redação.',
    sentences: [
      { id: 'q12-s1', text: "Dessa forma, cenários como os retratados em 'Grey's Anatomy', marcados pela escassez de recursos, deixarão de refletir a realidade brasileira." },
      { id: 'q12-s2', text: "Dessa maneira, o cenário de caos retratado em 'The Walking Dead' permanecerá restrito à ficção, distante da realidade das comunidades brasileiras." },
      { id: 'q12-s3', text: "Dessa forma, histórias como a do personagem Carl, de 'Up: Altas Aventuras', deixarão de representar a realidade de tantos idosos brasileiros." },
      { id: 'q12-s4', text: "Assim, a sociedade deixa de reproduzir a realidade de exclusão retratada em 'Que Horas Ela Volta?'." },
    ],
    tags: [
      { id: 'saude',     label: 'Saúde' },
      { id: 'violencia', label: 'Violência urbana' },
      { id: 'solidao',   label: 'Solidão' },
      { id: 'cuidado',   label: 'Trabalho de cuidado' },
    ],
    mapping: {
      'q12-s1': 'saude',
      'q12-s2': 'violencia',
      'q12-s3': 'solidao',
      'q12-s4': 'cuidado',
    },
  },
];
