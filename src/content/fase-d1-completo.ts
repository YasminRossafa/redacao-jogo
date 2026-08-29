import type { ActivityData } from '../engine/types';
import { TEMA_BANK } from './shared-bank';

// D1 content for the shared intro-bank themes (saude, meioambiente, …).
const d1 = (id: string) => TEMA_BANK.find((e) => e.id === id)!.d1;

// ─── Reference paragraphs ────────────────────────────────────────────────────
// Exact wording used across all activities in this phase.

const ANNE_SULLIVAN = {
  rep:  "Em 'O Milagre de Anne Sullivan', Helen Keller, uma menina surda, enfrenta dificuldades no seu processo de alfabetização.",
  tema: 'Assim como a personagem, muitos alunos sofrem com os desafios para a formação educacional de surdos no Brasil.',
  prob: 'A falta de acessibilidade nas escolas e a exclusão de pessoas surdas no mercado de trabalho são problemas desse tema.',
  d1p:  'Em primeiro lugar, destaca-se a falta de acessibilidade nas instituições de ensino como um dos principais entraves à inclusão educacional de surdos, uma vez que muitas escolas públicas não possuem intérpretes de Libras disponíveis em tempo integral.',
  d1c:  'Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade.',
  d1a:  'Desse modo, a ausência de recursos inclusivos contribui para o sentimento de exclusão, levando ao abandono escolar e à limitação de oportunidades no futuro.',
};

const QUEHORASELA = {
  rep:  "No filme 'Que Horas Ela Volta?', a protagonista Val mora e trabalha na casa de uma família rica, abdicando da própria vida e se afastando da filha em nome do trabalho de cuidado que exerce.",
  tema: 'Assim como no longa-metragem, no Brasil, ainda existem desafios para enfrentar a invisibilidade do trabalho de cuidado exercido pela mulher.',
  prob: 'Dois problemas desse tema são que as mulheres são responsáveis por grande parte do serviço, além daquele que não é remunerado.',
  d1p:  'Primeiramente, destaca-se que as mulheres são responsáveis por grande parte dos serviços de cuidado, e isso é um problema pois tais trabalhos são invisibilizados diante da sociedade.',
  d1c:  'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
  d1a:  'Isto se deve ao fato de elas não terem seu esforço reconhecido devido ao seu círculo social.',
};

const QUARTODESPEJO = {
  rep:  "O livro 'Quarto de Despejo', de Carolina de Jesus, retrata a história de uma mãe que trabalha como catadora de materiais recicláveis para sustentar os filhos.",
  tema: 'Em paralelo com a realidade, ainda existem muitos desafios no enfrentamento da invisibilidade do trabalho de cuidado exercido pela mulher no Brasil.',
  prob: 'Dois problemas desse tema são o pensamento estrutural de que esse tipo de serviço deve ser realizado pela mulher, além de que a maior parte dele não é remunerada.',
  d1p:  'Em primeiro lugar, destaca-se que o trabalho de cuidado é normalizado como responsabilidade exclusiva da mulher, pois isso reforça uma construção social enraizada.',
  d1c:  'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
  d1a:  'Desse modo, essa naturalização contribui para a manutenção da desigualdade de oportunidades entre homens e mulheres no mercado de trabalho.',
};

const VOZSILENCIO_INTRO =
  "No desenho japonês 'A Voz do Silêncio', uma menina surda entra em uma escola comum e começa a enfrentar preconceito e diversos atos de violência, tendo assim que mudar de escola. " +
  'Fora da ficção, existem desafios para a formação educacional de surdos no Brasil. ' +
  'A ausência de inclusão social na formação de Libras e o preconceito pela individualidade de pessoas surdas são problemas decorrentes desse tema.';

