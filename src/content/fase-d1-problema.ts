import type { ActivityData } from '../engine/types';

export const faseD1ProblemaActivities: ActivityData[] = [
  // ── Q1 — TagMatch: conectivos que abrem o D1 ────────────────────────────────
  {
    id: 'fase-d1-problema-1',
    kind: 'tag-match',
    prompt: 'Classifique cada conectivo: qual pode abrir o primeiro parágrafo de desenvolvimento (D1)?',
    sentences: [
      { id: 'q1-s1', text: 'Primeiramente,' },
      { id: 'q1-s2', text: 'Em primeiro lugar,' },
      { id: 'q1-s3', text: 'Em primeira análise,' },
      { id: 'q1-s4', text: 'Antes de mais nada,' },
      { id: 'q1-s5', text: 'Ademais,' },
      { id: 'q1-s6', text: 'Em segundo lugar,' },
      { id: 'q1-s7', text: 'Portanto,' },
      { id: 'q1-s8', text: 'Por exemplo,' },
    ],
    tags: [
      { id: 'abre',     label: 'Abre o D1' },
      { id: 'nao-abre', label: 'Não abre o D1' },
    ],
    mapping: {
      'q1-s1': 'abre',
      'q1-s2': 'abre',
      'q1-s3': 'abre',
      'q1-s4': 'abre',
      'q1-s5': 'nao-abre',
      'q1-s6': 'nao-abre',
      'q1-s7': 'nao-abre',
      'q1-s8': 'nao-abre',
    },
  },

  // ── Q2 — ChoiceSelect: qual problemática abre o D1? (Anne Sullivan) ─────────
  {
    id: 'fase-d1-problema-2',
    kind: 'choice',
    prompt:
      'Introdução: "Em \'O Milagre de Anne Sullivan\', Helen Keller, uma menina surda, enfrenta dificuldades no seu processo de alfabetização. Assim como a personagem, muitos alunos sofrem com os desafios para a formação educacional de surdos no Brasil. A falta de acessibilidade nas escolas e a exclusão de pessoas surdas no mercado de trabalho são problemas desse tema." — Qual problemática deve abrir o D1?',
    options: [
      { id: 'q2-a', text: 'a falta de acessibilidade nas escolas' },
      { id: 'q2-b', text: 'a exclusão de pessoas surdas no mercado de trabalho' },
      { id: 'q2-c', text: 'a desmotivação do mercado' },
      { id: 'q2-d', text: 'a ausência de regulamentação eficaz contra a desinformação' },
    ],
    correctOptionId: 'q2-a',
    explanation:
      'O D1 retoma sempre a primeira problemática citada na introdução. Aqui, a primeira é "a falta de acessibilidade nas escolas". A exclusão no mercado de trabalho é a segunda problemática e pertence ao D2.',
  },

  // ── Q3 — ChoiceSelect: qual problemática abre o D1? (Que Horas Ela Volta?) ──
  {
    id: 'fase-d1-problema-3',
    kind: 'choice',
    prompt:
      'Introdução: "No filme \'Que Horas Ela Volta?\', a protagonista Val mora e trabalha na casa de uma família rica, abdicando da própria vida e se afastando da filha em nome do trabalho de cuidado que exerce. Assim como no longa-metragem, no Brasil, ainda existem desafios para enfrentar a invisibilidade do trabalho de cuidado exercido pela mulher. Dois problemas desse tema são que as mulheres são responsáveis por grande parte do serviço, além daquele que não é remunerado." — Qual problemática deve abrir o D1?',
    options: [
      { id: 'q3-a', text: 'as mulheres são responsáveis por grande parte do serviço' },
      { id: 'q3-b', text: 'aquele [serviço] não é remunerado' },
      { id: 'q3-c', text: 'o pensamento estrutural de que esse tipo de serviço deve ser realizado pela mulher' },
      { id: 'q3-d', text: 'a falta de acessibilidade nas escolas' },
    ],
    correctOptionId: 'q3-a',
    explanation:
      'O D1 retoma sempre a primeira problemática mencionada na introdução. A segunda ("aquele que não é remunerado") pertence ao D2.',
  },

  // ── Q4 — ChoiceSelect: qual motivo explica a problemática? ──────────────────
  {
    id: 'fase-d1-problema-4',
    kind: 'choice',
    prompt:
      'O D1 começa assim: "Primeiramente, destaca-se a falta de acessibilidade nas instituições de ensino como um dos principais entraves à inclusão educacional de surdos". Qual alternativa completa corretamente o motivo?',
    options: [
      { id: 'q4-a', text: 'uma vez que muitas escolas públicas não possuem intérpretes de Libras disponíveis em tempo integral' },
      { id: 'q4-b', text: 'pois há falta de acessibilidade nas instituições de ensino' },
      { id: 'q4-c', text: 'e também há falta de merenda escolar de qualidade' },
      { id: 'q4-d', text: 'mas isso está mudando aos poucos' },
    ],
    correctOptionId: 'q4-a',
    explanation:
      'O motivo deve explicar POR QUE a problemática é um problema, apresentando uma causa real. A opção "pois há falta de acessibilidade..." apenas repete o problema com outras palavras — isso é raciocínio circular. As demais opções trazem informação irrelevante ou contraste, não explicação causal.',
  },

  // ── Q5 — ErrorSpot: raciocínio circular no motivo ───────────────────────────
  {
    id: 'fase-d1-problema-5',
    kind: 'error-spot',
    prompt: 'Uma parte do D1 abaixo foi mal escrita. Toque na parte que contém o erro.',
    sentences: [
      { id: 'q5-s1', text: 'Em primeiro lugar,' },
      { id: 'q5-s2', text: 'destaca-se a invisibilidade do trabalho de cuidado exercido pela mulher,' },
      { id: 'q5-s3', text: 'pois o trabalho de cuidado exercido pela mulher é invisibilizado.' },
    ],
    errorSentenceIds: ['q5-s3'],
    explanation:
      'O motivo precisa explicar POR QUE o problema acontece, não repetir o problema com outras palavras. "Pois o trabalho de cuidado exercido pela mulher é invisibilizado" apenas reafirma a problemática — isso é raciocínio circular.',
  },

  // ── Q6 — TagMatch: conectivos de motivo vs. outros conectivos ───────────────
  {
    id: 'fase-d1-problema-6',
    kind: 'tag-match',
    prompt: 'Classifique cada conectivo: quais introduzem o motivo (explicação de causa)?',
    sentences: [
      { id: 'q6-s1', text: 'porque' },
      { id: 'q6-s2', text: 'pois' },
      { id: 'q6-s3', text: 'uma vez que' },
      { id: 'q6-s4', text: 'tendo em vista que' },
      { id: 'q6-s5', text: 'além disso' },
      { id: 'q6-s6', text: 'portanto' },
      { id: 'q6-s7', text: 'no entanto' },
      { id: 'q6-s8', text: 'por exemplo' },
    ],
    tags: [
      { id: 'motivo',     label: 'É motivo' },
      { id: 'nao-motivo', label: 'Não é motivo' },
    ],
    mapping: {
      'q6-s1': 'motivo',
      'q6-s2': 'motivo',
      'q6-s3': 'motivo',
      'q6-s4': 'motivo',
      'q6-s5': 'nao-motivo',
      'q6-s6': 'nao-motivo',
      'q6-s7': 'nao-motivo',
      'q6-s8': 'nao-motivo',
    },
  },

  // ── Q7 — BuildFromScratch: conectivo + problemática (sem motivo) ─────────────
  {
    id: 'fase-d1-problema-7',
    kind: 'build',
    prompt: 'Monte o início do D1 com o conectivo e a problemática (sem o motivo ainda).',
    fragments: [
      { id: 'q7-f1', text: 'Em primeiro lugar,',                                                         correct: true  },
      { id: 'q7-f2', text: 'destaca-se a falta de acessibilidade nas instituições de ensino',            correct: true  },
      { id: 'q7-f3', text: 'como um dos principais entraves à inclusão educacional de surdos,',          correct: true  },
      { id: 'q7-d1', text: 'Ademais,',                                                                   correct: false },
      { id: 'q7-d2', text: 'no mercado de trabalho,',                                                   correct: false },
    ],
    acceptedOrders: [['q7-f1', 'q7-f2', 'q7-f3']],
  },

  // ── Q8 — BuildFromScratch: frase completa (conectivo + problemática + motivo) ─
  {
    id: 'fase-d1-problema-8',
    kind: 'build',
    prompt: 'Agora monte a primeira frase completa do D1: conectivo + problemática + motivo.',
    fragments: [
      { id: 'q8-f1', text: 'Em primeiro lugar,',                                                         correct: true  },
      { id: 'q8-f2', text: 'destaca-se a falta de acessibilidade nas instituições de ensino',            correct: true  },
      { id: 'q8-f3', text: 'como um dos principais entraves à inclusão educacional de surdos,',          correct: true  },
      { id: 'q8-f4', text: 'uma vez que muitas escolas públicas não possuem intérpretes de Libras disponíveis em tempo integral.', correct: true },
      { id: 'q8-d1', text: 'pois há falta de acessibilidade nas instituições de ensino',                correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3', 'q8-f4']],
  },

  // ── Q9 — BuildFromScratch: tema trabalho de cuidado (Que Horas Ela Volta?) ───
  {
    id: 'fase-d1-problema-9',
    kind: 'build',
    prompt:
      'Com base na introdução sobre "Que Horas Ela Volta?", monte a primeira frase do D1: conectivo + problemática + motivo.',
    fragments: [
      { id: 'q9-f1', text: 'Primeiramente,',                                                                    correct: true  },
      { id: 'q9-f2', text: 'destaca-se que as mulheres são responsáveis por grande parte dos serviços de cuidado,', correct: true },
      { id: 'q9-f3', text: 'e isso é um problema',                                                              correct: true  },
      { id: 'q9-f4', text: 'pois tais trabalhos são invisibilizados diante da sociedade.',                      correct: true  },
      { id: 'q9-d1', text: 'e isso não chega a ser um problema',                                               correct: false },
      { id: 'q9-d2', text: 'pois as mulheres preferem esse tipo de trabalho',                                  correct: false },
    ],
    acceptedOrders: [['q9-f1', 'q9-f2', 'q9-f3', 'q9-f4']],
  },

  // ── Q10 — ErrorSpot: segunda problemática usada no D1 (Quarto de Despejo) ───
  {
    id: 'fase-d1-problema-10',
    kind: 'error-spot',
    prompt:
      'Introdução de "Quarto de Despejo" — 1ª problemática: o pensamento estrutural de que o trabalho de cuidado deve ser realizado pela mulher; 2ª problemática: a maior parte dele não é remunerada. Leia o D1 abaixo e encontre o erro:',
    sentences: [
      { id: 'q10-s1', text: 'Em primeiro lugar,' },
      { id: 'q10-s2', text: 'destaca-se que a maior parte do trabalho de cuidado não é remunerada,' },
      { id: 'q10-s3', text: 'pois esse serviço não é reconhecido financeiramente pela sociedade.' },
    ],
    errorSentenceIds: ['q10-s2'],
    explanation:
      'A problemática do D1 é sempre a primeira citada na introdução. Aqui, a primeira problemática é "o pensamento estrutural de que esse tipo de serviço deve ser realizado pela mulher". A não-remuneração é a segunda problemática e pertence ao D2.',
  },
];
