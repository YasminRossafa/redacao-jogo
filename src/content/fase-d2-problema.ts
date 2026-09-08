import type { ActivityData } from '../engine/types';

// Desenvolvimento 2 — conectivo + 2ª problemática + motivo. Mirrors the
// progression and difficulty curve of fase-d1-problema: warm-up ChoiceSelect on
// the connective and the reworded problemática, ErrorSpot on faulty motivos,
// TagMatch classification (bijective then many-to-few), and a rising BuildFromScratch
// ramp that ends on the full conectivo + problemática + motivo sentence.

export const faseD2ProblemaActivities: ActivityData[] = [
  // ── Q1 — ChoiceSelect: conectivo que abre o D2 (saúde) ──────────────────────
  {
    id: 'fase-d2-problema-1',
    kind: 'choice',
    prompt:
      "Qual conectivo é adequado para iniciar o segundo parágrafo de desenvolvimento (D2), dando sequência a esta introdução: 'Nesse sentido, os desafios para a garantia do acesso à saúde pública na sociedade brasileira revelam-se um obstáculo à qualidade de vida da população.'?",
    options: [
      { id: 'q1-a', text: 'Primeiramente' },
      { id: 'q1-b', text: 'Em segundo lugar' },
      { id: 'q1-c', text: 'Por fim' },
      { id: 'q1-d', text: 'No entanto' },
    ],
    correctOptionId: 'q1-b',
    explanation:
      'O D2 é o segundo parágrafo de desenvolvimento, então pede um conectivo de segundo argumento, como "Em segundo lugar". "Primeiramente" abre o D1; "Por fim" indica conclusão e "No entanto" indica contraste — nenhum dos dois introduz um novo argumento em sequência.',
  },

  // ── Q2 — ChoiceSelect: conectivo sem repetir o do D1 (violência urbana) ─────
  {
    id: 'fase-d2-problema-2',
    kind: 'choice',
    prompt:
      "O D1 desse tema já usou o conectivo 'Em primeiro lugar'. Qual conectivo é adequado para abrir o D2, sem repetir o do D1?",
    options: [
      { id: 'q2-a', text: 'Em primeiro lugar' },
      { id: 'q2-b', text: 'Portanto' },
      { id: 'q2-c', text: 'Ademais' },
      { id: 'q2-d', text: 'Todavia' },
    ],
    correctOptionId: 'q2-c',
    explanation:
      'Como o D1 já usou "Em primeiro lugar", o D2 precisa de outro conectivo de adição/sequência: "Ademais". "Portanto" (conclusão) e "Todavia" (contraste) não abrem um segundo argumento, e repetir "Em primeiro lugar" empobrece a coesão.',
  },

  // ── Q3 — ChoiceSelect: reescrever a 2ª problemática (solidão) ───────────────
  {
    id: 'fase-d2-problema-3',
    kind: 'choice',
    prompt:
      "A introdução do tema 'solidão' traz a segunda problemática assim: '...além do abandono familiar de idosos.' Qual opção reescreve essa problemática com outras palavras (sem copiar o texto da introdução), de forma adequada para abrir o D2?",
    options: [
      { id: 'q3-a', text: 'destaca-se o abandono familiar de idosos como um agravante do isolamento social no Brasil' },
      { id: 'q3-b', text: 'além do abandono familiar de idosos' },
      { id: 'q3-c', text: 'os idosos sofrem bullying na escola' },
      { id: 'q3-d', text: 'nota-se que os jovens preferem morar sozinhos por escolha própria' },
    ],
    correctOptionId: 'q3-a',
    explanation:
      'A problemática do D2 deve ser reescrita com suas próprias palavras, mantendo o tema. A opção "além do abandono familiar de idosos" copia a introdução literalmente; "os idosos sofrem bullying na escola" foge do tema; e "os jovens preferem morar sozinhos por escolha própria" distorce o problema — escolha própria não é abandono.',
  },

  // ── Q4 — ErrorSpot (single): motivo circular (luto) ─────────────────────────
  {
    id: 'fase-d2-problema-4',
    kind: 'error-spot',
    prompt: 'Uma parte do D2 abaixo foi mal escrita. Toque na parte que contém o erro.',
    sentences: [
      { id: 'q4-s1', text: 'Em segundo lugar,' },
      { id: 'q4-s2', text: 'destaca-se o silenciamento do luto no ambiente de trabalho como um obstáculo ao processo de elaboração emocional das perdas,' },
      { id: 'q4-s3', text: 'pois o luto não é acolhido adequadamente nos ambientes profissionais.' },
    ],
    errorSentenceIds: ['q4-s3'],
    explanation:
      'Esse motivo apenas repete o problema (silenciamento do luto) com outras palavras — não apresenta uma causa.',
  },

  // ── Q5 — ErrorSpot (multiple): dois motivos incorretos (saúde) ──────────────
  {
    id: 'fase-d2-problema-5',
    kind: 'error-spot',
    prompt:
      'Abaixo estão três frases de motivo para a problemática em destaque. Duas delas estão erradas — toque em uma frase de motivo que NÃO explica corretamente a problemática.',
    contextText:
      'Problemática: evidencia-se a superlotação das unidades de saúde como um entrave à qualidade do atendimento à população brasileira.',
    sentences: [
      { id: 'q5-m1', text: 'visto que a demanda por serviços básicos ultrapassa a capacidade de atendimento das unidades disponíveis' },
      { id: 'q5-m2', text: 'pois as unidades de saúde estão superlotadas' },
      { id: 'q5-m3', text: 'porque os hospitais particulares cobram valores elevados pelos procedimentos' },
    ],
    errorSentenceIds: ['q5-m2', 'q5-m3'],
    explanation:
      'M2 apenas repete o problema com outras palavras. M3 muda de assunto — fala de hospitais particulares, não da superlotação do sistema público.',
  },

  // ── Q6 — TagMatch (bijective): 3 partes → 3 categorias (trabalho de cuidado) ─
  {
    id: 'fase-d2-problema-6',
    kind: 'tag-match',
    prompt:
      'Tema "Que Horas Ela Volta?": classifique cada parte do D2 na sua categoria.',
    sentences: [
      { id: 'q6-s1', text: 'Em segunda análise' },
      { id: 'q6-s2', text: 'nota-se que o trabalho de cuidado é naturalizado como responsabilidade exclusiva da mulher' },
      { id: 'q6-s3', text: 'pois isso reforça uma construção social enraizada historicamente' },
    ],
    tags: [
      { id: 'conectivo',    label: 'Conectivo' },
      { id: 'problematica', label: 'Problemática' },
      { id: 'motivo',       label: 'Motivo' },
    ],
    mapping: {
      'q6-s1': 'conectivo',
      'q6-s2': 'problematica',
      'q6-s3': 'motivo',
    },
  },

  // ── Q7 — TagMatch (many-to-few): 8 frases → 3 categorias (temas variados) ───
  {
    id: 'fase-d2-problema-7',
    kind: 'tag-match',
    prompt:
      'Classifique cada frase (de temas variados) como conectivo, problemática ou motivo. Cada categoria recebe mais de uma frase.',
    sentences: [
      { id: 'q7-s1', text: 'Ademais' },
      { id: 'q7-s2', text: 'Em segunda análise' },
      { id: 'q7-s3', text: 'Em segundo lugar' },
      { id: 'q7-s4', text: 'evidencia-se a impunidade de crimes violentos como um fator que perpetua a insegurança' },
      { id: 'q7-s5', text: 'destaca-se o abandono familiar de idosos como um agravante do isolamento social' },
      { id: 'q7-s6', text: 'visto que a demanda por serviços básicos ultrapassa a capacidade de atendimento' },
      { id: 'q7-s7', text: 'uma vez que a ausência de punição efetiva reforça a sensação de que a violência não terá consequências' },
      { id: 'q7-s8', text: 'pois a pressão por produtividade não permite tempo adequado para o enfrentamento da dor' },
    ],
    tags: [
      { id: 'conectivo',    label: 'Conectivo' },
      { id: 'problematica', label: 'Problemática' },
      { id: 'motivo',       label: 'Motivo' },
    ],
    mapping: {
      'q7-s1': 'conectivo',
      'q7-s2': 'conectivo',
      'q7-s3': 'conectivo',
      'q7-s4': 'problematica',
      'q7-s5': 'problematica',
      'q7-s6': 'motivo',
      'q7-s7': 'motivo',
      'q7-s8': 'motivo',
    },
  },

  // ── Q8 — BuildFromScratch: motivo (violência urbana) ────────────────────────
  {
    id: 'fase-d2-problema-8',
    kind: 'build',
    prompt: 'Tema "violência urbana": monte o motivo do D2 na ordem correta.',
    fragments: [
      { id: 'q8-f1', text: 'uma vez que',                                        correct: true  },
      { id: 'q8-f2', text: 'a ausência de punição efetiva',                      correct: true  },
      { id: 'q8-f3', text: 'reforça a sensação de que',                          correct: true  },
      { id: 'q8-f4', text: 'a violência não terá consequências',                 correct: true  },
      { id: 'q8-d1', text: 'a impunidade é um mito',                             correct: false },
      { id: 'q8-d2', text: 'resolve o problema rapidamente',                     correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3', 'q8-f4']],
  },

  // ── Q9 — BuildFromScratch: problemática + motivo (solidão) ──────────────────
  {
    id: 'fase-d2-problema-9',
    kind: 'build',
    prompt: 'Tema "solidão": monte a problemática e o motivo do D2 na ordem correta.',
    fragments: [
      { id: 'q9-f1', text: 'evidencia-se o abandono familiar de idosos',                          correct: true  },
      { id: 'q9-f2', text: 'como um agravante do isolamento social no Brasil',                    correct: true  },
      { id: 'q9-f3', text: 'pois a ausência de vínculos afetivos próximos',                       correct: true  },
      { id: 'q9-f4', text: 'compromete o bem-estar emocional dessa parcela da população',         correct: true  },
      { id: 'q9-d1', text: 'o que causa alegria constante',                                       correct: false },
      { id: 'q9-d2', text: 'sem nenhuma consequência emocional',                                  correct: false },
    ],
    acceptedOrders: [['q9-f1', 'q9-f2', 'q9-f3', 'q9-f4']],
  },

  // ── Q10 — BuildFromScratch (hardest): conectivo + problemática + motivo (luto) ─
  {
    id: 'fase-d2-problema-10',
    kind: 'build',
    prompt:
      'Agora monte a primeira frase completa do D2 sobre "luto": conectivo + problemática + motivo.',
    fragments: [
      { id: 'q10-f1', text: 'Em segundo lugar',                                                   correct: true  },
      { id: 'q10-f2', text: 'destaca-se o silenciamento do luto no ambiente de trabalho',         correct: true  },
      { id: 'q10-f3', text: 'como um obstáculo ao processo de elaboração emocional das perdas',   correct: true  },
      { id: 'q10-f4', text: 'uma vez que a pressão por produtividade',                            correct: true  },
      { id: 'q10-f5', text: 'não permite tempo adequado para o enfrentamento da dor',             correct: true  },
      { id: 'q10-d1', text: 'o que resolve rapidamente o problema',                               correct: false },
      { id: 'q10-d2', text: 'sem nenhuma relação com o ambiente profissional',                    correct: false },
    ],
    acceptedOrders: [['q10-f1', 'q10-f2', 'q10-f3', 'q10-f4', 'q10-f5']],
  },
];