export const faseD1CompletoActivities: ActivityData[] = [

  // ════════════════════════════════════════════════════════════════════════════
  // BLOCO A — Introdução sozinha
  // ════════════════════════════════════════════════════════════════════════════

  // ── Q1 — OrderPuzzle: ordenar a introdução "Anne Sullivan" ──────────────────
  {
    id: 'fase-d1-completo-1',
    kind: 'order',
    prompt: 'Organize as três frases da introdução de "O Milagre de Anne Sullivan" na ordem correta.',
    items: [
      { id: 'q1-rep',  label: ANNE_SULLIVAN.rep  },
      { id: 'q1-tema', label: ANNE_SULLIVAN.tema },
      { id: 'q1-prob', label: ANNE_SULLIVAN.prob },
    ],
  },

  // ── Q2 — ChoiceSelect: qual problemática abre o D1? (A Voz do Silêncio) ─────
  {
    id: 'fase-d1-completo-2',
    kind: 'choice',
    prompt: `Introdução: "${VOZSILENCIO_INTRO}" — Qual problemática deve abrir o D1?`,
    options: [
      { id: 'q2-a', text: 'a ausência de inclusão social na formação de Libras' },
      { id: 'q2-b', text: 'o preconceito pela individualidade de pessoas surdas' },
      { id: 'q2-c', text: 'a falta de acessibilidade nas escolas' },
      { id: 'q2-d', text: 'a invisibilidade do trabalho de cuidado' },
    ],
    correctOptionId: 'q2-a',
    explanation:
      'O D1 retoma sempre a primeira problemática citada na introdução. Aqui a primeira é "a ausência de inclusão social na formação de Libras". A segunda ("preconceito pela individualidade") pertence ao D2. As demais são de outras introduções.',
  },

  // ── Q3 — ErrorSpot: uso de primeira pessoa na introdução (1984) ──────────────
  // Real 3-part introdução (repertório, tema+Brasil, problemática). Only ONE
  // version of the problemática sentence appears — the flawed one — so this is
  // spot-the-error, not spot-the-difference against a clean twin.
  {
    id: 'fase-d1-completo-3',
    kind: 'error-spot',
    prompt: 'Uma das frases abaixo tem um problema. Toque na que está errada.',
    sentences: [
      {
        id: 'q3-s1',
        text: "Na obra '1984', de George Orwell, o governo controla informações e limita a liberdade da população por meio da manipulação da verdade.",
      },
      {
        id: 'q3-s2',
        text: 'Embora seja uma obra fictícia, a manipulação do usuário pela informação na internet é uma realidade na sociedade brasileira.',
      },
      {
        id: 'q3-s3',
        text: 'Na minha opinião, a falta de educação midiática, que dificulta a análise das informações recebidas, e a ausência de regulamentação eficaz contra a desinformação, são problemas decorrentes desse tema.',
      },
    ],
    errorSentenceIds: ['q3-s3'],
    explanation:
      "A introdução deve ser sempre objetiva e impessoal. O uso de 'Na minha opinião' é primeira pessoa — proibido na redação ENEM. Basta remover a expressão e a frase fica correta.",
  },

  // ── Q4 — BuildFromScratch: montar a frase tema+Brasil de "Que Horas Ela Volta?" ─
  // Two accepted orders: "no Brasil" can appear in the middle or at the end.
  {
    id: 'fase-d1-completo-4',
    kind: 'build',
    prompt:
      'Monte a frase que liga o repertório ao tema e ao Brasil para a introdução de "Que Horas Ela Volta?".',
    fragments: [
      { id: 'q4-f1', text: 'Assim como no longa-metragem,',                                                              correct: true  },
      { id: 'q4-f2', text: 'no Brasil,',                                                                                  correct: true  },
      { id: 'q4-f3', text: 'ainda existem desafios para enfrentar a invisibilidade do trabalho de cuidado exercido pela mulher.', correct: true },
      { id: 'q4-d1', text: 'em todo o mundo,',                                                                            correct: false },
      { id: 'q4-d2', text: 'Eu acredito que,',                                                                            correct: false },
    ],
    acceptedOrders: [
      ['q4-f1', 'q4-f2', 'q4-f3'],
      ['q4-f1', 'q4-f3', 'q4-f2'],
    ],
  },

  // ── Q5 — TagMatch: intro surdos vs. intro trabalho de cuidado (many-to-few) ──
  {
    id: 'fase-d1-completo-5',
    kind: 'tag-match',
    prompt: 'Associe cada problemática à introdução em que ela aparece.',
    sentences: [
      { id: 'q5-s1', text: 'a falta de acessibilidade nas escolas' },
      { id: 'q5-s2', text: 'a exclusão de pessoas surdas no mercado de trabalho' },
      { id: 'q5-s3', text: 'as mulheres são responsáveis por grande parte do serviço' },
      { id: 'q5-s4', text: 'aquele [serviço] não é remunerado' },
    ],
    tags: [
      { id: 'surdos',  label: 'Pertence à introdução dos surdos' },
      { id: 'cuidado', label: 'Pertence à introdução do trabalho de cuidado' },
    ],
    mapping: {
      'q5-s1': 'surdos',
      'q5-s2': 'surdos',
      'q5-s3': 'cuidado',
      'q5-s4': 'cuidado',
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // BLOCO B — D1 sozinho
  // ════════════════════════════════════════════════════════════════════════════

  // ── Q6 — ErrorSpot: conectivo errado ("Ademais") no D1 ──────────────────────
  {
    id: 'fase-d1-completo-6',
    kind: 'error-spot',
    prompt: 'Uma das frases abaixo tem um problema. Toque na que está errada.',
    sentences: [
      {
        id: 'q6-s1',
        text: ANNE_SULLIVAN.d1p,
      },
      {
        id: 'q6-s2',
        text: 'Ademais, destaca-se a falta de acessibilidade nas instituições de ensino como um dos principais entraves à inclusão educacional de surdos, uma vez que muitas escolas públicas não possuem intérpretes de Libras disponíveis em tempo integral.',
      },
      {
        id: 'q6-s3',
        text: QUEHORASELA.d1p,
      },
    ],
    errorSentenceIds: ['q6-s2'],
    explanation:
      '"Ademais" sinaliza adição/segunda ideia — não pode abrir o D1. O conectivo do D1 deve indicar que este é o primeiro argumento: "Em primeiro lugar", "Primeiramente", "Em primeira análise" ou "Antes de mais nada".',
  },

  // ── Q7 — ChoiceSelect: completar o motivo corretamente (violência urbana) ───
  {
    id: 'fase-d1-completo-7',
    kind: 'choice',
    prompt:
      'O D1 começa assim: "Em primeiro lugar, destaca-se a ausência de policiamento em áreas periféricas como um dos principais fatores que agravam a violência urbana," Qual opção completa o motivo corretamente?',
    options: [
      {
        id: 'q7-a',
        text: 'uma vez que essas regiões recebem menos investimento em segurança pública',
      },
      {
        id: 'q7-b',
        text: 'pois há ausência de policiamento em áreas periféricas',
      },
    ],
    correctOptionId: 'q7-a',
    explanation:
      'A opção correta apresenta uma causa real (menos investimento em segurança pública). A outra repete a própria problemática com outras palavras — isso é raciocínio circular e não explica por que o problema é um problema.',
  },

  // ── Q8 — BuildFromScratch: 1ª frase do D1 (Quarto de Despejo) ───────────────
  {
    id: 'fase-d1-completo-8',
    kind: 'build',
    prompt: 'Monte a primeira frase do D1 para o tema de "Quarto de Despejo".',
    fragments: [
      { id: 'q8-f1', text: 'Em primeiro lugar,',                                                                    correct: true  },
      { id: 'q8-f2', text: 'destaca-se que o trabalho de cuidado é normalizado como responsabilidade exclusiva da mulher,', correct: true },
      { id: 'q8-f3', text: 'pois isso reforça uma construção social enraizada.',                                    correct: true  },
      { id: 'q8-d1', text: 'pois as mulheres preferem esse tipo de trabalho,',                                     correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3']],
  },

  // ── Q9 — ChoiceSelect: citação relevante para "Quarto de Despejo" D1 ─────────
  {
    id: 'fase-d1-completo-9',
    kind: 'choice',
    prompt:
      'A problemática do D1 de "Quarto de Despejo" é: "o trabalho de cuidado é normalizado como responsabilidade exclusiva da mulher". Qual citação sustenta diretamente esse argumento?',
    options: [
      {
        id: 'q9-a',
        text: QUARTODESPEJO.d1c,
      },
      {
        id: 'q9-b',
        text: 'Segundo dados do IBGE, o Brasil tem mais de 213 milhões de habitantes.',
      },
      {
        id: 'q9-c',
        text: 'Segundo o Censo Escolar do MEC, apenas 25% das escolas públicas possuem intérprete de Libras em tempo integral.',
      },
    ],
    correctOptionId: 'q9-a',
    explanation:
      'A citação da PNAD mostra a disparidade real na divisão do trabalho doméstico entre homens e mulheres — sustentando diretamente a problemática. As demais são irrelevantes: população total e acessibilidade em escolas não têm relação com o argumento.',
  },

  // ── Q10 — ErrorSpot: argumento repete a citação (meio ambiente) ─────────────
  {
    id: 'fase-d1-completo-10',
    kind: 'error-spot',
    prompt: 'Uma das frases abaixo tem um problema. Toque na que está errada.',
    sentences: [
      { id: 'q10-s1', text: d1('meioambiente').citacao },
      { id: 'q10-s2', text: 'Desse modo, poucos municípios oferecem coleta seletiva de lixo.' },
      { id: 'q10-s3', text: d1('meioambiente').argumento },
    ],
    errorSentenceIds: ['q10-s2'],
    explanation:
      'O argumento apenas reafirma o dado da citação com outras palavras. O argumento precisa ir além — mostrar uma consequência ou explicar uma causa mais profunda que o dado não explicita.',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // BLOCO C — Junção introdução + D1
  // ════════════════════════════════════════════════════════════════════════════

  // ── Q11 — ErrorSpot: problemática copiada literalmente da introdução ─────────
  // The introdução's problemática is fixed context (non-tappable); the student
  // judges only the two candidate D1 openings against it, tapping the one that
  // just copies the introdução verbatim instead of reescrevendo (paráfrase).
  {
    id: 'fase-d1-completo-11',
    kind: 'error-spot',
    prompt: 'As duas frases abaixo são aberturas possíveis para o D1, que deve retomar a problemática da introdução. Uma delas tem um problema. Toque na que está errada.',
    contextText:
      `Problemática da introdução: "${ANNE_SULLIVAN.prob}"`,
    sentences: [
      {
        id: 'q11-s1',
        text: 'Em primeiro lugar, a falta de acessibilidade nas escolas e a exclusão de pessoas surdas no mercado de trabalho são problemas desse tema, uma vez que muitas escolas públicas não possuem intérpretes de Libras disponíveis em tempo integral.',
      },
      {
        id: 'q11-s2',
        text: ANNE_SULLIVAN.d1p,
      },
    ],
    errorSentenceIds: ['q11-s1'],
    explanation:
      'A problemática do D1 foi copiada palavra por palavra da introdução em vez de ser reescrita nas próprias palavras. O D1 deve retomar a ideia com uma formulação diferente (paráfrase), como faz a outra abertura.',
  },

  // ── Q12 — ChoiceSelect: identificar o erro de escolha de problemática ─────────
  {
    id: 'fase-d1-completo-12',
    kind: 'choice',
    prompt:
      'Introdução de "Que Horas Ela Volta?": "...Dois problemas desse tema são que as mulheres são responsáveis por grande parte do serviço, além daquele que não é remunerado." — D1 construído: "Em primeiro lugar, destaca-se que a maior parte do trabalho de cuidado não é remunerada, pois esse serviço não é reconhecido financeiramente pela sociedade." — O que está errado nessa construção?',
    options: [
      { id: 'q12-a', text: 'Usa a 2ª problemática da introdução, que pertence ao D2' },
      { id: 'q12-b', text: 'O motivo está circular' },
      { id: 'q12-c', text: 'Falta o conectivo' },
    ],
    correctOptionId: 'q12-a',
    explanation:
      'A introdução lista dois problemas: 1º "as mulheres são responsáveis por grande parte do serviço"; 2º "aquele que não é remunerado". O D1 deve retomar o primeiro. "A maior parte não é remunerada" é a segunda problemática — pertence ao D2. O motivo nessa frase até explica bem, e o conectivo está presente; o erro é qual problemática foi escolhida.',
  },

  // ── Q13 — OrderPuzzle: sequenciar as 6 frases da intro+D1 "Anne Sullivan" ────
  // OrderPuzzle renders items.length slots dynamically — 6 items is supported.
  {
    id: 'fase-d1-completo-13',
    kind: 'order',
    prompt: 'Organize as seis frases da introdução + D1 de "O Milagre de Anne Sullivan" na sequência correta.',
    items: [
      { id: 'q13-i1', label: ANNE_SULLIVAN.rep  },
      { id: 'q13-i2', label: ANNE_SULLIVAN.tema },
      { id: 'q13-i3', label: ANNE_SULLIVAN.prob },
      { id: 'q13-i4', label: ANNE_SULLIVAN.d1p  },
      { id: 'q13-i5', label: ANNE_SULLIVAN.d1c  },
      { id: 'q13-i6', label: ANNE_SULLIVAN.d1a  },
    ],
  },

  // ── Q14 — BuildFromScratch: paráfrase vs. cópia literal (Quarto de Despejo) ──
  {
    id: 'fase-d1-completo-14',
    kind: 'build',
    prompt:
      'Monte a abertura correta do D1 de "Quarto de Despejo" — reescrevendo a problemática com suas próprias palavras, não copiando literalmente da introdução.',
    fragments: [
      { id: 'q14-f1', text: 'Em primeiro lugar,',                                                                    correct: true  },
      { id: 'q14-f2', text: 'destaca-se que o trabalho de cuidado é normalizado como responsabilidade exclusiva da mulher,', correct: true },
      { id: 'q14-f3', text: 'pois isso reforça uma construção social enraizada.',                                    correct: true  },
      { id: 'q14-d1', text: 'o pensamento estrutural de que esse tipo de serviço deve ser realizado pela mulher,',  correct: false },
    ],
    acceptedOrders: [['q14-f1', 'q14-f2', 'q14-f3']],
  },

  // ── Q15 — TagMatch: combina intro+D1 corretamente? (many-to-few, 4×2) ────────
  {
    id: 'fase-d1-completo-15',
    kind: 'tag-match',
    prompt: 'Avalie cada par: a problemática do D1 corresponde à primeira problemática citada na introdução?',
    sentences: [
      {
        id: 'q15-s1',
        text: 'INTRO (Anne Sullivan): "...a falta de acessibilidade nas escolas..." | D1: "Em primeiro lugar, destaca-se a falta de acessibilidade nas instituições de ensino..."',
      },
      {
        id: 'q15-s2',
        text: 'INTRO (Anne Sullivan): "...a falta de acessibilidade nas escolas..." | D1: "Em primeiro lugar, destaca-se a exclusão de pessoas surdas no mercado de trabalho..."',
      },
      {
        id: 'q15-s3',
        text: 'INTRO (Quarto de Despejo): "...pensamento estrutural de que esse tipo de serviço deve ser realizado pela mulher..." | D1: "Em primeiro lugar, destaca-se que o trabalho de cuidado é normalizado como responsabilidade exclusiva da mulher..."',
      },
      {
        id: 'q15-s4',
        text: 'INTRO (Quarto de Despejo): "...pensamento estrutural..." | D1: "Em primeiro lugar, destaca-se que a maior parte do trabalho de cuidado não é remunerada..."',
      },
    ],
    tags: [
      { id: 'combina',     label: 'Combina intro+D1 corretamente' },
      { id: 'nao-combina', label: 'Não combina' },
    ],
    mapping: {
      'q15-s1': 'combina',
      'q15-s2': 'nao-combina',
      'q15-s3': 'combina',
      'q15-s4': 'nao-combina',
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // BLOCO D — Desafio final
  // ════════════════════════════════════════════════════════════════════════════

  // ── Q16 — BuildFromScratch: D1 completo de "Quarto de Despejo" (frases completas) ──
  {
    id: 'fase-d1-completo-16',
    kind: 'build',
    prompt: 'Monte o parágrafo D1 completo de "Quarto de Despejo". Atenção: há frases de outro tema no pool.',
    fragments: [
      { id: 'q16-f1', text: QUARTODESPEJO.d1p, correct: true  },
      { id: 'q16-f2', text: QUARTODESPEJO.d1c, correct: true  },
      { id: 'q16-f3', text: QUARTODESPEJO.d1a, correct: true  },
      { id: 'q16-d1', text: ANNE_SULLIVAN.d1p,  correct: false },
      { id: 'q16-d2', text: ANNE_SULLIVAN.d1a,  correct: false },
    ],
    acceptedOrders: [['q16-f1', 'q16-f2', 'q16-f3']],
  },

  // ── Q17 — OrderPuzzle: sequenciar as 6 frases da intro+D1 "Que Horas Ela Volta?" ─
  {
    id: 'fase-d1-completo-17',
    kind: 'order',
    prompt: 'Organize as seis frases da introdução + D1 de "Que Horas Ela Volta?" na sequência correta.',
    items: [
      { id: 'q17-i1', label: QUEHORASELA.rep  },
      { id: 'q17-i2', label: QUEHORASELA.tema },
      { id: 'q17-i3', label: QUEHORASELA.prob },
      { id: 'q17-i4', label: QUEHORASELA.d1p  },
      { id: 'q17-i5', label: QUEHORASELA.d1c  },
      { id: 'q17-i6', label: QUEHORASELA.d1a  },
    ],
  },

  // ── Q18 — ErrorSpot: grand finale — full intro+D1, one error planted ─────────
  // Error type (c): irrelevant citation — PNAD/domestic-work data applied to the
  // surdos paragraph. Ties together all four error types from earlier phases.
  {
    id: 'fase-d1-completo-18',
    kind: 'error-spot',
    prompt:
      'Leia abaixo a introdução e o D1 de "O Milagre de Anne Sullivan". Uma das seis frases contém um erro. Encontre qual é.',
    sentences: [
      { id: 'q18-s1', text: ANNE_SULLIVAN.rep  },
      { id: 'q18-s2', text: ANNE_SULLIVAN.tema },
      { id: 'q18-s3', text: ANNE_SULLIVAN.prob },
      { id: 'q18-s4', text: ANNE_SULLIVAN.d1p  },
      {
        id: 'q18-s5',
        text: 'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
      },
      { id: 'q18-s6', text: ANNE_SULLIVAN.d1a  },
    ],
    errorSentenceIds: ['q18-s5'],
    explanation:
      'A citação é do tema trabalho de cuidado (PNAD / afazeres domésticos) — não tem nenhuma relação com a problemática deste parágrafo, que discute acessibilidade e inclusão de surdos. Tipo de erro: citação irrelevante — sustenta outro tema, não a problemática do próprio parágrafo.',
  },
];
