import type { ActivityData } from '../engine/types';

// ═══════════════════════════════════════════════════════════════════════════
// MISSÃO FINAL: RETORNO À TERRA
// The culmination of the whole game. 30 questions in 5 fixed blocks (5/5/5/5/10)
// covering Introdução, D1, D2, Conclusão and the full redação. Presented STRICTLY
// in order (Fase.tsx does not shuffle this phase); only per-question option order
// still shuffles inside each engine, as everywhere else. Engines reused unchanged.
// ═══════════════════════════════════════════════════════════════════════════

// ── Full essays (12 sentences each) — used to rebuild the whole text (Q28-30) ─
const saude = [
  "Na série 'Grey's Anatomy', médicos enfrentam diariamente decisões urgentes em meio à escassez de recursos hospitalares.",
  'Nesse sentido, os desafios para a garantia do acesso à saúde pública na sociedade brasileira revelam-se um obstáculo à qualidade de vida da população.',
  'Dois problemas desse tema são a escassez de profissionais em regiões afastadas, além da superlotação das unidades de saúde.',
  'Em primeiro lugar, destaca-se a escassez de profissionais de saúde em regiões afastadas do país, uma vez que grande parte dos médicos concentra-se nos grandes centros urbanos.',
  'Segundo dados do Conselho Federal de Medicina, municípios do interior contam com menos de um médico para cada mil habitantes.',
  'Desse modo, a ausência de atendimento próximo obriga a população a percorrer longas distâncias em busca de cuidados básicos, agravando quadros que poderiam ser tratados precocemente.',
  'Em segundo lugar, evidencia-se a superlotação das unidades de saúde como um entrave à qualidade do atendimento à população brasileira, visto que a demanda por serviços básicos ultrapassa a capacidade de atendimento das unidades disponíveis.',
  'Segundo o filósofo Michel Foucault, as instituições modernas frequentemente priorizam o controle e a gestão em detrimento do cuidado individualizado com os indivíduos.',
  'Desse modo, a sobrecarga do sistema público compromete o atendimento adequado aos pacientes, aumentando o tempo de espera e agravando quadros de saúde que poderiam ser tratados a tempo.',
  'Portanto, o Ministério da Saúde deve investir em infraestrutura hospitalar por meio da destinação de verba específica para a contratação de novos profissionais, com a finalidade de reduzir a sobrecarga das unidades de saúde.',
  'Em detalhe, é urgente ampliar o número de leitos e equipes médicas em regiões afastadas dos grandes centros.',
  "Dessa forma, cenários como os retratados em 'Grey's Anatomy', marcados pela escassez de recursos, deixarão de refletir a realidade brasileira.",
];

const violencia = [
  "Na série 'The Walking Dead', a sociedade civil se desintegra diante do caos, e a violência entre sobreviventes se torna rotina diante da ausência de ordem.",
  'Assim como na série, os desafios para o combate à violência urbana na sociedade brasileira comprometem a sensação de segurança da população.',
  'Dois problemas desse tema são a ausência de policiamento em áreas periféricas, além da impunidade de crimes violentos.',
  'Em primeiro lugar, destaca-se a ausência de policiamento em áreas periféricas como um dos principais fatores que agravam a violência urbana, uma vez que essas regiões recebem menos investimento em segurança pública.',
  'Segundo dados do Fórum Brasileiro de Segurança Pública, a maior parte dos homicídios no país ocorre em bairros com baixa presença policial.',
  'Desse modo, a desigualdade na distribuição da segurança pública aprofunda a sensação de abandono nessas comunidades, perpetuando o ciclo de violência.',
  'Ademais, destaca-se a impunidade de crimes violentos como um fator que perpetua a insegurança na sociedade brasileira, uma vez que a ausência de punição efetiva reforça a sensação de que a violência não terá consequências.',
  "Conforme o filósofo Thomas Hobbes, em sua obra 'Leviatã', a ausência de uma autoridade que garanta a ordem leva à instauração do caos social.",
  'Logo, a fragilidade do sistema de justiça contribui para a perpetuação do ciclo de violência, afetando principalmente as comunidades mais vulneráveis.',
  'Assim, as secretarias estaduais de segurança pública devem ampliar o policiamento comunitário por meio da criação de bases fixas em bairros periféricos, com o objetivo de reduzir os índices de criminalidade nessas regiões.',
  'Como, por exemplo, o investimento em câmeras de monitoramento e iluminação pública.',
  "Dessa maneira, o cenário de caos retratado em 'The Walking Dead' permanecerá restrito à ficção, distante da realidade das comunidades brasileiras.",
];

