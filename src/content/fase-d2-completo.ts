import type { ActivityData } from '../engine/types';

// Desenvolvimento 2 — capstone. Mirrors the block structure of fase-d1-completo,
// but ties together all THREE paragraphs (Introdução + D1 + D2) across four
// themes. 15 questions in 5 blocks (A/B/C trimmed to 3 themes each; D keeps all
// 4 paragraphs' junção; E keeps the 2 full-order challenges):
//   A (Q1-3)   recap Introdução sozinha  — TagMatch bijective (rep/ponte/prob)
//   B (Q4-6)   recap D1 sozinho          — ChoiceSelect (qual citação do D1?)
//   C (Q7-9)   recap D2 sozinho          — ChoiceSelect (qual citação do D2?)
//   D (Q10-13) junção dos 3 parágrafos   — TagMatch many-to-few (Intro/D1/D2)
//   E (Q14-15) desafio final             — OrderPuzzle das 9 frases + distratores

// ─── Theme reference texts (established/validated content) ────────────────────
// Each paragraph is split into its sentences. `d2pShort` is the D2 problemática
// clause without the motivo — used in Block D so each paragraph contributes a
// problemática sentence and a citação sentence.

interface Theme {
  label: string;
  rep: string;
  ponte: string;
  prob: string;
  d1p: string;
  d1c: string;
  d1a: string;
  d2p: string;
  d2pShort: string;
  d2c: string;
  d2a: string;
}

const SAUDE: Theme = {
  label: 'saúde',
  rep: "Na série 'Grey's Anatomy', médicos enfrentam diariamente decisões urgentes em meio à escassez de recursos hospitalares.",
  ponte: 'Nesse sentido, os desafios para a garantia do acesso à saúde pública na sociedade brasileira revelam-se um obstáculo à qualidade de vida da população.',
  prob: 'Dois problemas desse tema são a escassez de profissionais em regiões afastadas, além da superlotação das unidades de saúde.',
  d1p: 'Em primeiro lugar, destaca-se a escassez de profissionais de saúde em regiões afastadas do país, uma vez que grande parte dos médicos concentra-se nos grandes centros urbanos.',
  d1c: 'Segundo dados do Conselho Federal de Medicina, municípios do interior contam com menos de um médico para cada mil habitantes.',
  d1a: 'Desse modo, a ausência de atendimento próximo obriga a população a percorrer longas distâncias em busca de cuidados básicos, agravando quadros que poderiam ser tratados precocemente.',
  d2p: 'Em segundo lugar, evidencia-se a superlotação das unidades de saúde como um entrave à qualidade do atendimento à população brasileira, visto que a demanda por serviços básicos ultrapassa a capacidade de atendimento das unidades disponíveis.',
  d2pShort: 'Em segundo lugar, evidencia-se a superlotação das unidades de saúde como um entrave à qualidade do atendimento à população brasileira.',
  d2c: 'Segundo o filósofo Michel Foucault, as instituições modernas frequentemente priorizam o controle e a gestão em detrimento do cuidado individualizado com os indivíduos.',
  d2a: 'Desse modo, a sobrecarga do sistema público compromete o atendimento adequado aos pacientes, aumentando o tempo de espera e agravando quadros de saúde que poderiam ser tratados a tempo.',
};

const VIOLENCIA: Theme = {
  label: 'violência urbana',
  rep: "Na série 'The Walking Dead', a sociedade civil se desintegra diante do caos, e a violência entre sobreviventes se torna rotina diante da ausência de ordem.",
  ponte: 'Assim como na série, os desafios para o combate à violência urbana na sociedade brasileira comprometem a sensação de segurança da população.',
  prob: 'Dois problemas desse tema são a ausência de policiamento em áreas periféricas, além da impunidade de crimes violentos.',
  d1p: 'Em primeiro lugar, destaca-se a ausência de policiamento em áreas periféricas como um dos principais fatores que agravam a violência urbana, uma vez que essas regiões recebem menos investimento em segurança pública.',
  d1c: 'Segundo dados do Fórum Brasileiro de Segurança Pública, a maior parte dos homicídios no país ocorre em bairros com baixa presença policial.',
  d1a: 'Desse modo, a desigualdade na distribuição da segurança pública aprofunda a sensação de abandono nessas comunidades, perpetuando o ciclo de violência.',
  d2p: 'Ademais, destaca-se a impunidade de crimes violentos como um fator que perpetua a insegurança na sociedade brasileira, uma vez que a ausência de punição efetiva reforça a sensação de que a violência não terá consequências.',
  d2pShort: 'Ademais, destaca-se a impunidade de crimes violentos como um fator que perpetua a insegurança na sociedade brasileira.',
  d2c: "Conforme o filósofo Thomas Hobbes, em sua obra 'Leviatã', a ausência de uma autoridade que garanta a ordem leva à instauração do caos social.",
  d2a: 'Logo, a fragilidade do sistema de justiça contribui para a perpetuação do ciclo de violência, afetando principalmente as comunidades mais vulneráveis.',
};

