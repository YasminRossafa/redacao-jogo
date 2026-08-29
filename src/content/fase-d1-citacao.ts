import type { ActivityData } from '../engine/types';

export const faseD1CitacaoActivities: ActivityData[] = [
  // ── Q1 — TagMatch: fontes confiáveis vs. não confiáveis (many-to-few) ────────
  {
    id: 'fase-d1-citacao-1',
    kind: 'tag-match',
    prompt: 'Classifique cada item: é uma fonte confiável para citar dados em uma redação argumentativa?',
    sentences: [
      { id: 'q1-s1', text: 'IBGE' },
      { id: 'q1-s2', text: 'MEC' },
      { id: 'q1-s3', text: 'Uma ONG especializada (ex: Instituto Alana)' },
      { id: 'q1-s4', text: 'Uma universidade / pesquisa acadêmica' },
      { id: 'q1-s5', text: 'Uma rede social' },
      { id: 'q1-s6', text: 'Um vídeo viral' },
      { id: 'q1-s7', text: 'A opinião pessoal do autor' },
      { id: 'q1-s8', text: 'Um boato' },
    ],
    tags: [
      { id: 'confiavel',     label: 'Fonte confiável de dados' },
      { id: 'nao-confiavel', label: 'Não é uma fonte de dados confiável' },
    ],
    mapping: {
      'q1-s1': 'confiavel',
      'q1-s2': 'confiavel',
      'q1-s3': 'confiavel',
      'q1-s4': 'confiavel',
      'q1-s5': 'nao-confiavel',
      'q1-s6': 'nao-confiavel',
      'q1-s7': 'nao-confiavel',
      'q1-s8': 'nao-confiavel',
    },
  },

  // ── Q2 — ErrorSpot: fonte vaga ("estudos") ───────────────────────────────────
  {
    id: 'fase-d1-citacao-2',
    kind: 'error-spot',
    prompt: 'Uma das citações abaixo tem um problema. Toque na que está errada.',
    sentences: [
      { id: 'q2-s1', text: 'Segundo o Censo Escolar do MEC, apenas 25% das escolas públicas possuem intérprete de Libras em tempo integral.' },
      { id: 'q2-s2', text: 'Estudos afirmam que grande parte das escolas não têm acessibilidade.' },
      { id: 'q2-s3', text: 'De acordo com o IBGE, 1% das escolas brasileiras têm estrutura completa de acessibilidade.' },
    ],
    errorSentenceIds: ['q2-s2'],
    explanation:
      'Uma citação precisa nomear a fonte — instituição, pesquisa ou censo específico. "Estudos afirmam" não diz de onde vem o dado: qualquer pessoa poderia escrever isso sem embasamento real.',
  },

  // ── Q3 — ErrorSpot: ausência de atribuição ───────────────────────────────────
  {
    id: 'fase-d1-citacao-3',
    kind: 'error-spot',
    prompt: 'Uma das citações abaixo tem um problema. Toque na que está errada.',
    sentences: [
      { id: 'q3-s1', text: 'Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade.' },
      { id: 'q3-s2', text: 'As escolas brasileiras têm baixa estrutura de acessibilidade, apenas 1%.' },
      { id: 'q3-s3', text: 'Segundo o Censo Escolar do MEC, 25% das escolas públicas possuem intérprete de Libras.' },
    ],
    errorSentenceIds: ['q3-s2'],
    explanation:
      'Sem um "Segundo dados de..." ou "De acordo com...", a frase deixa de ser uma citação e vira uma afirmação não sustentada — como se o dado viesse da cabeça do próprio autor.',
  },

  // ── Q4 — TagMatch: instituição × tipo de dado (bijective, 4 × 4) ─────────────
  {
    id: 'fase-d1-citacao-4',
    kind: 'tag-match',
    prompt: 'Associe cada instituição ao tipo de dado que ela tipicamente publica.',
    sentences: [
      { id: 'q4-s1', text: 'IBGE' },
      { id: 'q4-s2', text: 'MEC' },
      { id: 'q4-s3', text: 'ONG especializada' },
      { id: 'q4-s4', text: 'Universidade / pesquisa acadêmica' },
    ],
    tags: [
      { id: 'demograficos', label: 'dados demográficos e estatísticas gerais da população' },
      { id: 'educacionais', label: 'dados educacionais e escolares' },
      { id: 'vulneraveis',  label: 'dados sobre populações específicas/vulneráveis' },
      { id: 'estudos',      label: 'estudos aprofundados sobre um tema' },
    ],
    mapping: {
      'q4-s1': 'demograficos',
      'q4-s2': 'educacionais',
      'q4-s3': 'vulneraveis',
      'q4-s4': 'estudos',
    },
  },

  // ── Q5 — ChoiceSelect: relevância da citação ─────────────────────────────────
  {
    id: 'fase-d1-citacao-5',
    kind: 'choice',
    prompt: 'A problemática do D1 é: "a falta de acessibilidade nas instituições de ensino". Qual das citações abaixo sustenta especificamente esse argumento?',
    options: [
      { id: 'q5-a', text: 'Segundo o Censo Escolar do MEC, apenas 25% das escolas públicas possuem intérprete de Libras em tempo integral.' },
      { id: 'q5-b', text: 'Segundo dados do IBGE, o Brasil tem mais de 213 milhões de habitantes.' },
      { id: 'q5-c', text: 'Segundo a ONU, o Brasil está entre os países com maior desigualdade social do mundo.' },
      { id: 'q5-d', text: 'Segundo pesquisas, jovens preferem estudar em casa.' },
    ],
    correctOptionId: 'q5-a',
    explanation:
      'A citação do MEC fala diretamente de intérpretes de Libras em escolas públicas — sustentando a problemática. As demais, ainda que bem formatadas, não têm relação direta com acessibilidade nas instituições de ensino: população total, desigualdade genérica e preferências de estudo não apoiam esse argumento específico.',
  },

  // ── Q6 — BuildFromScratch: montar a citação ──────────────────────────────────
  {
    id: 'fase-d1-citacao-6',
    kind: 'build',
    prompt: 'Monte a citação corretamente.',
    fragments: [
      { id: 'q6-f1', text: 'Segundo o Censo Escolar do MEC,',               correct: true  },
      { id: 'q6-f2', text: 'apenas 25% das escolas públicas',                correct: true  },
      { id: 'q6-f3', text: 'possuem intérprete de Libras em tempo integral.', correct: true  },
      { id: 'q6-d1', text: 'de acordo com um post,',                         correct: false },
      { id: 'q6-d2', text: 'em todas as escolas particulares',               correct: false },
    ],
    acceptedOrders: [['q6-f1', 'q6-f2', 'q6-f3']],
  },

  // ── Q7 — ChoiceSelect: qual citação continua este D1? ────────────────────────
  {
    id: 'fase-d1-citacao-7',
    kind: 'choice',
    prompt:
      'O D1 começa assim: "Em primeiro lugar, destaca-se a falta de acessibilidade nas instituições de ensino como um dos principais entraves à inclusão educacional de surdos, uma vez que muitas escolas públicas não possuem intérpretes de Libras disponíveis em tempo integral." Qual citação continua corretamente esse parágrafo?',
    options: [
      { id: 'q7-a', text: 'Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade.' },
      { id: 'q7-b', text: 'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.' },
      { id: 'q7-c', text: 'Segundo o Ministério do Trabalho, pessoas surdas têm menos acesso a vagas de emprego.' },
    ],
    correctOptionId: 'q7-a',
    explanation:
      'A citação do IBGE reforça diretamente a falta de acessibilidade nas escolas. A opção da PNAD é sobre trabalho de cuidado (outro tema); a do Ministério do Trabalho aborda mercado de trabalho, não acessibilidade escolar.',
  },

  // ── Q8 — BuildFromScratch: ordenar frases do D1, excluindo distrator ─────────
  // Note: specified as OrderPuzzle, but OrderPuzzle requires ALL items to be
  // placed — it has no mechanism for a distractor that must stay in the pool.
  // BuildFromScratch is the correct existing engine for this learning goal.
  {
    id: 'fase-d1-citacao-8',
    kind: 'build',
    prompt: 'Monte as duas primeiras frases do D1 na ordem certa. Atenção: uma das opções não pertence a este parágrafo.',
    fragments: [
      {
        id: 'q8-f1',
        text: 'Em primeiro lugar, destaca-se a falta de acessibilidade nas instituições de ensino como um dos principais entraves à inclusão educacional de surdos, uma vez que muitas escolas públicas não possuem intérpretes de Libras disponíveis em tempo integral.',
        correct: true,
      },
      {
        id: 'q8-f2',
        text: 'Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade.',
        correct: true,
      },
      {
        id: 'q8-d1',
        text: 'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
        correct: false,
      },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2']],
  },

  // ── Q9 — BuildFromScratch: citação para o tema trabalho de cuidado ───────────
  {
    id: 'fase-d1-citacao-9',
    kind: 'build',
    prompt:
      'Após a primeira frase do D1: "Primeiramente, destaca-se que as mulheres são responsáveis por grande parte dos serviços de cuidado, e isso é um problema pois tais trabalhos são invisibilizados diante da sociedade." — Monte a citação que reforça esse argumento.',
    fragments: [
      { id: 'q9-f1', text: 'Segundo dados da PNAD,',                                                correct: true  },
      { id: 'q9-f2', text: 'as mulheres dedicam aproximadamente o dobro de horas semanais',         correct: true  },
      { id: 'q9-f3', text: 'aos afazeres domésticos em relação aos homens.',                        correct: true  },
      { id: 'q9-d1', text: 'segundo um post nas redes sociais,',                                   correct: false },
      { id: 'q9-d2', text: 'aos cuidados com animais de estimação',                                correct: false },
    ],
    acceptedOrders: [['q9-f1', 'q9-f2', 'q9-f3']],
  },

  // ── Q10 — ErrorSpot: citação com tema errado em relação ao parágrafo ─────────
  {
    id: 'fase-d1-citacao-10',
    kind: 'error-spot',
    prompt: 'Um estudante escreveu as frases do D1 abaixo. Uma delas tem um problema. Toque na frase com erro.',
    sentences: [
      {
        id: 'q10-s1',
        text: 'Em primeiro lugar, destaca-se que o trabalho de cuidado é normalizado como responsabilidade exclusiva da mulher, pois isso reforça uma construção social enraizada.',
      },
      {
        id: 'q10-s2',
        text: 'Segundo o Censo Escolar do MEC, apenas 25% das escolas públicas possuem intérprete de Libras em tempo integral.',
      },
      {
        id: 'q10-s3',
        text: 'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
      },
    ],
    errorSentenceIds: ['q10-s2'],
    explanation:
      'A citação precisa sustentar especificamente a problemática do próprio parágrafo. Este parágrafo é sobre trabalho de cuidado — a citação do MEC sobre intérpretes de Libras em escolas não tem relação com o tema e não apoia o argumento.',
  },
];
