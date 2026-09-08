import type { ActivityData } from '../engine/types';

// Conclusão — a FINALIDADE/EFEITO da proposta de intervenção: para que a ação
// serve ("com a finalidade de", "a fim de que", "com o objetivo de", "para
// que"), somada ao conectivo + agente + ação + modo/meio já vistos. Como em
// fase-conclusao-modo, frases de modo/meio e de detalhamento aparecem como
// distratores para reforçar a distinção entre as três funções conectivas.

export const faseConclusaoFinalidadeActivities: ActivityData[] = [
  // ── Q1 — ChoiceSelect: finalidade vs. modo/detalhamento/citação (saúde) ─────
  {
    id: 'fase-conclusao-finalidade-1',
    kind: 'choice',
    prompt:
      "Qual opção completa adequadamente a finalidade da ação 'investir em infraestrutura hospitalar por meio da destinação de verba específica'?",
    options: [
      { id: 'q1-b', text: 'por meio da contratação de mais médicos' },
      { id: 'q1-a', text: 'com a finalidade de reduzir a sobrecarga das unidades de saúde' },
      { id: 'q1-c', text: 'em detalhe, construindo novos hospitais' },
      { id: 'q1-d', text: 'conforme dados do Ministério da Saúde' },
    ],
    correctOptionId: 'q1-a',
    explanation:
      'A finalidade indica PARA QUÊ a ação serve — aqui, "com a finalidade de reduzir a sobrecarga...". "Por meio da contratação de mais médicos" é modo/meio; "em detalhe, construindo novos hospitais" é detalhamento; e "conforme dados do Ministério da Saúde" seria uma citação, não uma finalidade.',
  },

  // ── Q2 — ChoiceSelect: finalidade vs. modo/detalhamento (violência) ─────────
  {
    id: 'fase-conclusao-finalidade-2',
    kind: 'choice',
    prompt:
      "Qual opção completa adequadamente a finalidade da ação 'ampliar o policiamento comunitário por meio da criação de bases fixas'?",
    options: [
      { id: 'q2-b', text: 'mediante parcerias com a comunidade local' },
      { id: 'q2-c', text: 'como, por exemplo, câmeras de monitoramento' },
      { id: 'q2-a', text: 'com o objetivo de reduzir os índices de criminalidade nessas regiões' },
      { id: 'q2-d', text: 'todavia, os índices seguem altos' },
    ],
    correctOptionId: 'q2-a',
    explanation:
      'A finalidade indica PARA QUÊ a ação serve — aqui, "com o objetivo de reduzir os índices de criminalidade...". "Mediante parcerias com a comunidade local" é modo/meio; "como, por exemplo, câmeras de monitoramento" é detalhamento; e "todavia, os índices seguem altos" é oposição, não indica finalidade.',
  },

  // ── Q3 — ErrorSpot (single): detalhamento no lugar da finalidade (solidão) ──
  // Only one of the candidate continuations is NOT a finalidade — it is a
  // detalhamento in disguise, and that is the error to spot.
  {
    id: 'fase-conclusao-finalidade-3',
    kind: 'error-spot',
    prompt:
      'As frases abaixo deveriam indicar a finalidade da proposta sobre solidão. Uma delas, na verdade, é um detalhamento. Toque na frase com o problema.',
    contextText:
      'Logo, as secretarias municipais de assistência social devem criar centros de convivência para idosos mediante parcerias com a comunidade...',
    sentences: [
      { id: 'q3-s1', text: 'isto é, promover atividades recreativas e encontros intergeracionais regulares' },
      { id: 'q3-s2', text: 'a fim de que a população idosa tenha acesso a espaços de socialização' },
      { id: 'q3-s3', text: 'com o objetivo de reduzir o isolamento social dos idosos' },
    ],
    errorSentenceIds: ['q3-s1'],
    explanation:
      "Essa frase detalha uma ação concreta ('isto é...'), o que caracteriza detalhamento, não finalidade.",
  },

  // ── Q4 — ErrorSpot (multiple): duas finalidades erradas (trabalho de cuidado) ─
  {
    id: 'fase-conclusao-finalidade-4',
    kind: 'error-spot',
    prompt:
      'Tema: trabalho de cuidado. Só uma das frases abaixo é uma finalidade; as outras duas estão erradas — toque em uma frase que NÃO indica a finalidade.',
    contextText:
      'A finalidade deve indicar PARA QUÊ a ação de "criar campanhas nacionais de conscientização" serve — não o modo/meio nem o detalhamento.',
    sentences: [
      { id: 'q4-a1', text: 'a fim de desnaturalizar a ideia de que os cuidados domésticos são responsabilidade exclusiva da mulher' },
      { id: 'q4-a2', text: 'através de parcerias com emissoras de televisão e redes sociais' },
      { id: 'q4-a3', text: 'isto é, promover debates nas escolas e empresas' },
    ],
    errorSentenceIds: ['q4-a2', 'q4-a3'],
    explanation:
      '"Através de parcerias com emissoras de televisão e redes sociais" é modo/meio, e "isto é, promover debates..." é detalhamento. Só "a fim de desnaturalizar a ideia..." indica a finalidade da ação.',
  },

  // ── Q5 — TagMatch (bijective): tema → finalidade correta ────────────────────
  {
    id: 'fase-conclusao-finalidade-5',
    kind: 'tag-match',
    prompt: 'Associe cada tema à finalidade que completa corretamente a sua proposta de intervenção.',
    sentences: [
      { id: 'q5-s1', text: 'com a finalidade de reduzir a sobrecarga das unidades de saúde' },
      { id: 'q5-s2', text: 'com o objetivo de reduzir os índices de criminalidade nessas regiões' },
      { id: 'q5-s3', text: 'a fim de que a população idosa tenha acesso a espaços de socialização' },
      { id: 'q5-s4', text: 'a fim de desnaturalizar a ideia de que os cuidados domésticos são responsabilidade exclusiva da mulher' },
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

  // ── Q6 — TagMatch (many-to-few): finalidade vs. modo/meio vs. detalhamento ──
  {
    id: 'fase-conclusao-finalidade-6',
    kind: 'tag-match',
    prompt: 'Classifique cada conector pela função que ele introduz na conclusão.',
    sentences: [
      { id: 'q6-s1', text: 'com a finalidade de' },
      { id: 'q6-s2', text: 'a fim de que' },
      { id: 'q6-s3', text: 'com o objetivo de' },
      { id: 'q6-s4', text: 'para que' },
      { id: 'q6-s5', text: 'por intermédio de' },
      { id: 'q6-s6', text: 'com uso de' },
      { id: 'q6-s7', text: 'ou seja' },
      { id: 'q6-s8', text: 'como, por exemplo' },
    ],
    tags: [
      { id: 'finalidade',   label: 'Finalidade' },
      { id: 'modo',         label: 'Modo/Meio' },
      { id: 'detalhamento', label: 'Detalhamento' },
    ],
    mapping: {
      'q6-s1': 'finalidade',
      'q6-s2': 'finalidade',
      'q6-s3': 'finalidade',
      'q6-s4': 'finalidade',
      'q6-s5': 'modo',
      'q6-s6': 'modo',
      'q6-s7': 'detalhamento',
      'q6-s8': 'detalhamento',
    },
  },

  // ── Q7 — BuildFromScratch: ação + modo/meio + finalidade (saúde, cumulativo) ─
  {
    id: 'fase-conclusao-finalidade-7',
    kind: 'build',
    prompt: 'Tema "saúde": monte a proposta até a finalidade (ação + modo/meio + finalidade) na ordem correta.',
    fragments: [
      { id: 'q7-f1', text: 'Portanto, o Ministério da Saúde deve investir em infraestrutura hospitalar', correct: true  },
      { id: 'q7-f2', text: 'por meio da destinação de verba específica para a contratação de novos profissionais', correct: true },
      { id: 'q7-f3', text: 'com a finalidade de reduzir a sobrecarga das unidades de saúde',          correct: true  },
      { id: 'q7-d1', text: 'em detalhe, contratar mais enfermeiros',                                  correct: false },
      { id: 'q7-d2', text: 'sem qualquer relação com hospitais',                                      correct: false },
    ],
    acceptedOrders: [['q7-f1', 'q7-f2', 'q7-f3']],
  },

  // ── Q8 — BuildFromScratch: ação + modo/meio + finalidade (violência, cumulativo) ─
  {
    id: 'fase-conclusao-finalidade-8',
    kind: 'build',
    prompt: 'Tema "violência urbana": monte a proposta até a finalidade (ação + modo/meio + finalidade) na ordem correta.',
    fragments: [
      { id: 'q8-f1', text: 'Assim, as secretarias estaduais de segurança pública devem ampliar o policiamento comunitário', correct: true },
      { id: 'q8-f2', text: 'por meio da criação de bases fixas em bairros periféricos',                              correct: true },
      { id: 'q8-f3', text: 'com o objetivo de reduzir os índices de criminalidade nessas regiões',                  correct: true },
      { id: 'q8-d1', text: 'como, por exemplo, mais iluminação pública',                                            correct: false },
      { id: 'q8-d2', text: 'sem qualquer relação com a criminalidade',                                              correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3']],
  },
];
