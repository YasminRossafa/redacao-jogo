import type { ActivityData } from '../engine/types';

// Conclusão — a AÇÃO da proposta de intervenção: o verbo, sempre no infinitivo
// (investir, ampliar, criar…), somado ao que foi visto em fase-conclusao-agente.
// Construção cumulativa: cada exercício mostra conectivo + agente + ação juntos,
// nunca a ação isolada. ChoiceSelect e ErrorSpot de aquecimento, TagMatch
// (bijetivo e um-para-muitos) e uma rampa de BuildFromScratch.

export const faseConclusaoAcaoActivities: ActivityData[] = [
  // ── Q1 — ChoiceSelect: ação no infinitivo (saúde) ───────────────────────────
  {
    id: 'fase-conclusao-acao-1',
    kind: 'choice',
    prompt:
      "Qual ação completa corretamente: 'Portanto, o Ministério da Saúde deve ___, por meio da destinação de verba específica...'?",
    options: [
      { id: 'q1-b', text: 'investindo em infraestrutura hospitalar' },
      { id: 'q1-a', text: 'investir em infraestrutura hospitalar' },
      { id: 'q1-c', text: 'investiu em infraestrutura hospitalar' },
      { id: 'q1-d', text: 'aumentar os impostos sobre remédios' },
    ],
    correctOptionId: 'q1-a',
    explanation:
      'A ação da proposta é um verbo no infinitivo: "investir". "Investindo" está no gerúndio e "investiu" é verbo conjugado no passado. "Aumentar os impostos sobre remédios" está no infinitivo, mas não resolve a superlotação — foge do problema apresentado.',
  },

  // ── Q2 — ChoiceSelect: ação no infinitivo (violência urbana) ────────────────
  {
    id: 'fase-conclusao-acao-2',
    kind: 'choice',
    prompt:
      "Qual ação completa corretamente: 'Assim, as secretarias estaduais de segurança pública devem ___, por meio da criação de bases fixas...'?",
    options: [
      { id: 'q2-b', text: 'ampliando o policiamento comunitário' },
      { id: 'q2-c', text: 'ampliou o policiamento comunitário' },
      { id: 'q2-a', text: 'ampliar o policiamento comunitário' },
      { id: 'q2-d', text: 'reduzir os impostos' },
    ],
    correctOptionId: 'q2-a',
    explanation:
      'A ação é um verbo no infinitivo: "ampliar". "Ampliando" está no gerúndio e "ampliou" é verbo conjugado no passado. "Reduzir os impostos" está no infinitivo, mas foge do tema da violência urbana.',
  },

  // ── Q3 — ErrorSpot (single): gerúndio no lugar do infinitivo (solidão) ──────
  // The sentence is split into tappable blocks; the gerund verb is the error.
  {
    id: 'fase-conclusao-acao-3',
    kind: 'error-spot',
    prompt: 'Nesta proposta de intervenção sobre solidão, uma parte está mal formulada. Toque na parte com o problema.',
    sentences: [
      { id: 'q3-s1', text: 'Logo, as secretarias municipais de assistência social devem' },
      { id: 'q3-s2', text: 'criando' },
      { id: 'q3-s3', text: 'centros de convivência para idosos.' },
    ],
    errorSentenceIds: ['q3-s2'],
    explanation:
      "O verbo da ação deve estar no infinitivo ('criar'), não no gerúndio.",
  },

  // ── Q4 — ErrorSpot (multiple): duas ações erradas (trabalho de cuidado) ─────
  {
    id: 'fase-conclusao-acao-4',
    kind: 'error-spot',
    prompt:
      'Tema: trabalho de cuidado. Duas das opções de ação abaixo estão erradas — toque em uma ação que NÃO serve para a proposta deste tema.',
    contextText:
      'A ação da proposta deve ser um verbo no infinitivo e coerente com o tema da invisibilidade do trabalho de cuidado exercido pela mulher.',
    sentences: [
      { id: 'q4-a1', text: 'criar campanhas nacionais de conscientização' },
      { id: 'q4-a2', text: 'criando campanhas nacionais de conscientização' },
      { id: 'q4-a3', text: 'fiscalizar embarcações pesqueiras' },
    ],
    errorSentenceIds: ['q4-a2', 'q4-a3'],
    explanation:
      '"Criando campanhas nacionais de conscientização" está no gerúndio — a ação precisa do verbo no infinitivo. "Fiscalizar embarcações pesqueiras" está no infinitivo, mas não tem relação com o tema. A ação adequada é "criar campanhas nacionais de conscientização".',
  },

  // ── Q5 — TagMatch (bijective): agente → ação correspondente ─────────────────
  {
    id: 'fase-conclusao-acao-5',
    kind: 'tag-match',
    prompt: 'Associe cada agente à ação que forma a proposta de intervenção correta do seu tema.',
    sentences: [
      { id: 'q5-s1', text: 'investir em infraestrutura hospitalar' },
      { id: 'q5-s2', text: 'ampliar o policiamento comunitário' },
      { id: 'q5-s3', text: 'criar centros de convivência para idosos' },
      { id: 'q5-s4', text: 'criar campanhas nacionais de conscientização' },
    ],
    tags: [
      { id: 'saude',     label: 'Portanto, o Ministério da Saúde' },
      { id: 'violencia', label: 'Assim, as secretarias estaduais de segurança pública' },
      { id: 'solidao',   label: 'Logo, as secretarias municipais de assistência social' },
      { id: 'cuidado',   label: 'Sendo assim, o Ministério da Mulher, da Família e dos Direitos Humanos' },
    ],
    mapping: {
      'q5-s1': 'saude',
      'q5-s2': 'violencia',
      'q5-s3': 'solidao',
      'q5-s4': 'cuidado',
    },
  },

  // ── Q6 — TagMatch (many-to-few): verbo no infinitivo vs. conjugado/gerúndio ─
  {
    id: 'fase-conclusao-acao-6',
    kind: 'tag-match',
    prompt:
      'Classifique cada ação: o verbo está no infinitivo (correto) ou está conjugado / no gerúndio (errado)?',
    sentences: [
      { id: 'q6-s1', text: 'investir em infraestrutura hospitalar' },
      { id: 'q6-s2', text: 'investindo em infraestrutura hospitalar' },
      { id: 'q6-s3', text: 'ampliar o policiamento comunitário' },
      { id: 'q6-s4', text: 'ampliou o policiamento comunitário' },
      { id: 'q6-s5', text: 'criar centros de convivência para idosos' },
      { id: 'q6-s6', text: 'criando centros de convivência para idosos' },
      { id: 'q6-s7', text: 'criar campanhas nacionais de conscientização' },
      { id: 'q6-s8', text: 'criará campanhas nacionais de conscientização' },
    ],
    tags: [
      { id: 'correto', label: 'Verbo no infinitivo — correto' },
      { id: 'errado',  label: 'Verbo conjugado ou no gerúndio — errado' },
    ],
    mapping: {
      'q6-s1': 'correto',
      'q6-s2': 'errado',
      'q6-s3': 'correto',
      'q6-s4': 'errado',
      'q6-s5': 'correto',
      'q6-s6': 'errado',
      'q6-s7': 'correto',
      'q6-s8': 'errado',
    },
  },

  // ── Q7 — BuildFromScratch: conectivo + agente + ação (saúde, cumulativo) ────
  {
    id: 'fase-conclusao-acao-7',
    kind: 'build',
    prompt: 'Tema "saúde": monte a proposta (conectivo + agente + ação) na ordem correta.',
    fragments: [
      { id: 'q7-f1', text: 'Portanto',                            correct: true  },
      { id: 'q7-f2', text: 'o Ministério da Saúde deve',          correct: true  },
      { id: 'q7-f3', text: 'investir em infraestrutura hospitalar', correct: true },
      { id: 'q7-d1', text: 'reduzir a carga horária dos médicos', correct: false },
      { id: 'q7-d2', text: 'aumentar impostos',                   correct: false },
    ],
    acceptedOrders: [['q7-f1', 'q7-f2', 'q7-f3']],
  },

  // ── Q8 — BuildFromScratch: conectivo + agente + ação (violência, cumulativo) ─
  {
    id: 'fase-conclusao-acao-8',
    kind: 'build',
    prompt: 'Tema "violência urbana": monte a proposta (conectivo + agente + ação) na ordem correta.',
    fragments: [
      { id: 'q8-f1', text: 'Assim',                                          correct: true  },
      { id: 'q8-f2', text: 'as secretarias estaduais de segurança pública devem', correct: true },
      { id: 'q8-f3', text: 'ampliar o policiamento comunitário',             correct: true  },
      { id: 'q8-d1', text: 'reduzir o efetivo policial',                     correct: false },
      { id: 'q8-d2', text: 'construir novas escolas',                        correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3']],
  },
];
