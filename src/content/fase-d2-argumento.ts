import type { ActivityData } from '../engine/types';

// Desenvolvimento 2 — o argumento (frase de fechamento). Mirrors the exact
// "aprofunda vs. repete vs. foge do assunto" logic validated in
// fase-d1-argumento: a good argumento deepens the impact (shows a consequence
// or explains a deeper cause) instead of restating the problem or drifting
// off-topic. ChoiceSelect and ErrorSpot warm-ups, TagMatch classification
// (bijective then many-to-few), a BuildFromScratch ramp, and — like D1 — the
// junção (citação+argumento, then the full paragraph) always comes last.

export const faseD2ArgumentoActivities: ActivityData[] = [
  // ── Q1 — ChoiceSelect: argumento que aprofunda o impacto (saúde) ────────────
  {
    id: 'fase-d2-argumento-1',
    kind: 'choice',
    prompt:
      'Parágrafo até a citação: "Segundo o filósofo Michel Foucault, as instituições modernas frequentemente priorizam o controle e a gestão em detrimento do cuidado individualizado com os indivíduos." — Qual das opções abaixo é o argumento mais adequado para fechar esse parágrafo, aprofundando o impacto do problema?',
    options: [
      { id: 'q1-b', text: 'Assim, os hospitais brasileiros estão sempre superlotados.' },
      { id: 'q1-a', text: 'Desse modo, a sobrecarga do sistema público compromete o atendimento adequado aos pacientes, aumentando o tempo de espera e agravando quadros de saúde que poderiam ser tratados a tempo.' },
      { id: 'q1-c', text: 'Portanto, é importante fazer exercícios físicos regularmente.' },
      { id: 'q1-d', text: 'Logo, o Brasil precisa de mais escolas técnicas.' },
    ],
    correctOptionId: 'q1-a',
    explanation:
      'A opção correta aprofunda o impacto: mostra as consequências reais (mais tempo de espera, agravamento de quadros). "Os hospitais estão sempre superlotados" apenas repete o problema; "fazer exercícios" e "mais escolas técnicas" fogem do tema.',
  },

  // ── Q2 — ChoiceSelect: argumento que mostra causa mais profunda (violência) ─
  {
    id: 'fase-d2-argumento-2',
    kind: 'choice',
    prompt:
      'Parágrafo até a citação: "Conforme o filósofo Thomas Hobbes, em sua obra \'Leviatã\', a ausência de uma autoridade que garanta a ordem leva à instauração do caos social." — Qual argumento aprofunda o impacto mostrando uma causa mais profunda?',
    options: [
      { id: 'q2-b', text: 'Assim, a violência urbana é um problema grave no Brasil.' },
      { id: 'q2-d', text: 'Portanto, a violência sempre existiu na história da humanidade.' },
      { id: 'q2-a', text: 'Logo, a fragilidade do sistema de justiça contribui para a perpetuação do ciclo de violência, afetando principalmente as comunidades mais vulneráveis.' },
      { id: 'q2-c', text: 'Dessa forma, é fundamental praticar esportes desde a infância.' },
    ],
    correctOptionId: 'q2-a',
    explanation:
      'A opção correta mostra a causa mais profunda e o impacto: a fragilidade da justiça perpetua o ciclo de violência e atinge os mais vulneráveis. "É um problema grave" apenas repete; "praticar esportes" foge do tema; "sempre existiu na história" generaliza sem aprofundar.',
  },

  // ── Q3 — ErrorSpot (single): argumento que repete a problemática (solidão) ──
  {
    id: 'fase-d2-argumento-3',
    kind: 'error-spot',
    prompt: 'As frases abaixo formam um D2 sobre solidão. Uma delas não aprofunda o parágrafo. Toque na frase com erro.',
    sentences: [
      { id: 'q3-s1', text: 'Em segunda análise, evidencia-se o abandono familiar de idosos como um agravante do isolamento social no Brasil, pois a ausência de vínculos afetivos próximos compromete o bem-estar emocional dessa parcela da população.' },
      { id: 'q3-s2', text: "Segundo o sociólogo Norbert Elias, em sua obra 'A Solidão dos Moribundos', o distanciamento social contemporâneo tende a isolar os indivíduos justamente nos momentos de maior fragilidade." },
      { id: 'q3-s3', text: 'Assim, o abandono familiar de idosos é um problema sério no Brasil.' },
    ],
    errorSentenceIds: ['q3-s3'],
    explanation:
      'S3 apenas repete a problemática já apresentada, sem mostrar uma consequência ou causa mais profunda.',
  },

  // ── Q4 — ErrorSpot (multiple): dois argumentos incorretos (luto) ────────────
  {
    id: 'fase-d2-argumento-4',
    kind: 'error-spot',
    prompt:
      'Abaixo, o parágrafo do D2 sobre luto até a citação, seguido de três possíveis argumentos. Dois deles estão errados — toque em um argumento que NÃO fecha bem o parágrafo.',
    contextText:
      'Em segundo lugar, destaca-se o silenciamento do luto no ambiente de trabalho como um obstáculo ao processo de elaboração emocional das perdas, uma vez que a pressão por produtividade não permite tempo adequado para o enfrentamento da dor. Segundo a psiquiatra Elisabeth Kübler-Ross, o luto é composto por estágios que precisam ser vividos plenamente para que ocorra a superação saudável da perda.',
    sentences: [
      { id: 'q4-a1', text: 'Desse modo, a ausência de acolhimento nos espaços profissionais prolonga o sofrimento e compromete a saúde mental dos trabalhadores enlutados.' },
      { id: 'q4-a2', text: 'Assim, é importante ter um bom plano de carreira.' },
      { id: 'q4-a3', text: 'Logo, o luto não é acolhido no ambiente de trabalho.' },
    ],
    errorSentenceIds: ['q4-a2', 'q4-a3'],
    explanation:
      'A1 aprofunda o impacto: mostra a consequência (prolonga o sofrimento e compromete a saúde mental). A2 foge do tema (plano de carreira). A3 apenas repete o motivo já apresentado (o luto não é acolhido), sem avançar.',
  },

  // ── Q5 — TagMatch (bijective): consequência × causa mais profunda ───────────
  {
    id: 'fase-d2-argumento-5',
    kind: 'tag-match',
    prompt:
      'Classifique cada argumento: ele fecha o parágrafo mostrando uma consequência ou explicando uma causa mais profunda?',
    sentences: [
      { id: 'q5-s1', text: 'Desse modo, a sobrecarga do sistema público compromete o atendimento adequado aos pacientes, aumentando o tempo de espera.' },
      { id: 'q5-s2', text: 'Isto se deve ao fato de a sociedade ainda associar o cuidado a um papel natural feminino, e não a uma escolha consciente.' },
    ],
    tags: [
      { id: 'consequencia', label: 'Consequência' },
      { id: 'causa',        label: 'Causa mais profunda' },
    ],
    mapping: {
      'q5-s1': 'consequencia',
      'q5-s2': 'causa',
    },
  },

  // ── Q6 — TagMatch (many-to-few): aprofunda × não aprofunda ──────────────────
  {
    id: 'fase-d2-argumento-6',
    kind: 'tag-match',
    prompt: 'Classifique cada frase: ela aprofunda o impacto do problema ou não (repete ou foge do tema)?',
    sentences: [
      { id: 'q6-s1', text: 'Logo, a fragilidade do sistema de justiça contribui para a perpetuação do ciclo de violência.' },
      { id: 'q6-s2', text: 'Assim, a violência é um problema no Brasil.' },
      { id: 'q6-s3', text: 'Desse modo, a ausência de acolhimento prolonga o sofrimento dos trabalhadores enlutados.' },
      { id: 'q6-s4', text: 'É importante ter um bom plano de carreira.' },
      { id: 'q6-s5', text: 'Assim, a leniência na fiscalização compromete os ecossistemas e o futuro das próximas gerações.' },
      { id: 'q6-s6', text: 'O meio ambiente precisa ser cuidado.' },
      { id: 'q6-s7', text: 'Logo, esse padrão é enraizado na sociedade, dificultando mudanças estruturais na divisão das tarefas.' },
      { id: 'q6-s8', text: 'É fundamental praticar esportes desde a infância.' },
    ],
    tags: [
      { id: 'aprofunda',     label: 'Aprofunda o impacto' },
      { id: 'nao-aprofunda', label: 'Não aprofunda — repete ou foge do tema' },
    ],
    mapping: {
      'q6-s1': 'aprofunda',
      'q6-s2': 'nao-aprofunda',
      'q6-s3': 'aprofunda',
      'q6-s4': 'nao-aprofunda',
      'q6-s5': 'aprofunda',
      'q6-s6': 'nao-aprofunda',
      'q6-s7': 'aprofunda',
      'q6-s8': 'nao-aprofunda',
    },
  },

  // ── Q7 — BuildFromScratch: montar o argumento (trabalho de cuidado) ─────────
  {
    id: 'fase-d2-argumento-7',
    kind: 'build',
    prompt: 'Tema "trabalho de cuidado" (Quarto de Despejo): monte o argumento do D2 na ordem correta.',
    fragments: [
      { id: 'q7-f1', text: 'Logo, esse padrão é enraizado na sociedade',              correct: true  },
      { id: 'q7-f2', text: 'dificultando mudanças estruturais',                       correct: true  },
      { id: 'q7-f3', text: 'na divisão das tarefas entre homens e mulheres',          correct: true  },
      { id: 'q7-d1', text: 'o que é motivo de orgulho para as famílias',              correct: false },
      { id: 'q7-d2', text: 'sem nenhum impacto na vida das mulheres',                 correct: false },
    ],
    acceptedOrders: [['q7-f1', 'q7-f2', 'q7-f3']],
  },

  // ── Q8 — BuildFromScratch: montar o argumento (meio ambiente) ───────────────
  {
    id: 'fase-d2-argumento-8',
    kind: 'build',
    prompt: 'Tema "meio ambiente": monte o argumento do D2 na ordem correta.',
    fragments: [
      { id: 'q8-f1', text: 'Assim, a leniência na fiscalização',                      correct: true  },
      { id: 'q8-f2', text: 'compromete não apenas os ecossistemas atuais',            correct: true  },
      { id: 'q8-f3', text: 'mas também o futuro das próximas gerações',               correct: true  },
      { id: 'q8-d1', text: 'o que garante maior biodiversidade',                      correct: false },
      { id: 'q8-d2', text: 'sem qualquer relação com o desmatamento',                 correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3']],
  },

  // ── Q9 — BuildFromScratch: junção citação + argumento (preconceito) ─────────
  // Uses the Simone de Beauvoir citation established in fase-d2-citacao for this
  // theme, now joined to the argumento (citação vem antes, argumento fecha).
  {
    id: 'fase-d2-argumento-9',
    kind: 'build',
    prompt: 'Tema "preconceito": junte a citação ao argumento, na ordem correta (o argumento fecha o parágrafo).',
    fragments: [
      { id: 'q9-f1', text: 'Segundo Simone de Beauvoir',                                          correct: true  },
      { id: 'q9-f2', text: 'a alteridade é frequentemente usada',                                 correct: true  },
      { id: 'q9-f3', text: 'como justificativa para a exclusão daquele que é visto como diferente', correct: true  },
      { id: 'q9-f4', text: 'Logo, o preconceito estrutural',                                      correct: true  },
      { id: 'q9-f5', text: 'impede a construção de uma convivência verdadeiramente democrática',   correct: true  },
      { id: 'q9-f6', text: 'afetando a autoestima e as oportunidades das vítimas de discriminação', correct: true  },
      { id: 'q9-d1', text: 'isso nunca ocorre na prática',                                         correct: false },
      { id: 'q9-d2', text: 'sem qualquer relação com a educação',                                 correct: false },
    ],
    acceptedOrders: [['q9-f1', 'q9-f2', 'q9-f3', 'q9-f4', 'q9-f5', 'q9-f6']],
  },

  // ── Q10 — OrderPuzzle: junção final do D2 completo (saúde) ──────────────────
  // conectivo + problemática + motivo + citação + argumento. The off-theme
  // argumento (meio ambiente) is a pool-only distractor: placing it displaces a
  // required block and always fails the check.
  {
    id: 'fase-d2-argumento-10',
    kind: 'order',
    prompt:
      'Tema "saúde": ordene o parágrafo completo do D2 (conectivo + problemática + motivo + citação + argumento). Cuidado com a frase que não pertence a este tema.',
    items: [
      { id: 'q10-i1', label: 'Em segundo lugar,' },
      { id: 'q10-i2', label: 'evidencia-se a superlotação das unidades de saúde como um entrave à qualidade do atendimento à população brasileira,' },
      { id: 'q10-i3', label: 'visto que a demanda por serviços básicos ultrapassa a capacidade de atendimento das unidades disponíveis.' },
      { id: 'q10-i4', label: 'Segundo o filósofo Michel Foucault, as instituições modernas frequentemente priorizam o controle e a gestão em detrimento do cuidado individualizado com os indivíduos.' },
      { id: 'q10-i5', label: 'Desse modo, a sobrecarga do sistema público compromete o atendimento adequado aos pacientes, aumentando o tempo de espera e agravando quadros de saúde que poderiam ser tratados a tempo.' },
    ],
    distractors: [
      { id: 'q10-d1', label: 'Assim, a leniência na fiscalização compromete não apenas os ecossistemas atuais, mas também o futuro das próximas gerações.' },
    ],
  },
];
