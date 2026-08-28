// Real introdução content, validated against the source methodology document.
// Structure: 3 sentences only — repertório sociocultural, tema+Brasil, problemáticas.
// Rules: no desenvolvimento connectives (em primeiro lugar, além disso, etc.),
// no first-person language, no use of the word "tese".
// Any future paragraph must follow this same 3-part structure.

import type { ActivityData } from '../engine/types';

// ─── Source paragraphs ───────────────────────────────────────────────────────

const P1984 = {
  rep:  "Na obra 'Í984', de George Orwell, o governo controla informações e limita a liberdade da população por meio da manipulação da verdade.",
  tema: "Embora seja uma obra fictícia, a manipulação do usuário pela informação na internet é uma realidade na sociedade brasileira.",
  prob: "A falta de educação midiática, que dificulta a análise das informações recebidas, e a ausência de regulamentação eficaz contra a desinformação, são problemas decorrentes desse tema.",
};

const PVOZSILENCIO = {
  rep:  "No desenho japonês 'A voz do silêncio', uma menina surda entra em uma escola comum e começa a enfrentar preconceito unido de diversos atos de violência, tendo assim que mudar de escola.",
  tema: "Fora da ficção também existem desafios para a formação educacional de surdos no Brasil.",
  prob: "A ausência de inclusão social na formação de Libras e o preconceito pela individualidade de pessoas surdas são problemas decorrentes desse tema.",
};

const PPATINHOFEIO = {
  rep:  "No conto 'O Patinho Feio' havia a exclusão do personagem principal por ser diferente, demonstrando o preconceito que partia dos outros patos da história.",
  tema: "Em paralelo com a realidade, o preconceito e exclusão geram muitos desafios para a formação educacional de surdos no Brasil.",
  prob: "Esses desafios se mostram na falta de acessibilidade a esses alunos, como acontece na inclusão tardia do sistema de Libras e na falta de rigorosidade nas leis de integração social.",
};

const PANNESULLIVAN = {
  rep:  "Em 'O Milagre de Anne Sullivan', Helen Keller, uma menina surda, enfrenta dificuldades no seu processo de alfabetização.",
  tema: "Assim como a personagem, muitos alunos com deficiência auditiva sofrem com os desafios para sua formação educacional no Brasil.",
  prob: "A falta de acessibilidade nas escolas e a exclusão dessas pessoas no mercado de trabalho são problemas desse tema.",
};

const PEXTRAORDINARIO = {
  rep:  "No livro 'O extraordinário', um garoto com deficiência física sofre com exclusão no espaço educacional.",
  tema: "Em paralelo com a realidade, existem muitos desafios para a formação educacional de surdos no Brasil.",
  prob: "Assim, a falta de educação inclusiva e a desmotivação do mercado dificultam a permanência de pessoas surdas no meio acadêmico.",
};

const PQUEHORASELA = {
  rep:  "No filme 'Que Horas Ela Volta?', a protagonista Val mora e trabalha na casa de uma família rica, abdicando da própria vida e se afastando da filha em nome do trabalho de cuidado que exerce.",
  tema: "Assim como no longa-metragem, no Brasil, ainda existem desafios para enfrentar a invisibilidade do trabalho de cuidado exercido pela mulher.",
  prob: "Dois problemas desse tema são que as mulheres são responsáveis por grande parte do serviço, além daquele que não é remunerado.",
};

const PCORTICO = {
  rep:  "O livro 'Quarto de Despejo' retrata a história de uma mãe que trabalha como catadora de lixo para conseguir sustentar seus filhos.",
  tema: "Em paralelo com a realidade, ainda existem muitos desafios no enfrentamento da invisibilidade do trabalho de cuidado exercido pela mulher no Brasil.",
  prob: "Dois problemas desse tema são o pensamento estrutural de que esse tipo de serviço deve ser realizado pela mulher, além de que a maior parte dele não é remunerada.",
};

// ─── Shared tags ─────────────────────────────────────────────────────────────

const TAG_REP  = { id: 'tag-rep',   label: 'Repertório sociocultural' };
const TAG_TEMA = { id: 'tag-tema',  label: 'Tema + Brasil' };
const TAG_PROB = { id: 'tag-prob',  label: 'Problemáticas' };
const ALL_TAGS = [TAG_REP, TAG_TEMA, TAG_PROB];
const FULL_MAPPING = { 's-rep': 'tag-rep', 's-tema': 'tag-tema', 's-prob': 'tag-prob' };

