import type { ActivityData } from '../engine/types';

// Conclusão — o MODO/MEIO da proposta de intervenção: como a ação será
// realizada ("por meio de", "mediante", "através de", "com uso de", "por
// intermédio de"), somado ao conectivo + agente + ação já vistos. Foco
// recorrente: distinguir o modo/meio da finalidade e do detalhamento (que virão
// nas próximas fases) — várias questões usam frases de finalidade/detalhamento
// como distratores ou como o erro marcado.

export const faseConclusaoModoActivities: ActivityData[] = [
  // ── Q1 — ChoiceSelect: modo/meio vs. finalidade/detalhamento (saúde) ────────
  {
    id: 'fase-conclusao-modo-1',
    kind: 'choice',
    prompt:
      "Qual opção completa adequadamente o modo/meio da ação 'investir em infraestrutura hospitalar'?",
    options: [
      { id: 'q1-b', text: 'para que a saúde melhore' },
      { id: 'q1-a', text: 'por meio da destinação de verba específica para a contratação de novos profissionais' },
      { id: 'q1-c', text: 'em detalhe, contratando mais médicos' },
      { id: 'q1-d', text: 'apesar da falta de recursos' },
    ],
    correctOptionId: 'q1-a',
    explanation:
      'O modo/meio indica COMO a ação será feita — aqui, "por meio da destinação de verba específica...". "Para que a saúde melhore" é finalidade; "em detalhe, contratando mais médicos" é detalhamento; e "apesar da falta de recursos" é concessão, não indica um meio.',
  },

  // ── Q2 — ChoiceSelect: modo/meio vs. finalidade/detalhamento (violência) ────
  {
    id: 'fase-conclusao-modo-2',
    kind: 'choice',
    prompt:
      "Qual opção completa adequadamente o modo/meio da ação 'ampliar o policiamento comunitário'?",
    options: [
      { id: 'q2-b', text: 'com o objetivo de reduzir os índices de criminalidade' },
      { id: 'q2-c', text: 'como, por exemplo, câmeras de monitoramento' },
      { id: 'q2-a', text: 'por meio da criação de bases fixas em bairros periféricos' },
      { id: 'q2-d', text: 'todavia, os índices ainda são altos' },
    ],
    correctOptionId: 'q2-a',
    explanation:
      'O modo/meio indica COMO a ação será feita — aqui, "por meio da criação de bases fixas...". "Com o objetivo de reduzir os índices" é finalidade; "como, por exemplo, câmeras de monitoramento" é detalhamento; e "todavia, os índices ainda são altos" é oposição, não indica um meio.',
  },

  // ── Q3 — ErrorSpot (single): finalidade no lugar do modo/meio (solidão) ─────
  // Only one of the candidate continuations is NOT a modo/meio — it is a
  // finalidade in disguise, and that is the error to spot.
  {
    id: 'fase-conclusao-modo-3',
    kind: 'error-spot',
    prompt:
      'As frases abaixo deveriam indicar o modo/meio da proposta sobre solidão. Uma delas, na verdade, é uma finalidade. Toque na frase com o problema.',
    contextText:
      'Logo, as secretarias municipais de assistência social devem criar centros de convivência para idosos...',
    sentences: [
      { id: 'q3-s1', text: 'a fim de que a população idosa tenha acesso a espaços de socialização' },
      { id: 'q3-s2', text: 'mediante parcerias com organizações não governamentais e voluntários da comunidade' },
      { id: 'q3-s3', text: 'por meio da promoção de atividades culturais voltadas ao público idoso' },
    ],
    errorSentenceIds: ['q3-s1'],
    explanation:
      "Essa frase indica a finalidade da ação ('a fim de que...'), não o modo/meio pelo qual ela será realizada.",
  },

  // ── Q4 — ErrorSpot (multiple): dois modos errados (trabalho de cuidado) ─────
  {
    id: 'fase-conclusao-modo-4',
    kind: 'error-spot',
    prompt:
      'Tema: trabalho de cuidado. Só uma das frases abaixo é um modo/meio; as outras duas estão erradas — toque em uma frase que NÃO indica o modo/meio.',
    contextText:
      'A ação é "criar campanhas nacionais de conscientização". O modo/meio deve indicar COMO ela será realizada — não a finalidade nem o detalhamento.',
    sentences: [
      { id: 'q4-a1', text: 'através de parcerias com emissoras de televisão e redes sociais' },
      { id: 'q4-a2', text: 'a fim de desnaturalizar a ideia de que os cuidados domésticos são responsabilidade exclusiva da mulher' },
      { id: 'q4-a3', text: 'isto é, promover debates nas escolas e empresas' },
    ],
    errorSentenceIds: ['q4-a2', 'q4-a3'],
    explanation:
      '"A fim de desnaturalizar..." indica a finalidade da ação, e "isto é, promover debates..." é um detalhamento. Só "através de parcerias com emissoras de televisão e redes sociais" indica o modo/meio.',
  },

  // ── Q5 — TagMatch (bijective): tema → modo/meio correto ─────────────────────
  {
    id: 'fase-conclusao-modo-5',
    kind: 'tag-match',
    prompt: 'Associe cada tema ao modo/meio que completa corretamente a sua proposta de intervenção.',
    sentences: [
      { id: 'q5-s1', text: 'por meio da destinação de verba específica para a contratação de novos profissionais' },
      { id: 'q5-s2', text: 'por meio da criação de bases fixas em bairros periféricos' },
      { id: 'q5-s3', text: 'mediante parcerias com organizações não governamentais e voluntários da comunidade' },
      { id: 'q5-s4', text: 'através de parcerias com emissoras de televisão e redes sociais' },
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

  // ── Q6 — TagMatch (many-to-few): modo/meio vs. finalidade vs. detalhamento ──
  {
    id: 'fase-conclusao-modo-6',
    kind: 'tag-match',
    prompt: 'Classifique cada conector pela função que ele introduz na conclusão.',
    sentences: [
      { id: 'q6-s1', text: 'por meio de' },
      { id: 'q6-s2', text: 'mediante' },
      { id: 'q6-s3', text: 'através de' },
      { id: 'q6-s4', text: 'com a finalidade de' },
      { id: 'q6-s5', text: 'a fim de que' },
      { id: 'q6-s6', text: 'com o objetivo de' },
      { id: 'q6-s7', text: 'em detalhe' },
      { id: 'q6-s8', text: 'isto é' },
    ],
    tags: [
      { id: 'modo',        label: 'Modo/Meio' },
      { id: 'finalidade',  label: 'Finalidade' },
      { id: 'detalhamento', label: 'Detalhamento' },
    ],
    mapping: {
      'q6-s1': 'modo',
      'q6-s2': 'modo',
      'q6-s3': 'modo',
      'q6-s4': 'finalidade',
      'q6-s5': 'finalidade',
      'q6-s6': 'finalidade',
      'q6-s7': 'detalhamento',
      'q6-s8': 'detalhamento',
    },
  },

  // ── Q7 — BuildFromScratch: agente + ação + modo/meio (saúde, cumulativo) ────
  {
    id: 'fase-conclusao-modo-7',
    kind: 'build',
    prompt: 'Tema "saúde": monte a proposta até o modo/meio (agente + ação + modo/meio) na ordem correta.',
    fragments: [
      { id: 'q7-f1', text: 'Portanto, o Ministério da Saúde deve investir em infraestrutura hospitalar', correct: true  },
      { id: 'q7-f2', text: 'por meio da destinação de verba específica',                       correct: true  },
      { id: 'q7-f3', text: 'para a contratação de novos profissionais',                        correct: true  },
      { id: 'q7-d1', text: 'com a finalidade de melhorar a saúde',                             correct: false },
      { id: 'q7-d2', text: 'isto é, contratar mais enfermeiros',                               correct: false },
    ],
    acceptedOrders: [['q7-f1', 'q7-f2', 'q7-f3']],
  },

  // ── Q8 — BuildFromScratch: agente + ação + modo/meio (violência, cumulativo) ─
  {
    id: 'fase-conclusao-modo-8',
    kind: 'build',
    prompt: 'Tema "violência urbana": monte a proposta até o modo/meio (agente + ação + modo/meio) na ordem correta.',
    fragments: [
      { id: 'q8-f1', text: 'Assim, as secretarias estaduais de segurança pública devem ampliar o policiamento comunitário', correct: true },
      { id: 'q8-f2', text: 'por meio da criação de bases fixas',                                                     correct: true },
      { id: 'q8-f3', text: 'em bairros periféricos',                                                                 correct: true },
      { id: 'q8-d1', text: 'com o objetivo de reduzir a criminalidade',                                              correct: false },
      { id: 'q8-d2', text: 'como, por exemplo, câmeras de monitoramento',                                            correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3']],
  },
];
