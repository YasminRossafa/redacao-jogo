import type { ActivityData } from '../engine/types';

export const faseD1ArgumentoActivities: ActivityData[] = [
  // ── Q1 — TagMatch: conectivos de argumento vs. outros (many-to-few, 8×2) ─────
  {
    id: 'fase-d1-argumento-1',
    kind: 'tag-match',
    prompt: 'Classifique cada conectivo: qual inicia o argumento (3ª frase do D1)?',
    sentences: [
      { id: 'q1-s1', text: 'Desse modo,' },
      { id: 'q1-s2', text: 'Assim,' },
      { id: 'q1-s3', text: 'Logo,' },
      { id: 'q1-s4', text: 'Dessa forma,' },
      { id: 'q1-s5', text: 'Segundo,' },
      { id: 'q1-s6', text: 'Ademais,' },
      { id: 'q1-s7', text: 'Em primeiro lugar,' },
      { id: 'q1-s8', text: 'Por exemplo,' },
    ],
    tags: [
      { id: 'inicia',     label: 'Inicia argumento' },
      { id: 'nao-inicia', label: 'Não inicia argumento' },
    ],
    mapping: {
      'q1-s1': 'inicia',
      'q1-s2': 'inicia',
      'q1-s3': 'inicia',
      'q1-s4': 'inicia',
      'q1-s5': 'nao-inicia',
      'q1-s6': 'nao-inicia',
      'q1-s7': 'nao-inicia',
      'q1-s8': 'nao-inicia',
    },
  },

  // ── Q2 — ErrorSpot: argumento foge do assunto ─────────────────────────────────
  {
    id: 'fase-d1-argumento-2',
    kind: 'error-spot',
    prompt: 'Uma das frases abaixo tem um problema. Toque na que está errada.',
    sentences: [
      {
        id: 'q2-s1',
        text: 'Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade.',
      },
      {
        id: 'q2-s2',
        text: 'Desse modo, a educação básica enfrenta desafios de evasão em todas as disciplinas.',
      },
      {
        id: 'q2-s3',
        text: 'Desse modo, a ausência de recursos inclusivos contribui para o sentimento de exclusão, levando ao abandono escolar e à limitação de oportunidades no futuro.',
      },
    ],
    errorSentenceIds: ['q2-s2'],
    explanation:
      'O argumento precisa aprofundar especificamente o impacto do dado citado — acessibilidade e inclusão de surdos. "Desafios de evasão em todas as disciplinas" migra para um problema diferente, sem relação com o que a citação mostrou.',
  },

  // ── Q3 — ErrorSpot: argumento repete a citação ───────────────────────────────
  {
    id: 'fase-d1-argumento-3',
    kind: 'error-spot',
    prompt: 'Uma das frases abaixo tem um problema. Toque na que está errada.',
    sentences: [
      {
        id: 'q3-s1',
        text: 'Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade.',
      },
      {
        id: 'q3-s2',
        text: 'Desse modo, poucas escolas têm estrutura de acessibilidade.',
      },
      {
        id: 'q3-s3',
        text: 'Desse modo, a ausência de recursos inclusivos contribui para o sentimento de exclusão, levando ao abandono escolar e à limitação de oportunidades no futuro.',
      },
    ],
    errorSentenceIds: ['q3-s2'],
    explanation:
      'O argumento precisa ir além do dado — mostrar uma consequência ou explicar uma causa mais profunda. "Poucas escolas têm estrutura de acessibilidade" apenas reafirma o que a citação já diz, sem acrescentar nada novo.',
  },

  // ── Q4 — ChoiceSelect: qual argumento realmente aprofunda o dado? ─────────────
  {
    id: 'fase-d1-argumento-4',
    kind: 'choice',
    prompt:
      'Citação: "Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade." — Qual argumento realmente aprofunda o impacto desse dado?',
    options: [
      {
        id: 'q4-a',
        text: 'Desse modo, a ausência de recursos inclusivos contribui para o sentimento de exclusão, levando ao abandono escolar e à limitação de oportunidades no futuro.',
      },
      {
        id: 'q4-b',
        text: 'Desse modo, poucas escolas têm estrutura de acessibilidade.',
      },
      {
        id: 'q4-c',
        text: 'Desse modo, a educação básica enfrenta desafios de evasão em todas as disciplinas.',
      },
      {
        id: 'q4-d',
        text: 'Logo, o governo deveria investir mais em educação.',
      },
    ],
    correctOptionId: 'q4-a',
    explanation:
      'O argumento correto mostra a consequência real: a ausência de recursos gera exclusão, abandono escolar e limitação de futuro. As demais: B repete o dado com outras palavras; C migra para evasão em geral (foge do assunto); D é proposta de intervenção — papel da conclusão, não do argumento.',
  },

  // ── Q5 — TagMatch: aprofunda vs. não aprofunda (many-to-few, 6×2) ────────────
  // Covers both valid argumento patterns: mostrar consequência (s1) e explicar
  // causa mais profunda (s2), reinforcing that either approach is acceptable.
  {
    id: 'fase-d1-argumento-5',
    kind: 'tag-match',
    prompt: 'Classifique cada frase: ela aprofunda o argumento do D1 ou não?',
    sentences: [
      {
        id: 'q5-s1',
        text: 'A ausência de recursos inclusivos contribui para o sentimento de exclusão, levando ao abandono escolar e à limitação de oportunidades no futuro.',
      },
      {
        id: 'q5-s2',
        text: 'Isto se deve ao fato de elas não terem seu esforço reconhecido devido ao seu círculo social.',
      },
      { id: 'q5-s3', text: 'Poucas escolas têm estrutura de acessibilidade.' },
      {
        id: 'q5-s4',
        text: 'A educação básica enfrenta desafios de evasão em todas as disciplinas.',
      },
      { id: 'q5-s5', text: 'O governo deveria investir mais em educação.' },
      { id: 'q5-s6', text: 'As mulheres deveriam trabalhar menos em casa.' },
    ],
    tags: [
      { id: 'aprofunda',     label: 'Aprofunda o argumento' },
      { id: 'nao-aprofunda', label: 'Não aprofunda' },
    ],
    mapping: {
      'q5-s1': 'aprofunda',
      'q5-s2': 'aprofunda',
      'q5-s3': 'nao-aprofunda',
      'q5-s4': 'nao-aprofunda',
      'q5-s5': 'nao-aprofunda',
      'q5-s6': 'nao-aprofunda',
    },
  },

  // ── Q6 — BuildFromScratch: montar o argumento ─────────────────────────────────
  {
    id: 'fase-d1-argumento-6',
    kind: 'build',
    prompt: 'Monte o argumento do D1 corretamente.',
    fragments: [
      { id: 'q6-f1', text: 'Desse modo,',                                                                correct: true  },
      { id: 'q6-f2', text: 'a ausência de recursos inclusivos contribui para o sentimento de exclusão,', correct: true  },
      { id: 'q6-f3', text: 'levando ao abandono escolar e à limitação de oportunidades no futuro.',     correct: true  },
      { id: 'q6-d1', text: 'poucas escolas têm estrutura de acessibilidade,',                           correct: false },
      { id: 'q6-d2', text: 'o governo deveria agir imediatamente',                                      correct: false },
    ],
    acceptedOrders: [['q6-f1', 'q6-f2', 'q6-f3']],
  },

  // ── Q7 — BuildFromScratch: D1 completo, tema surdos (seleção + ordem) ─────────
  // Pool has 5 fragments: 3 correct D1 sentences + 2 distractors from cuidado theme.
  {
    id: 'fase-d1-argumento-7',
    kind: 'build',
    prompt: 'Monte o parágrafo D1 completo (tema: inclusão de surdos). Atenção: há frases de outro tema no pool.',
    fragments: [
      {
        id: 'q7-f1',
        text: 'Em primeiro lugar, destaca-se a falta de acessibilidade nas instituições de ensino como um dos principais entraves à inclusão educacional de surdos, uma vez que muitas escolas públicas não possuem intérpretes de Libras disponíveis em tempo integral.',
        correct: true,
      },
      {
        id: 'q7-f2',
        text: 'Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade.',
        correct: true,
      },
      {
        id: 'q7-f3',
        text: 'Desse modo, a ausência de recursos inclusivos contribui para o sentimento de exclusão, levando ao abandono escolar e à limitação de oportunidades no futuro.',
        correct: true,
      },
      {
        id: 'q7-d1',
        text: 'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
        correct: false,
      },
      {
        id: 'q7-d2',
        text: 'Primeiramente, destaca-se que as mulheres são responsáveis por grande parte dos serviços de cuidado, e isso é um problema pois tais trabalhos são invisibilizados diante da sociedade.',
        correct: false,
      },
    ],
    acceptedOrders: [['q7-f1', 'q7-f2', 'q7-f3']],
  },

  // ── Q8 — OrderPuzzle: sequenciar as 3 frases do D1, tema "Quarto de Despejo" ──
  // Rethemed away from the surdos paragraph (which Q7 already uses) to the
  // "Quarto de Despejo" trabalho-de-cuidado D1, so back-to-back questions no
  // longer test the same paragraph twice. Trains pure sequencing.
  {
    id: 'fase-d1-argumento-8',
    kind: 'order',
    prompt: 'Organize as três frases do D1 (tema: trabalho de cuidado — "Quarto de Despejo") na sequência correta.',
    items: [
      {
        id: 'q8-s1',
        label:
          'Em primeiro lugar, destaca-se que o trabalho de cuidado é normalizado como responsabilidade exclusiva da mulher, pois isso reforça uma construção social enraizada.',
      },
      {
        id: 'q8-s2',
        label:
          'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
      },
      {
        id: 'q8-s3',
        label:
          'Desse modo, essa naturalização contribui para a manutenção da desigualdade de oportunidades entre homens e mulheres no mercado de trabalho.',
      },
    ],
  },

  // ── Q9 — BuildFromScratch: D1 completo, tema trabalho de cuidado ──────────────
  // Uses the cause-explaining argumento pattern (s3 = Isto se deve ao fato de…)
  // to reinforce that both consequence-showing (Q7) and cause-explaining are valid.
  // Pool has 5 fragments: 3 correct D1 sentences + 2 distractors from surdos theme.
  {
    id: 'fase-d1-argumento-9',
    kind: 'build',
    prompt: 'Monte o parágrafo D1 completo (tema: trabalho de cuidado). Atenção: há frases de outro tema no pool.',
    fragments: [
      {
        id: 'q9-f1',
        text: 'Primeiramente, destaca-se que as mulheres são responsáveis por grande parte dos serviços de cuidado, e isso é um problema pois tais trabalhos são invisibilizados diante da sociedade.',
        correct: true,
      },
      {
        id: 'q9-f2',
        text: 'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
        correct: true,
      },
      {
        id: 'q9-f3',
        text: 'Isto se deve ao fato de elas não terem seu esforço reconhecido devido ao seu círculo social.',
        correct: true,
      },
      {
        id: 'q9-d1',
        text: 'Segundo dados do IBGE, apenas 1% das escolas brasileiras têm estrutura completa de acessibilidade.',
        correct: false,
      },
      {
        id: 'q9-d2',
        text: 'Desse modo, a ausência de recursos inclusivos contribui para o sentimento de exclusão, levando ao abandono escolar e à limitação de oportunidades no futuro.',
        correct: false,
      },
    ],
    acceptedOrders: [['q9-f1', 'q9-f2', 'q9-f3']],
  },

  // ── Q10 — ErrorSpot: argumento reafirma o dado (Quarto de Despejo) ────────────
  // Error pattern: "repete/reafirma o dado" — different theme and wording from Q3
  // so students must apply the principle, not pattern-match the earlier sentence.
  {
    id: 'fase-d1-argumento-10',
    kind: 'error-spot',
    prompt: 'Um estudante escreveu as três frases do D1 abaixo. Uma delas tem um problema. Toque na frase com erro.',
    sentences: [
      {
        id: 'q10-s1',
        text: 'Em primeiro lugar, destaca-se que o trabalho de cuidado é normalizado como responsabilidade exclusiva da mulher, pois isso reforça uma construção social enraizada.',
      },
      {
        id: 'q10-s2',
        text: 'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
      },
      {
        id: 'q10-s3',
        text: 'Desse modo, as mulheres dedicam menos tempo ao lazer do que os homens.',
      },
    ],
    errorSentenceIds: ['q10-s3'],
    explanation:
      'O argumento reafirma o dado da citação com outras palavras — inferir que as mulheres têm menos tempo para o lazer é consequência óbvia de trabalhar mais horas, mas não aprofunda o impacto nem explica uma causa mais profunda. O argumento precisa ir além do que a citação já disse.',
  },
];