const solidao = [
  "No filme 'Up: Altas Aventuras', o personagem Carl isola-se do mundo após a perda da esposa, evidenciando o impacto da solidão na velhice.",
  'Fora da ficção, os desafios para o enfrentamento da solidão e do isolamento social na sociedade brasileira atingem principalmente a população idosa.',
  'Dois problemas desse tema são a falta de espaços de convívio comunitário, além do abandono familiar de idosos.',
  'Em primeira análise, destaca-se a falta de espaços de convívio comunitário como um entrave ao bem-estar da população idosa, pois muitos bairros não oferecem locais adequados para a socialização dessa faixa etária.',
  'Segundo dados do IBGE, mais de 30% dos idosos brasileiros vivem sozinhos, sem contato regular com familiares ou vizinhos.',
  'Desse modo, a ausência de convívio social contribui para o agravamento de quadros de solidão, afetando diretamente a saúde emocional dessa população.',
  'Em segunda análise, evidencia-se o abandono familiar de idosos como um agravante do isolamento social no Brasil, pois a ausência de vínculos afetivos próximos compromete o bem-estar emocional dessa parcela da população.',
  "Segundo o sociólogo Norbert Elias, em sua obra 'A Solidão dos Moribundos', o distanciamento social contemporâneo tende a isolar os indivíduos justamente nos momentos de maior fragilidade.",
  'Assim, esse distanciamento entre gerações intensifica o sentimento de abandono, tornando ainda mais difícil o enfrentamento das dificuldades típicas da velhice.',
  'Logo, as secretarias municipais de assistência social devem criar centros de convivência para idosos mediante parcerias com organizações não governamentais e voluntários da comunidade, a fim de que a população idosa tenha acesso a espaços de socialização.',
  'Isto é, promover atividades recreativas e encontros intergeracionais regulares.',
  "Dessa forma, histórias como a do personagem Carl, de 'Up: Altas Aventuras', deixarão de representar a realidade de tantos idosos brasileiros.",
];

const cuidado = [
  "No filme 'Que Horas Ela Volta?', a protagonista Val mora e trabalha na casa de uma família rica, abdicando da própria vida e se afastando da filha em nome do trabalho de cuidado que exerce.",
  'Assim como no longa-metragem, no Brasil, ainda existem desafios para enfrentar a invisibilidade do trabalho de cuidado exercido pela mulher.',
  'Dois problemas desse tema são que as mulheres são responsáveis por grande parte do serviço, além daquele que não é remunerado.',
  'Primeiramente, destaca-se que as mulheres são responsáveis por grande parte dos serviços de cuidado, e isso é um problema pois tais trabalhos são invisibilizados diante da sociedade.',
  'Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens.',
  'Isto se deve ao fato de elas não terem seu esforço reconhecido devido ao seu círculo social.',
  'Em segunda análise, nota-se que o trabalho de cuidado é naturalizado como responsabilidade exclusiva da mulher, pois isso reforça uma construção social enraizada historicamente.',
  'Segundo os conceitos de Émile Durkheim, essas funções seriam desenvolvidas pelas instituições socializadoras, e não de forma natural.',
  'Logo, esse padrão é enraizado na sociedade, dificultando mudanças estruturais na divisão das tarefas entre homens e mulheres.',
  'Sendo assim, o Ministério da Mulher, da Família e dos Direitos Humanos deve criar campanhas nacionais de conscientização através de parcerias com emissoras de televisão e redes sociais, a fim de desnaturalizar a ideia de que os cuidados domésticos são responsabilidade exclusiva da mulher.',
  'Isto é, promover debates nas escolas e empresas sobre a divisão igualitária das tarefas.',
  "Assim, a sociedade deixa de reproduzir a realidade de exclusão retratada em 'Que Horas Ela Volta?'.",
];

