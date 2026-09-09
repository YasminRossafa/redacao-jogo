import type { ActivityData } from '../engine/types';

// ─── Fase bônus: "Repertórios" — Desenvolvimento 2 ────────────────────────────
// Ramo lateral do Desenvolvimento 2 (não faz parte da trilha sequencial).
//
// Enquanto as fases principais de D2 dão a cada tema um filósofo dedicado, este
// bônus ensina que UMA MESMA citação filosófica/sociológica pode servir a mais
// de um tema — desde que a ideia central se conecte de fato ao motivo. E o outro
// lado: nem toda citação combina com qualquer tema, então cada conexão precisa
// ser avaliada pelo mérito.
//
// São 5 questões (uma por citação), cada uma um TagMatch many-to-few: a citação
// entra como contexto fixo no enunciado e 4 motivos/problemáticas (de temas
// diferentes) são classificados em "Combina com a citação" (2) / "Não combina"
// (2). O painel de regra (D2RepertoriosExplicacao) abre a fase.

const TAGS = [
  { id: 'combina', label: 'Combina com a citação' },
  { id: 'naocombina', label: 'Não combina' },
];

/** Builds one many-to-few TagMatch: two motivos fit the citation, two don't. */
function question(
  id: string,
  citacao: string,
  combina: [string, string],
  naocombina: [string, string],
  explanation: string
): ActivityData {
  return {
    id,
    kind: 'tag-match',
    // TagMatch has no separate context slot, so the citation rides in the
    // prompt (rendered above the palette/sentences) as fixed context.
    prompt: `Citação: "${citacao}" Classifique cada frase: ela combina com essa citação ou não?`,
    sentences: [
      { id: 'c1', text: combina[0] },
      { id: 'c2', text: combina[1] },
      { id: 'n1', text: naocombina[0] },
      { id: 'n2', text: naocombina[1] },
    ],
    tags: TAGS,
    mapping: { c1: 'combina', c2: 'combina', n1: 'naocombina', n2: 'naocombina' },
    explanation,
  };
}