function sentences(p: { rep: string; tema: string; prob: string }) {
  return [
    { id: 's-rep',  text: p.rep  },
    { id: 's-tema', text: p.tema },
    { id: 's-prob', text: p.prob },
  ];
}

function orderItems(p: { rep: string; tema: string; prob: string }) {
  return [
    { id: 'rep',  label: p.rep  },
    { id: 'tema', label: p.tema },
    { id: 'prob', label: p.prob },
  ];
}

// ─── GROUP 1: TagMatch — full match (3 activities) ───────────────────────────

const tagfull1: ActivityData = {
  id: 'fase1-tagfull-1',
  kind: 'tag-match',
  prompt: 'Toque em cada trecho e marque o que ele representa.',
  sentences: sentences(P1984),
  tags: ALL_TAGS,
  mapping: FULL_MAPPING,
};

const tagfull2: ActivityData = {
  id: 'fase1-tagfull-2',
  kind: 'tag-match',
  prompt: 'Toque em cada trecho e marque o que ele representa.',
  sentences: sentences(PPATINHOFEIO),
  tags: ALL_TAGS,
  mapping: FULL_MAPPING,
};

const tagfull3: ActivityData = {
  id: 'fase1-tagfull-3',
  kind: 'tag-match',
  prompt: 'Toque em cada trecho e marque o que ele representa.',
  sentences: sentences(PQUEHORASELA),
  tags: ALL_TAGS,
  mapping: FULL_MAPPING,
};

// ─── GROUP 2: TagMatch — single target (5 activities) ────────────────────────
// Only one tag and one required mapping; other sentences are displayed but
// not required to be tagged for validation to pass.

const tagsingle1: ActivityData = {
  id: 'fase1-tagsingle-1',
  kind: 'tag-match',
  prompt: 'Toque no trecho que traz as duas problemáticas.',
  sentences: sentences(PVOZSILENCIO),
  tags: [TAG_PROB],
  mapping: { 's-prob': 'tag-prob' },
};

const tagsingle2: ActivityData = {
  id: 'fase1-tagsingle-2',
  kind: 'tag-match',
  prompt: 'Toque no trecho que liga o repertório ao tema e ao Brasil.',
  sentences: sentences(PANNESULLIVAN),
  tags: [TAG_TEMA],
  mapping: { 's-tema': 'tag-tema' },
};

const tagsingle3: ActivityData = {
  id: 'fase1-tagsingle-3',
  kind: 'tag-match',
  prompt: 'Toque no trecho que traz as duas problemáticas.',
  sentences: sentences(PEXTRAORDINARIO),
  tags: [TAG_PROB],
  mapping: { 's-prob': 'tag-prob' },
};

const tagsingle4: ActivityData = {
  id: 'fase1-tagsingle-4',
  kind: 'tag-match',
  prompt: 'Toque no trecho que liga o repertório ao tema e ao Brasil.',
  sentences: sentences(PCORTICO),
  tags: [TAG_TEMA],
  mapping: { 's-tema': 'tag-tema' },
};

const tagsingle5: ActivityData = {
  id: 'fase1-tagsingle-5',
  kind: 'tag-match',
  prompt: 'Toque no trecho que traz as duas problemáticas.',
  sentences: sentences(PPATINHOFEIO),
  tags: [TAG_PROB],
  mapping: { 's-prob': 'tag-prob' },
};

// ─── GROUP 3: OrderActivity (5 activities) ───────────────────────────────────

const order1: ActivityData = {
  id: 'fase1-order-1',
  kind: 'order',
  prompt: 'Organize as 3 frases na ordem certa da introdução.',
  items: orderItems(P1984),
};

const order2: ActivityData = {
  id: 'fase1-order-2',
  kind: 'order',
  prompt: 'Organize as 3 frases na ordem certa da introdução.',
  items: orderItems(PVOZSILENCIO),
};

const order3: ActivityData = {
  id: 'fase1-order-3',
  kind: 'order',
  prompt: 'Organize as 3 frases na ordem certa da introdução.',
  items: orderItems(PANNESULLIVAN),
};

const order4: ActivityData = {
  id: 'fase1-order-4',
  kind: 'order',
  prompt: 'Organize as 3 frases na ordem certa da introdução.',
  items: orderItems(PEXTRAORDINARIO),
};

const order5: ActivityData = {
  id: 'fase1-order-5',
  kind: 'order',
  prompt: 'Organize as 3 frases na ordem certa da introdução.',
  items: orderItems(PCORTICO),
};