// ── Tag sets ─────────────────────────────────────────────────────────────────
const TAGS_INTRO = [
  { id: 'repertorio', label: 'Repertório' },
  { id: 'ponte', label: 'Ponte tema+Brasil' },
  { id: 'problematicas', label: 'Problemáticas' },
];
const TAGS_DEV = [
  { id: 'conectivo', label: 'Conectivo' },
  { id: 'problematica', label: 'Problemática' },
  { id: 'motivo', label: 'Motivo' },
];
const TAGS_CONC = [
  { id: 'modo', label: 'Modo/Meio' },
  { id: 'finalidade', label: 'Finalidade' },
  { id: 'detalhamento', label: 'Detalhamento' },
];
const TAGS_PARTS = [
  { id: 'intro', label: 'Introdução' },
  { id: 'd1', label: 'D1' },
  { id: 'd2', label: 'D2' },
  { id: 'conclusao', label: 'Conclusão' },
];
const TAGS_TEMAS = [
  { id: 'saude', label: 'Saúde' },
  { id: 'violencia', label: 'Violência urbana' },
  { id: 'solidao', label: 'Solidão' },
  { id: 'cuidado', label: 'Trabalho de cuidado' },
];

// ── Builders (keep the 30 entries compact and consistent) ────────────────────
function tagMatch(
  n: number,
  prompt: string,
  tags: { id: string; label: string }[],
  pairs: [string, string][]
): ActivityData {
  return {
    id: `fase-missao-final-${n}`,
    kind: 'tag-match',
    prompt,
    sentences: pairs.map(([text], i) => ({ id: `q${n}-s${i + 1}`, text })),
    tags,
    mapping: Object.fromEntries(pairs.map(([, tag], i) => [`q${n}-s${i + 1}`, tag])),
  };
}

function choiceQ(
  n: number,
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string
): ActivityData {
  const texts = [correct, ...distractors];
  const shift = n % texts.length;
  const rotated = [...texts.slice(shift), ...texts.slice(0, shift)];
  const options = rotated.map((text, i) => ({ id: `q${n}-o${i + 1}`, text }));
  return {
    id: `fase-missao-final-${n}`,
    kind: 'choice',
    prompt,
    options,
    correctOptionId: options[rotated.indexOf(correct)].id,
    explanation,
  };
}

function errorSpot(
  n: number,
  prompt: string,
  sentences: string[],
  errorIdx: number[],
  explanation: string,
  contextText?: string
): ActivityData {
  const base = {
    id: `fase-missao-final-${n}`,
    kind: 'error-spot' as const,
    prompt,
    sentences: sentences.map((text, i) => ({ id: `q${n}-s${i + 1}`, text })),
    errorSentenceIds: errorIdx.map((i) => `q${n}-s${i + 1}`),
    explanation,
  };
  return contextText ? { ...base, contextText } : base;
}

function buildQ(n: number, prompt: string, correctFrags: string[], distractors: string[]): ActivityData {
  return {
    id: `fase-missao-final-${n}`,
    kind: 'build',
    prompt,
    fragments: [
      ...correctFrags.map((text, i) => ({ id: `q${n}-f${i + 1}`, text, correct: true })),
      ...distractors.map((text, i) => ({ id: `q${n}-d${i + 1}`, text, correct: false })),
    ],
    acceptedOrders: [correctFrags.map((_, i) => `q${n}-f${i + 1}`)],
  };
}

function orderQ(n: number, prompt: string, blocks: string[], distractors: string[]): ActivityData {
  return {
    id: `fase-missao-final-${n}`,
    kind: 'order',
    prompt,
    items: blocks.map((label, i) => ({ id: `q${n}-i${i + 1}`, label })),
    distractors: distractors.map((label, i) => ({ id: `q${n}-d${i + 1}`, label })),
  };
}