export const faseD2RepertoriosBonusActivities: ActivityData[] = [
  // ── Q1 — Zygmunt Bauman ────────────────────────────────────────────────────
  question(
    'fase-d2-repertorios-bonus-1',
    'Segundo o filósofo Zygmunt Bauman, a modernidade líquida enfraquece os vínculos de responsabilidade coletiva, tornando mais fácil ignorar o sofrimento alheio.',
    [
      // preconceito
      'visto que a impunidade reforça a sensação de normalidade em relação a comportamentos discriminatórios',
      // solidão
      'pois a ausência de vínculos afetivos próximos compromete o bem-estar emocional dessa parcela da população',
    ],
    [
      // saúde
      'uma vez que a demanda por serviços básicos ultrapassa a capacidade de atendimento das unidades disponíveis',
      // meio ambiente
      'uma vez que a falta de agentes de controle permite a expansão de atividades ilegais em áreas protegidas',
    ],
    'Bauman fala do enfraquecimento de vínculos e da indiferença ao sofrimento alheio — isso conecta diretamente com preconceito (normalizar a discriminação) e solidão (perda de vínculos afetivos). Já saúde e meio ambiente, nesses motivos específicos, não tratam de vínculos sociais enfraquecidos.'
  ),

  // ── Q2 — Michel Foucault ───────────────────────────────────────────────────
  question(
    'fase-d2-repertorios-bonus-2',
    'Segundo o filósofo Michel Foucault, as instituições modernas frequentemente priorizam o controle e a gestão em detrimento do cuidado ou da proteção dos indivíduos.',
    [
      // saúde
      'visto que a demanda por serviços básicos ultrapassa a capacidade de atendimento das unidades disponíveis',
      // violência urbana
      'uma vez que a ausência de punição efetiva reforça a sensação de que a violência não terá consequências',
    ],
    [
      // luto
      'pois a pressão por produtividade não permite tempo adequado para o enfrentamento da dor',
      // trabalho de cuidado
      'pois isso reforça uma construção social enraizada historicamente',
    ],
    'Foucault fala de instituições que priorizam controle/gestão em vez de cuidado ou proteção — isso conecta com saúde (sistema que não prioriza o cuidado individual) e violência urbana (instituições de segurança que não protegem de fato). Luto e trabalho de cuidado não tratam de instituições de controle nesses motivos.'
  ),

  // ── Q3 — Hannah Arendt ─────────────────────────────────────────────────────
  question(
    'fase-d2-repertorios-bonus-3',
    'Segundo a filósofa Hannah Arendt, a banalização da injustiça permite que pessoas comuns se tornem indiferentes ao sofrimento causado por suas próprias omissões.',
    [
      // preconceito
      'visto que a impunidade reforça a sensação de normalidade em relação a comportamentos discriminatórios',
      // meio ambiente
      'uma vez que a falta de agentes de controle permite a expansão de atividades ilegais em áreas protegidas',
    ],
    [
      // solidão
      'pois a ausência de vínculos afetivos próximos compromete o bem-estar emocional dessa parcela da população',
      // violência urbana
      'uma vez que a ausência de punição efetiva reforça a sensação de que a violência não terá consequências',
    ],
    'Arendt fala de indiferença diante da injustiça banalizada pela omissão coletiva — isso conecta com preconceito (normalização da discriminação) e meio ambiente (omissão fiscalizadora diante do desmatamento). Solidão e violência urbana, nesses motivos, não tratam de omissão coletiva diante de uma injustiça banalizada.'
  ),

  // ── Q4 — Émile Durkheim ────────────────────────────────────────────────────
  question(
    'fase-d2-repertorios-bonus-4',
    'Segundo o sociólogo Émile Durkheim, os papéis e comportamentos sociais são moldados pelas instituições socializadoras, e não por uma ordem natural das coisas.',
    [
      // trabalho de cuidado
      'pois isso reforça uma construção social enraizada historicamente',
      // preconceito
      'visto que a impunidade reforça a sensação de normalidade em relação a comportamentos discriminatórios',
    ],
    [
      // saúde
      'uma vez que a demanda por serviços básicos ultrapassa a capacidade de atendimento das unidades disponíveis',
      // luto
      'pois a pressão por produtividade não permite tempo adequado para o enfrentamento da dor',
    ],
    'Durkheim fala de papéis sociais moldados por instituições, não pela natureza — isso conecta com trabalho de cuidado (o papel doméstico da mulher é construção social) e preconceito (discursos discriminatórios são reproduzidos socialmente). Saúde e luto, nesses motivos, não tratam da construção social de um papel ou comportamento.'
  ),

  // ── Q5 — Jean-Paul Sartre (encerramento) ───────────────────────────────────
  question(
    'fase-d2-repertorios-bonus-5',
    'Segundo o filósofo Jean-Paul Sartre, o homem é condenado a ser livre, mas essa liberdade só se realiza plenamente quando há reconhecimento mútuo entre os indivíduos.',
    [
      // trabalho de cuidado
      'pois isso reforça uma construção social enraizada historicamente',
      // solidão
      'pois a ausência de vínculos afetivos próximos compromete o bem-estar emocional dessa parcela da população',
    ],
    [
      // meio ambiente
      'uma vez que a falta de agentes de controle permite a expansão de atividades ilegais em áreas protegidas',
      // violência urbana
      'uma vez que a ausência de punição efetiva reforça a sensação de que a violência não terá consequências',
    ],
    'Sartre fala da liberdade que só se realiza com reconhecimento mútuo — isso conecta com trabalho de cuidado (falta de reconhecimento do trabalho da mulher) e solidão (falta de vínculo/reconhecimento social). Meio ambiente e violência urbana, nesses motivos, não tratam de reconhecimento entre indivíduos.'
  ),
];