const SOLIDAO: Theme = {
  label: 'solidão',
  rep: "No filme 'Up: Altas Aventuras', o personagem Carl isola-se do mundo após a perda da esposa, evidenciando o impacto da solidão na velhice.",
  ponte: 'Fora da ficção, os desafios para o enfrentamento da solidão e do isolamento social na sociedade brasileira atingem principalmente a população idosa.',
  prob: 'Dois problemas desse tema são a falta de espaços de convívio comunitário, além do abandono familiar de idosos.',
  d1p: 'Em primeira análise, destaca-se a falta de espaços de convívio comunitário como um entrave ao bem-estar da população idosa, pois muitos bairros não oferecem locais adequados para a socialização dessa faixa etária.',
  d1c: 'Segundo dados do IBGE, mais de 30% dos idosos brasileiros vivem sozinhos, sem contato regular com familiares ou vizinhos.',
  d1a: 'Desse modo, a ausência de convívio social contribui para o agravamento de quadros de solidão, afetando diretamente a saúde emocional dessa população.',
  d2p: 'Em segunda análise, evidencia-se o abandono familiar de idosos como um agravante do isolamento social no Brasil, pois a ausência de vínculos afetivos próximos compromete o bem-estar emocional dessa parcela da população.',
  d2pShort: 'Em segunda análise, evidencia-se o abandono familiar de idosos como um agravante do isolamento social no Brasil.',
  d2c: "Segundo o sociólogo Norbert Elias, em sua obra 'A Solidão dos Moribundos', o distanciamento social contemporâneo tende a isolar os indivíduos justamente nos momentos de maior fragilidade.",
  d2a: 'Assim, esse distanciamento entre gerações intensifica o sentimento de abandono, tornando ainda mais difícil o enfrentamento das dificuldades típicas da velhice.',
};

const CUIDADO: Theme = {
  label: 'trabalho de cuidado',
  rep: "No filme 'Que Horas Ela Volta?', a protagonista Val mora e trabalha na casa de uma família rica, abdicando da própria vida e se afastando da filha em nome do trabalho de cuidado que exerce.",
  ponte: 'Assim como no longa-metragem, no Brasil, ainda existem desafios para enfrentar a invisibilidade do trabalho de cuidado exercido pela mulher.',
  prob: 'Dois problemas desse tema são que as mulheres são responsáveis por grande parte do serviço, além daquele que não é remunerado.',
  d1p: 'Primeiramente, destaca-se que as mulheres são responsáveis por grande parte dos serviços de cuidado, e isso é um problema pois tais trabalhos são invisibilizados diante da sociedade.',
  d1c: 'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
  d1a: 'Isto se deve ao fato de elas não terem seu esforço reconhecido devido ao seu círculo social.',
  d2p: 'Em segunda análise, nota-se que o trabalho de cuidado é naturalizado como responsabilidade exclusiva da mulher, pois isso reforça uma construção social enraizada historicamente.',
  d2pShort: 'Em segunda análise, nota-se que o trabalho de cuidado é naturalizado como responsabilidade exclusiva da mulher.',
  d2c: 'Segundo os conceitos de Émile Durkheim, essas funções seriam desenvolvidas pelas instituições socializadoras, e não de forma natural.',
  d2a: 'Logo, esse padrão é enraizado na sociedade, dificultando mudanças estruturais na divisão das tarefas entre homens e mulheres.',
};