export const faseMissaoFinalActivities: ActivityData[] = [
  // ═══ BLOCO 1 — Introdução (Q1-5) ═══════════════════════════════════════════
  tagMatch(1, 'Introdução (saúde): classifique cada frase na sua parte.', TAGS_INTRO, [
    [saude[0], 'repertorio'],
    [saude[1], 'ponte'],
    [saude[2], 'problematicas'],
  ]),
  tagMatch(2, 'Introdução (violência urbana): classifique cada frase na sua parte.', TAGS_INTRO, [
    [violencia[0], 'repertorio'],
    [violencia[1], 'ponte'],
    [violencia[2], 'problematicas'],
  ]),
  tagMatch(3, 'Introdução (solidão): classifique cada frase na sua parte.', TAGS_INTRO, [
    [solidao[0], 'repertorio'],
    [solidao[1], 'ponte'],
    [solidao[2], 'problematicas'],
  ]),
  tagMatch(4, 'Introdução (trabalho de cuidado): classifique cada frase na sua parte.', TAGS_INTRO, [
    [cuidado[0], 'repertorio'],
    [cuidado[1], 'ponte'],
    [cuidado[2], 'problematicas'],
  ]),
  errorSpot(
    5,
    'Esta introdução (tema: saúde) tem uma frase que não pertence a ela. Toque na frase com o problema.',
    [saude[0], saude[1], saude[3]],
    [2],
    'Essa frase já usa a estrutura e o conectivo do D1 (retoma apenas 1 problemática com motivo) — não pertence à introdução, que deve apenas apresentar os dois problemas, sem começar a desenvolvê-los.'
  ),

  // ═══ BLOCO 2 — Desenvolvimento 1 (Q6-10) ═══════════════════════════════════
  choiceQ(
    6,
    'Qual opção tem o conectivo, a problemática e o motivo corretos do D1 do tema violência urbana?',
    violencia[3],
    [
      'Em segundo lugar, destaca-se a ausência de policiamento em áreas periféricas como um dos principais fatores que agravam a violência urbana...',
      'Em primeiro lugar, destaca-se a impunidade de crimes violentos como um fator que perpetua a insegurança...',
      'Segundo dados do Fórum Brasileiro de Segurança Pública, a maior parte dos homicídios ocorre em bairros com baixa presença policial.',
    ],
    'O D1 abre com "Em primeiro lugar" e retoma a PRIMEIRA problemática (ausência de policiamento) com um motivo. "Em segundo lugar" é conectivo do D2; a impunidade é a 2ª problemática (D2); e a frase do Fórum é a citação, não a problemática+motivo.'
  ),
  choiceQ(
    7,
    'Qual das opções é a citação do D1 do tema trabalho de cuidado (um dado/fato)?',
    cuidado[4],
    [
      'Segundo os conceitos de Émile Durkheim, essas funções seriam desenvolvidas pelas instituições socializadoras.',
      'Sendo assim, o Ministério da Mulher deve criar campanhas nacionais de conscientização.',
      "No filme 'Que Horas Ela Volta?', a protagonista Val mora e trabalha na casa de uma família rica.",
    ],
    'A citação do D1 é um dado estatístico (PNAD). Durkheim é a citação do D2; a frase do Ministério é conclusão; e o filme é o repertório da introdução.'
  ),
  errorSpot(
    8,
    'Trecho do D1 (tema: saúde). Uma parte está mal escrita. Toque na frase com o problema.',
    [
      'Em primeiro lugar,',
      'destaca-se a escassez de profissionais de saúde em regiões afastadas do país,',
      'pois há poucos médicos em regiões afastadas.',
    ],
    [2],
    'Esse motivo apenas repete o problema com outras palavras, sem apresentar uma causa.'
  ),
  tagMatch(9, 'D1 (solidão): classifique cada parte na sua função.', TAGS_DEV, [
    ['Em primeira análise', 'conectivo'],
    ['destaca-se a falta de espaços de convívio comunitário como um entrave ao bem-estar da população idosa', 'problematica'],
    ['pois muitos bairros não oferecem locais adequados para a socialização dessa faixa etária', 'motivo'],
  ]),
  buildQ(
    10,
    'Tema "violência urbana": monte o argumento (fechamento) do D1 na ordem correta.',
    [
      'Desse modo',
      'a desigualdade na distribuição da segurança pública',
      'aprofunda a sensação de abandono nessas comunidades',
      'perpetuando o ciclo de violência',
    ],
    ['o que resolve o problema rapidamente', 'sem qualquer relação com a segurança pública']
  ),

  // ═══ BLOCO 3 — Desenvolvimento 2 (Q11-15) ══════════════════════════════════
  choiceQ(
    11,
    'Qual das opções é uma citação adequada ao D2 do tema saúde (filosófica/sociológica)?',
    saude[7],
    [
      'Segundo dados do Conselho Federal de Medicina, municípios do interior contam com menos de um médico para cada mil habitantes.',
      'Segundo dados do Ministério da Saúde, 60% dos municípios enfrentam déficit de leitos.',
      'Em detalhe, é urgente ampliar o número de leitos.',
    ],
    'No D2 a citação é filosófica/sociológica (Foucault). As opções do CFM e do Ministério da Saúde são dados estatísticos (padrão D1); "Em detalhe..." é detalhamento de Conclusão.'
  ),
  errorSpot(
    12,
    'Trecho do D2 (tema: trabalho de cuidado). Uma citação está no estilo errado. Toque na frase com o problema.',
    [
      'Em segunda análise, nota-se que o trabalho de cuidado é naturalizado como responsabilidade exclusiva da mulher, pois isso reforça uma construção social enraizada historicamente.',
      'Segundo dados da PNAD, as mulheres dedicam o dobro de horas aos afazeres domésticos.',
      'Logo, esse padrão é enraizado na sociedade, dificultando mudanças estruturais na divisão das tarefas entre homens e mulheres.',
    ],
    [1],
    'Essa é a citação usada no D1 (dado estatístico) — no D2 a citação deve ser filosófica, literária ou sociológica.'
  ),
  tagMatch(13, 'D2 (violência urbana): classifique cada parte na sua função.', TAGS_DEV, [
    ['Ademais', 'conectivo'],
    ['destaca-se a impunidade de crimes violentos como um fator que perpetua a insegurança na sociedade brasileira', 'problematica'],
    ['uma vez que a ausência de punição efetiva reforça a sensação de que a violência não terá consequências', 'motivo'],
  ]),
  buildQ(
    14,
    'Tema "solidão": monte a citação do D2 e o argumento que a fecha, na ordem correta.',
    [
      'Segundo o sociólogo Norbert Elias',
      "em sua obra 'A Solidão dos Moribundos'",
      'o distanciamento social contemporâneo tende a isolar os indivíduos justamente nos momentos de maior fragilidade',
      'Assim, esse distanciamento entre gerações',
      'intensifica o sentimento de abandono',
      'tornando ainda mais difícil o enfrentamento das dificuldades típicas da velhice',
    ],
    ['conforme dados do IBGE', 'sem qualquer relação com a velhice']
  ),
  orderQ(
    15,
    'Tema "saúde": ordene o D2 completo. Cuidado com a citação de outro tema no pool.',
    [
      'Em segundo lugar,',
      'evidencia-se a superlotação das unidades de saúde como um entrave à qualidade do atendimento à população brasileira,',
      'visto que a demanda por serviços básicos ultrapassa a capacidade de atendimento das unidades disponíveis.',
      'Segundo o filósofo Michel Foucault, as instituições modernas frequentemente priorizam o controle e a gestão em detrimento do cuidado individualizado com os indivíduos.',
      'Desse modo, a sobrecarga do sistema público compromete o atendimento adequado aos pacientes, aumentando o tempo de espera e agravando quadros de saúde que poderiam ser tratados a tempo.',
    ],
    ["Conforme o filósofo Thomas Hobbes, em sua obra 'Leviatã', a ausência de uma autoridade que garanta a ordem leva à instauração do caos social."]
  ),

  // ═══ BLOCO 4 — Conclusão (Q16-20) ══════════════════════════════════════════
  choiceQ(
    16,
    'Qual opção combina corretamente o conectivo conclusivo com o agente específico do tema violência urbana?',
    'Assim, as secretarias estaduais de segurança pública devem...',
    [
      'Assim, a polícia deve...',
      'Porém, as secretarias estaduais de segurança pública devem...',
      'Assim, o Ministério da Saúde deve...',
    ],
    'A abertura correta usa um conectivo conclusivo (Assim) + um agente específico (as secretarias estaduais de segurança pública). "A polícia" é genérico demais; "Porém" é conectivo de oposição; e "o Ministério da Saúde" é agente de outro tema.'
  ),
  errorSpot(
    17,
    'Estas frases deveriam detalhar a conclusão (tema: solidão). Uma delas é uma finalidade disfarçada. Toque na frase com o problema.',
    [
      'para que os idosos se sintam mais acolhidos',
      'isto é, promover atividades recreativas e encontros intergeracionais regulares',
      'em detalhe, oferecer oficinas culturais e acompanhamento psicológico',
    ],
    [0],
    "Essa frase é uma nova finalidade disfarçada ('para que...'), não um detalhe concreto da ação proposta."
  ),
  tagMatch(18, 'Conclusão (trabalho de cuidado): classifique cada parte na sua função.', TAGS_CONC, [
    ['através de parcerias com emissoras de televisão e redes sociais', 'modo'],
    ['a fim de desnaturalizar a ideia de que os cuidados domésticos são responsabilidade exclusiva da mulher', 'finalidade'],
    ['isto é, promover debates nas escolas e empresas sobre a divisão igualitária das tarefas', 'detalhamento'],
  ]),
  buildQ(
    19,
    'Tema "saúde": monte o fechamento da conclusão (conectivo + retomada) na ordem correta.',
    [
      'Dessa forma',
      "cenários como os retratados em 'Grey's Anatomy'",
      'marcados pela escassez de recursos',
      'deixarão de refletir a realidade brasileira',
    ],
    ['e os médicos ficarão satisfeitos', 'sem qualquer relação com o filme']
  ),
  orderQ(
    20,
    'Tema "violência urbana": ordene a conclusão completa. Cuidado com a frase de outro tema no pool.',
    [
      'Assim,',
      'as secretarias estaduais de segurança pública devem ampliar o policiamento comunitário',
      'por meio da criação de bases fixas em bairros periféricos,',
      'com o objetivo de reduzir os índices de criminalidade nessas regiões.',
      'Como, por exemplo, o investimento em câmeras de monitoramento e iluminação pública.',
      "Dessa maneira, o cenário de caos retratado em 'The Walking Dead' permanecerá restrito à ficção,",
      'distante da realidade das comunidades brasileiras.',
    ],
    ['Em detalhe, é urgente ampliar o número de leitos e equipes médicas em regiões afastadas dos grandes centros.']
  ),

  // ═══ BLOCO 5 — Redação completa: todo o texto (Q21-30) ═════════════════════
  tagMatch(21, 'Tema "solidão": classifique cada frase no parágrafo a que pertence.', TAGS_PARTS, [
    ["No filme 'Up: Altas Aventuras', o personagem Carl isola-se do mundo após a perda da esposa.", 'intro'],
    ['Dois problemas desse tema são a falta de espaços de convívio comunitário, além do abandono familiar de idosos.', 'intro'],
    ['Em primeira análise, destaca-se a falta de espaços de convívio comunitário como um entrave ao bem-estar da população idosa.', 'd1'],
    ['Segundo dados do IBGE, mais de 30% dos idosos brasileiros vivem sozinhos.', 'd1'],
    ['Em segunda análise, evidencia-se o abandono familiar de idosos como um agravante do isolamento social no Brasil.', 'd2'],
    ["Segundo o sociólogo Norbert Elias, em sua obra 'A Solidão dos Moribundos', o distanciamento social contemporâneo tende a isolar os indivíduos.", 'd2'],
    ['Logo, as secretarias municipais de assistência social devem criar centros de convivência para idosos.', 'conclusao'],
    ["Dessa forma, histórias como a do personagem Carl, de 'Up: Altas Aventuras', deixarão de representar a realidade de tantos idosos brasileiros.", 'conclusao'],
  ]),
  tagMatch(22, 'Tema "trabalho de cuidado": classifique cada frase no parágrafo a que pertence.', TAGS_PARTS, [
    ["No filme 'Que Horas Ela Volta?', a protagonista Val mora e trabalha na casa de uma família rica.", 'intro'],
    ['Dois problemas desse tema são que as mulheres são responsáveis por grande parte do serviço, além daquele que não é remunerado.', 'intro'],
    ['Primeiramente, destaca-se que as mulheres são responsáveis por grande parte dos serviços de cuidado.', 'd1'],
    ['Segundo dados da PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos.', 'd1'],
    ['Em segunda análise, nota-se que o trabalho de cuidado é naturalizado como responsabilidade exclusiva da mulher.', 'd2'],
    ['Segundo os conceitos de Émile Durkheim, essas funções seriam desenvolvidas pelas instituições socializadoras.', 'd2'],
    ['Sendo assim, o Ministério da Mulher, da Família e dos Direitos Humanos deve criar campanhas nacionais de conscientização.', 'conclusao'],
    ["Assim, a sociedade deixa de reproduzir a realidade de exclusão retratada em 'Que Horas Ela Volta?'.", 'conclusao'],
  ]),
  orderQ(
    23,
    'Tema "saúde": reconstrua a introdução completa (3 frases). Cuidado com a frase de outro tema no pool.',
    [saude[0], saude[1], saude[2]],
    [solidao[0]]
  ),
  orderQ(
    24,
    'Tema "violência urbana": reconstrua o D1 completo (3 frases). Cuidado com a frase de outro tema no pool.',
    [violencia[3], violencia[4], violencia[5]],
    ['Primeiramente, destaca-se que as mulheres são responsáveis por grande parte dos serviços de cuidado.']
  ),
  orderQ(
    25,
    'Tema "trabalho de cuidado": reconstrua o D2 completo (3 frases). Cuidado com a frase de outro tema no pool.',
    [cuidado[6], cuidado[7], cuidado[8]],
    ['Ademais, destaca-se a impunidade de crimes violentos como um fator que perpetua a insegurança.']
  ),
  orderQ(
    26,
    'Tema "solidão": reconstrua a conclusão completa, com a retomada (3 frases). Cuidado com as frases de outros temas no pool.',
    [solidao[9], solidao[10], solidao[11]],
    [
      'Portanto, o Ministério da Saúde deve investir em infraestrutura hospitalar.',
      'Como, por exemplo, o investimento em câmeras de monitoramento.',
    ]
  ),
  tagMatch(27, 'Associe cada tema ao repertório (obra) usado na sua redação.', TAGS_TEMAS, [
    ["'Grey's Anatomy'", 'saude'],
    ["'The Walking Dead'", 'violencia'],
    ["'Up: Altas Aventuras'", 'solidao'],
    ["'Que Horas Ela Volta?'", 'cuidado'],
  ]),
  orderQ(
    28,
    'Tema "saúde": reconstrua a REDAÇÃO INTEIRA — Introdução + D1 + D2 + Conclusão (12 frases). Há frases de outro tema no pool.',
    saude,
    [violencia[4], violencia[7]]
  ),
  orderQ(
    29,
    'Tema "violência urbana": reconstrua a REDAÇÃO INTEIRA (12 frases). Há frases de outro tema no pool.',
    violencia,
    [saude[4], saude[10]]
  ),
  orderQ(
    30,
    'DESAFIO FINAL — Tema "trabalho de cuidado": reconstrua a REDAÇÃO INTEIRA (12 frases). Há frases de TRÊS temas diferentes no pool. Acerte para concluir a Missão Final.',
    cuidado,
    [saude[4], violencia[7], solidao[7]]
  ),
];
