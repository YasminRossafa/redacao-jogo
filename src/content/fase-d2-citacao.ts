import type { ActivityData } from '../engine/types';

// Desenvolvimento 2 — a citação. Mirrors the progression of fase-d1-citacao,
// but the core distinction here is D2-style citations (philosophical, literary,
// sociological — a named thinker + reasoning) versus D1-style citations
// (statistical data/facts). Warm-up ChoiceSelect, ErrorSpot on misplaced D1-style
// stats, TagMatch classification (bijective then many-to-few), a BuildFromScratch
// ramp, and — like D1 — the junção (problema+motivo+citação) always comes last.

export const faseD2CitacaoActivities: ActivityData[] = [
  // ── Q1 — ChoiceSelect: citação filosófica vs. dado estatístico (saúde) ──────
  {
    id: 'fase-d2-citacao-1',
    kind: 'choice',
    prompt:
      "No D2, a citação deve ser filosófica, literária ou sociológica — nunca um dado estatístico como no D1. Qual das opções é uma citação adequada para o D2 do tema 'saúde pública'?",
    options: [
      { id: 'q1-a', text: 'Segundo dados do Ministério da Saúde, 60% dos municípios brasileiros enfrentam déficit de leitos hospitalares.' },
      { id: 'q1-c', text: 'De acordo com uma pesquisa do IBGE, a expectativa de vida no Brasil aumentou nos últimos dez anos.' },
      { id: 'q1-b', text: 'Segundo o filósofo Michel Foucault, as instituições modernas frequentemente priorizam o controle e a gestão em detrimento do cuidado individualizado com os indivíduos.' },
      { id: 'q1-d', text: 'Segundo a Organização Mundial da Saúde, o Brasil investe menos de 4% do PIB em saúde pública.' },
    ],
    correctOptionId: 'q1-b',
    explanation:
      'A citação de Foucault é conceitual — reflete sobre o papel das instituições — e por isso serve ao D2. As opções do Ministério da Saúde, do IBGE e da OMS são dados estatísticos: padrão do D1, não do D2.',
  },

  // ── Q2 — ChoiceSelect: citação filosófica vs. dado estatístico (meio ambiente) ─
  {
    id: 'fase-d2-citacao-2',
    kind: 'choice',
    prompt: "Qual citação abaixo é adequada para o D2 do tema 'meio ambiente'?",
    options: [
      { id: 'q2-b', text: 'Segundo dados do INPE, o desmatamento na Amazônia cresceu 15% no último ano.' },
      { id: 'q2-a', text: "Segundo o filósofo Hans Jonas, em sua obra 'O Princípio Responsabilidade', as gerações atuais têm o dever ético de garantir a continuidade da vida no planeta." },
      { id: 'q2-c', text: 'Conforme levantamento do IBAMA, foram registradas mais de 70 mil queimadas em 2023.' },
      { id: 'q2-d', text: 'De acordo com a ONU, o Brasil está entre os dez países que mais desmatam no mundo.' },
    ],
    correctOptionId: 'q2-a',
    explanation:
      'A citação de Hans Jonas é filosófica e discute o dever ético com o futuro do planeta — adequada ao D2. INPE, IBAMA e ONU trazem números e estatísticas, típicos do D1.',
  },

  // ── Q3 — ErrorSpot (single): dado estatístico dentro de um D2 (violência urbana) ─
  {
    id: 'fase-d2-citacao-3',
    kind: 'error-spot',
    prompt: 'As frases abaixo formam um D2 sobre violência urbana. Uma citação está no estilo errado. Toque na frase com erro.',
    sentences: [
      { id: 'q3-s1', text: 'Ademais, destaca-se a impunidade de crimes violentos como um fator que perpetua a insegurança na sociedade brasileira, uma vez que a ausência de punição efetiva reforça a sensação de que a violência não terá consequências.' },
      { id: 'q3-s2', text: 'Segundo dados do Fórum Brasileiro de Segurança Pública, o Brasil registrou mais de 47 mil homicídios em um único ano.' },
      { id: 'q3-s3', text: 'Logo, a fragilidade do sistema de justiça contribui para a perpetuação do ciclo de violência, afetando principalmente as comunidades mais vulneráveis.' },
    ],
    errorSentenceIds: ['q3-s2'],
    explanation:
      'S2 é uma citação de dado estatístico, típica do D1 — no D2 a citação deve ser filosófica, literária ou sociológica.',
  },

  // ── Q4 — ErrorSpot (multiple): duas citações erradas (trabalho de cuidado) ──
  {
    id: 'fase-d2-citacao-4',
    kind: 'error-spot',
    prompt:
      'Abaixo, a problemática e o motivo do D2, seguidos de três citações. Duas delas estão erradas — toque em uma citação que NÃO combina com este parágrafo.',
    contextText:
      'Em segunda análise, nota-se que o trabalho de cuidado é naturalizado como responsabilidade exclusiva da mulher, pois isso reforça uma construção social enraizada historicamente.',
    sentences: [
      { id: 'q4-c1', text: 'Segundo os conceitos de Émile Durkheim, essas funções seriam desenvolvidas pelas instituições socializadoras, e não de forma natural.' },
      { id: 'q4-c2', text: 'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.' },
      { id: 'q4-c3', text: 'Segundo o filósofo Immanuel Kant, todo ser humano deve ser tratado como um fim em si mesmo, e nunca como um meio.' },
    ],
    errorSentenceIds: ['q4-c2', 'q4-c3'],
    explanation:
      'C2 é um dado estatístico (padrão D1). C3, apesar de ser uma citação filosófica válida em geral, não se conecta ao motivo apresentado (construção social e instituições), quebrando a costura do parágrafo.',
  },

  // ── Q5 — TagMatch (bijective): pensador/obra → área do conhecimento ─────────
  {
    id: 'fase-d2-citacao-5',
    kind: 'tag-match',
    prompt: 'Classifique cada pensador ou obra na área de conhecimento correspondente.',
    sentences: [
      { id: 'q5-s1', text: 'Jean-Paul Sartre' },
      { id: 'q5-s2', text: 'Émile Durkheim' },
      { id: 'q5-s3', text: "Carolina de Jesus, em 'Quarto de Despejo'" },
    ],
    tags: [
      { id: 'filosofia',  label: 'Filosofia' },
      { id: 'sociologia', label: 'Sociologia' },
      { id: 'literatura', label: 'Literatura' },
    ],
    mapping: {
      'q5-s1': 'filosofia',
      'q5-s2': 'sociologia',
      'q5-s3': 'literatura',
    },
  },

  // ── Q6 — TagMatch (many-to-few): citação de D2 vs. citação de D1 ────────────
  {
    id: 'fase-d2-citacao-6',
    kind: 'tag-match',
    prompt:
      'Classifique cada citação: ela é adequada ao D2 (filosófica, literária ou sociológica) ou é típica do D1 (dado estatístico)?',
    sentences: [
      { id: 'q6-s1', text: "Segundo o filósofo Hans Jonas, em sua obra 'O Princípio Responsabilidade', as gerações atuais têm o dever ético de garantir a continuidade da vida no planeta." },
      { id: 'q6-s2', text: 'Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade.' },
      { id: 'q6-s3', text: "Conforme Norbert Elias, em 'A Solidão dos Moribundos', o distanciamento social contemporâneo isola os indivíduos nos momentos de maior fragilidade." },
      { id: 'q6-s4', text: 'Segundo pesquisa do Instituto Locomotiva, mais de 70% dos brasileiros já presenciaram discriminação em ambientes públicos.' },
      { id: 'q6-s5', text: 'De acordo com Michel Foucault, as instituições modernas priorizam o controle em detrimento do cuidado individualizado.' },
      { id: 'q6-s6', text: 'Segundo o Conselho Federal de Medicina, municípios do interior contam com menos de um médico para cada mil habitantes.' },
      { id: 'q6-s7', text: 'Segundo a psiquiatra Elisabeth Kübler-Ross, o luto é composto por estágios que precisam ser vividos plenamente.' },
      { id: 'q6-s8', text: 'Segundo dados do Fórum Brasileiro de Segurança Pública, a maior parte dos homicídios ocorre em bairros com baixa presença policial.' },
    ],
    tags: [
      { id: 'd2', label: 'Citação adequada ao D2' },
      { id: 'd1', label: 'Citação típica do D1' },
    ],
    mapping: {
      'q6-s1': 'd2',
      'q6-s2': 'd1',
      'q6-s3': 'd2',
      'q6-s4': 'd1',
      'q6-s5': 'd2',
      'q6-s6': 'd1',
      'q6-s7': 'd2',
      'q6-s8': 'd1',
    },
  },

  // ── Q7 — BuildFromScratch: montar a citação sociológica (solidão) ───────────
  {
    id: 'fase-d2-citacao-7',
    kind: 'build',
    prompt: 'Tema "solidão": monte a citação do D2 na ordem correta.',
    fragments: [
      { id: 'q7-f1', text: 'Segundo o sociólogo Norbert Elias',                      correct: true  },
      { id: 'q7-f2', text: "em sua obra 'A Solidão dos Moribundos'",                  correct: true  },
      { id: 'q7-f3', text: 'o distanciamento social contemporâneo',                  correct: true  },
      { id: 'q7-f4', text: 'tende a isolar os indivíduos',                           correct: true  },
      { id: 'q7-f5', text: 'justamente nos momentos de maior fragilidade',           correct: true  },
      { id: 'q7-d1', text: 'conforme aponta uma pesquisa do IBGE',                   correct: false },
      { id: 'q7-d2', text: 'isso se resolve com mais tecnologia',                    correct: false },
    ],
    acceptedOrders: [['q7-f1', 'q7-f2', 'q7-f3', 'q7-f4', 'q7-f5']],
  },

  // ── Q8 — BuildFromScratch: montar a citação (luto) ──────────────────────────
  {
    id: 'fase-d2-citacao-8',
    kind: 'build',
    prompt: 'Tema "luto": monte a citação do D2 na ordem correta.',
    fragments: [
      { id: 'q8-f1', text: 'Segundo a psiquiatra Elisabeth Kübler-Ross',             correct: true  },
      { id: 'q8-f2', text: 'o luto é composto por estágios',                         correct: true  },
      { id: 'q8-f3', text: 'que precisam ser vividos plenamente',                    correct: true  },
      { id: 'q8-f4', text: 'para que ocorra a superação saudável da perda',          correct: true  },
      { id: 'q8-d1', text: 'o luto deve ser evitado a todo custo',                   correct: false },
      { id: 'q8-d2', text: 'não existe forma correta de superar uma perda',          correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3', 'q8-f4']],
  },

  // ── Q9 — BuildFromScratch: junção motivo + citação (preconceito) ────────────
  // New citation (Simone de Beauvoir), distinct from the Bauman one used for this
  // theme in fase-d2-formula.
  {
    id: 'fase-d2-citacao-9',
    kind: 'build',
    prompt: 'Tema "preconceito": junte o motivo à citação, na ordem correta (a citação vem por último).',
    fragments: [
      { id: 'q9-f1', text: 'visto que a impunidade reforça a sensação de normalidade',                  correct: true  },
      { id: 'q9-f2', text: 'em relação a comportamentos discriminatórios',                              correct: true  },
      { id: 'q9-f3', text: 'Segundo Simone de Beauvoir',                                                correct: true  },
      { id: 'q9-f4', text: 'a alteridade é frequentemente usada',                                       correct: true  },
      { id: 'q9-f5', text: 'como justificativa para a exclusão daquele que é visto como diferente',     correct: true  },
      { id: 'q9-d1', text: 'isso nunca ocorre na prática',                                              correct: false },
      { id: 'q9-d2', text: 'de acordo com dados do IBGE',                                               correct: false },
    ],
    acceptedOrders: [['q9-f1', 'q9-f2', 'q9-f3', 'q9-f4', 'q9-f5']],
  },

  // ── Q10 — OrderPuzzle: junção final conectivo+problemática+motivo+citação ───
  // (meio ambiente). The off-theme Foucault citação is a pool-only distractor:
  // placing it displaces a required block and always fails the check.
  {
    id: 'fase-d2-citacao-10',
    kind: 'order',
    prompt:
      'Tema "meio ambiente": ordene o parágrafo do D2 até a citação (conectivo + problemática + motivo + citação). Cuidado com a frase que não pertence a este tema.',
    items: [
      { id: 'q10-i1', label: 'Ademais,' },
      { id: 'q10-i2', label: 'destaca-se a fiscalização insuficiente contra o desmatamento como um entrave à preservação ambiental no Brasil,' },
      { id: 'q10-i3', label: 'uma vez que a falta de agentes de controle permite a expansão de atividades ilegais em áreas protegidas.' },
      { id: 'q10-i4', label: "Conforme o filósofo Hans Jonas, em sua obra 'O Princípio Responsabilidade', as gerações atuais têm o dever ético de garantir a continuidade da vida no planeta." },
    ],
    distractors: [
      { id: 'q10-d1', label: 'Segundo o filósofo Michel Foucault, as instituições modernas frequentemente priorizam o controle e a gestão em detrimento do cuidado individualizado com os indivíduos.' },
    ],
  },
];