// ─── Block builders ───────────────────────────────────────────────────────────

// Block A — TagMatch bijective: 3 introdução sentences → rep / ponte / prob.
function introTag(n: number, t: Theme): ActivityData {
  const rep = `q${n}-rep`;
  const ponte = `q${n}-ponte`;
  const prob = `q${n}-prob`;
  return {
    id: `fase-d2-completo-${n}`,
    kind: 'tag-match',
    prompt: `Classifique cada frase da introdução (tema: ${t.label}) na parte a que pertence.`,
    sentences: [
      { id: rep, text: t.rep },
      { id: ponte, text: t.ponte },
      { id: prob, text: t.prob },
    ],
    tags: [
      { id: 'repertorio', label: 'Repertório' },
      { id: 'ponte', label: 'Ponte (tema + Brasil)' },
      { id: 'problematicas', label: 'Problemáticas' },
    ],
    mapping: { [rep]: 'repertorio', [ponte]: 'ponte', [prob]: 'problematicas' },
  };
}

// Block B & C — ChoiceSelect: identify which citation belongs to this theme's
// D1 (or D2). Distractors are the same-tier citations from the other themes, so
// every option shares the same style (all statistics, or all thinkers) and the
// answer can't be guessed by format. The correct option is rotated to a
// different source position per question (the engine also shuffles at runtime).
function citationChoice(
  n: number,
  promptText: string,
  correct: string,
  distractors: string[],
  explanation: string
): ActivityData {
  const texts = [correct, ...distractors];
  const shift = n % texts.length;
  const rotated = [...texts.slice(shift), ...texts.slice(0, shift)];
  const options = rotated.map((text, i) => ({ id: `q${n}-o${i + 1}`, text }));
  const correctIndex = rotated.indexOf(correct);
  return {
    id: `fase-d2-completo-${n}`,
    kind: 'choice',
    prompt: promptText,
    options,
    correctOptionId: options[correctIndex].id,
    explanation,
  };
}

// Block D — TagMatch many-to-few: 6 sentences (2 intro, 2 D1, 2 D2) → paragraph.
function junctionTag(n: number, t: Theme): ActivityData {
  const ids = {
    rep: `q${n}-rep`,
    prob: `q${n}-prob`,
    d1p: `q${n}-d1p`,
    d1c: `q${n}-d1c`,
    d2p: `q${n}-d2p`,
    d2c: `q${n}-d2c`,
  };
  return {
    id: `fase-d2-completo-${n}`,
    kind: 'tag-match',
    prompt: `Classifique cada frase (tema: ${t.label}) no parágrafo a que pertence: Introdução, D1 ou D2.`,
    sentences: [
      { id: ids.rep, text: t.rep },
      { id: ids.prob, text: t.prob },
      { id: ids.d1p, text: t.d1p },
      { id: ids.d1c, text: t.d1c },
      { id: ids.d2p, text: t.d2pShort },
      { id: ids.d2c, text: t.d2c },
    ],
    tags: [
      { id: 'intro', label: 'Introdução' },
      { id: 'd1', label: 'D1' },
      { id: 'd2', label: 'D2' },
    ],
    mapping: {
      [ids.rep]: 'intro',
      [ids.prob]: 'intro',
      [ids.d1p]: 'd1',
      [ids.d1c]: 'd1',
      [ids.d2p]: 'd2',
      [ids.d2c]: 'd2',
    },
  };
}

// Block E — OrderPuzzle: all 9 sentences of Intro + D1 + D2 in order, with 2
// off-theme pool-only distractors that fail the check if placed in any slot.
function fullOrder(
  n: number,
  t: Theme,
  promptText: string,
  distractors: string[]
): ActivityData {
  const ordered = [t.rep, t.ponte, t.prob, t.d1p, t.d1c, t.d1a, t.d2p, t.d2c, t.d2a];
  return {
    id: `fase-d2-completo-${n}`,
    kind: 'order',
    prompt: promptText,
    items: ordered.map((label, i) => ({ id: `q${n}-i${i + 1}`, label })),
    distractors: distractors.map((label, i) => ({ id: `q${n}-d${i + 1}`, label })),
  };
}

// ─── Phase ────────────────────────────────────────────────────────────────────