// ─── GROUP 4: ErrorSpotActivity (5 activities) ───────────────────────────────

// error-1: pannesullivan — flawed prob uses "Primeiramente" (desenvolvimento connective)
const error1: ActivityData = {
  id: 'fase1-error-1',
  kind: 'error-spot',
  prompt: 'Uma das frases tem um problema. Encontre qual é.',
  sentences: [
    { id: 's-rep',       text: PANNESULLIVAN.rep },
    { id: 's-tema',      text: PANNESULLIVAN.tema },
    { id: 's-prob-falha', text: 'Primeiramente, a falta de acessibilidade nas escolas e a exclusão de pessoas surdas no mercado de trabalho são problemas desse tema.' },
  ],
  errorSentenceId: 's-prob-falha',
  explanation: "Essa frase usa 'Primeiramente', um conectivo de desenvolvimento (D1). A introdução não usa esse tipo de conectivo — ele é exclusivo dos parágrafos de desenvolvimento.",
};

// error-2: mixed — repertório from p1984 + tema/prob from pvozsilencio; rep is wrong
const error2: ActivityData = {
  id: 'fase1-error-2',
  kind: 'error-spot',
  prompt: 'Uma das frases tem um problema. Encontre qual é.',
  sentences: [
    { id: 's-rep-wrong', text: P1984.rep },
    { id: 's-tema',      text: PVOZSILENCIO.tema },
    { id: 's-prob',      text: PVOZSILENCIO.prob },
  ],
  errorSentenceId: 's-rep-wrong',
  explanation: "O repertório fala sobre manipulação de informação, mas o resto do parágrafo é sobre educação de surdos. O repertório precisa se relacionar com o tema do parágrafo.",
};

// error-3: pcortico — flawed prob is too generic (no mention of care work or payment)
const error3: ActivityData = {
  id: 'fase1-error-3',
  kind: 'error-spot',
  prompt: 'Uma das frases tem um problema. Encontre qual é.',
  sentences: [
    { id: 's-rep',        text: PCORTICO.rep },
    { id: 's-tema',       text: PCORTICO.tema },
    { id: 's-prob-falha', text: 'A falta de oportunidades e a desigualdade social são problemas desse tema.' },
  ],
  errorSentenceId: 's-prob-falha',
  explanation: "Essa problemática é genérica demais — não menciona nada específico sobre trabalho de cuidado ou remuneração. Toda problemática precisa ser específica e ligada ao tema.",
};

// error-4: pquehorasela — flawed tema uses first person "eu acredito"
const error4: ActivityData = {
  id: 'fase1-error-4',
  kind: 'error-spot',
  prompt: 'Uma das frases tem um problema. Encontre qual é.',
  sentences: [
    { id: 's-rep',        text: PQUEHORASELA.rep },
    { id: 's-tema-falha', text: 'Eu acredito que, no Brasil, ainda existem desafios para enfrentar a invisibilidade do trabalho de cuidado exercido pela mulher.' },
    { id: 's-prob',       text: PQUEHORASELA.prob },
  ],
  errorSentenceId: 's-tema-falha',
  explanation: "A redação não pode usar primeira pessoa ('eu acredito'). O texto precisa ser objetivo e impessoal.",
};

// error-5: ppatinhofeio — flawed prob names "tese" explicitly
const error5: ActivityData = {
  id: 'fase1-error-5',
  kind: 'error-spot',
  prompt: 'Uma das frases tem um problema. Encontre qual é.',
  sentences: [
    { id: 's-rep',        text: PPATINHOFEIO.rep },
    { id: 's-tema',       text: PPATINHOFEIO.tema },
    { id: 's-prob-falha', text: 'A tese deste texto é que a falta de acessibilidade e a inclusão tardia do sistema de Libras são problemas desse tema.' },
  ],
  errorSentenceId: 's-prob-falha',
  explanation: "Essa redação não usa a palavra 'tese'. Vá direto aos problemas, sem nomear o que a frase está fazendo.",
};

// ─── Export — Group 1, Group 2, Group 3, Group 4 (recognition → production → error analysis) ───

export const fase1Activities: ActivityData[] = [
  // Group 1: TagMatch full match
  tagfull1, tagfull2, tagfull3,
  // Group 2: TagMatch single target
  tagsingle1, tagsingle2, tagsingle3, tagsingle4, tagsingle5,
  // Group 3: Order
  order1, order2, order3, order4, order5,
  // Group 4: ErrorSpot
  error1, error2, error3, error4, error5,
];