export const faseD2CompletoActivities: ActivityData[] = [
  // ── BLOCO A — recap Introdução sozinha (3 de 4 temas; cuidado recapeado adiante) ─
  introTag(1, SAUDE),
  introTag(2, VIOLENCIA),
  introTag(3, SOLIDAO),

  // ── BLOCO B — recap D1 sozinho (qual citação/dado do D1?) — 3 temas ─────────
  citationChoice(
    4,
    "No D1 do tema 'saúde', qual é a citação (dado) utilizada?",
    SAUDE.d1c,
    [VIOLENCIA.d1c, SOLIDAO.d1c, CUIDADO.d1c],
    'No D1 de saúde, a citação é o dado do Conselho Federal de Medicina sobre a escassez de médicos no interior. As demais são citações do D1 de outros temas (segurança pública, idosos e trabalho de cuidado).'
  ),
  citationChoice(
    5,
    "No D1 do tema 'violência urbana', qual é a citação (dado) utilizada?",
    VIOLENCIA.d1c,
    [SAUDE.d1c, SOLIDAO.d1c, CUIDADO.d1c],
    'No D1 de violência urbana, a citação é o dado do Fórum Brasileiro de Segurança Pública sobre homicídios em bairros com baixa presença policial. As demais são citações do D1 de outros temas.'
  ),
  citationChoice(
    6,
    "No D1 do tema 'trabalho de cuidado', qual é a citação (dado) utilizada?",
    CUIDADO.d1c,
    [SAUDE.d1c, VIOLENCIA.d1c, SOLIDAO.d1c],
    'No D1 de trabalho de cuidado, a citação é o dado da PNAD sobre horas semanais de afazeres domésticos. As demais são citações do D1 de outros temas.'
  ),

  // ── BLOCO C — recap D2 sozinho (qual citação/pensador do D2?) — 3 temas ─────
  citationChoice(
    7,
    "No D2 do tema 'violência urbana', qual é a citação (pensador) utilizada?",
    VIOLENCIA.d2c,
    [SAUDE.d2c, SOLIDAO.d2c, CUIDADO.d2c],
    'No D2 de violência urbana, a citação é a do filósofo Thomas Hobbes ("Leviatã"), sobre a ausência de autoridade e o caos social. As demais são citações do D2 de outros temas.'
  ),
  citationChoice(
    8,
    "No D2 do tema 'solidão', qual é a citação (pensador) utilizada?",
    SOLIDAO.d2c,
    [SAUDE.d2c, VIOLENCIA.d2c, CUIDADO.d2c],
    'No D2 de solidão, a citação é a do sociólogo Norbert Elias ("A Solidão dos Moribundos"). As demais são citações do D2 de outros temas.'
  ),
  citationChoice(
    9,
    "No D2 do tema 'trabalho de cuidado', qual é a citação (pensador) utilizada?",
    CUIDADO.d2c,
    [SAUDE.d2c, VIOLENCIA.d2c, SOLIDAO.d2c],
    'No D2 de trabalho de cuidado, a citação é a de Émile Durkheim, sobre as instituições socializadoras. As demais são citações do D2 de outros temas.'
  ),

  // ── BLOCO D — junção dos 3 parágrafos (Introdução / D1 / D2) — 4 temas ──────
  junctionTag(10, SAUDE),
  junctionTag(11, VIOLENCIA),
  junctionTag(12, SOLIDAO),
  junctionTag(13, CUIDADO),

  // ── BLOCO E — desafio final (ordenar os 3 parágrafos completos) ─────────────
  fullOrder(
    14,
    SOLIDAO,
    'Organize todas as nove frases da introdução + D1 + D2 do tema "solidão" ("Up: Altas Aventuras") na sequência correta. Atenção: há frases de outro tema no pool.',
    [SAUDE.d1c, SAUDE.d2c]
  ),
  fullOrder(
    15,
    CUIDADO,
    'Organize todas as nove frases da introdução + D1 + D2 do tema "trabalho de cuidado" ("Que Horas Ela Volta?") na sequência correta. Atenção: há frases de outro tema no pool.',
    [VIOLENCIA.d1c, VIOLENCIA.d2c]
  ),
];
