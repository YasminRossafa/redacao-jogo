// Shared content bank — reusable across the introdução phases (repertório,
// tema+Brasil, problemáticas) so the same temas can seed activities and act as
// each other's distractors. One entry per tema.

export interface TemaBankEntry {
  id: string;
  /** The tema/proposta statement. */
  tema: string;
  /** Repertório sociocultural that opens the introdução for this tema. */
  repertorio: string;
  /** The tema contextualized in Brazilian society. */
  temaBrasil: string;
  /** The problemáticas decorrentes desse tema (full sentence — used in OrderActivity). */
  problematica: string;
  /** First problem clause only, no trailing connective. */
  problematica1: string;
  /** Second problem clause WITH its leading connective ("e"/"além de") attached. */
  problematica2: string;
  /**
   * Full D1 paragraph for this tema, split into its three sentences:
   * problema+motivo, citação, and argumento. Reusable across the D1 phases.
   * Statistics are illustrative/plausible (matching the game's existing style),
   * not verified figures.
   */
  d1: { problema: string; citacao: string; argumento: string };
}

export const TEMA_BANK: TemaBankEntry[] = [
  {
    id: 'saude',
    tema: 'Desafios para a garantia do acesso à saúde pública no Brasil',
    repertorio:
      'Na série "Grey\'s Anatomy", médicos enfrentam diariamente decisões urgentes em meio à escassez de recursos hospitalares.',
    temaBrasil:
      'Nesse sentido, os desafios para a garantia do acesso à saúde pública na sociedade brasileira revelam-se um obstáculo à qualidade de vida da população.',
    problematica:
      'A escassez de profissionais em regiões afastadas e a superlotação das unidades de saúde são problemas decorrentes desse tema.',
    problematica1: 'A escassez de profissionais em regiões afastadas',
    problematica2: 'e a superlotação das unidades de saúde',
    d1: {
      problema:
        'Em primeiro lugar, destaca-se a escassez de profissionais de saúde em regiões afastadas do país, uma vez que grande parte dos médicos concentra-se nos grandes centros urbanos.',
      citacao:
        'Segundo dados do Conselho Federal de Medicina, municípios do interior contam com menos de um médico para cada mil habitantes.',
      argumento:
        'Desse modo, a ausência de atendimento próximo obriga a população a percorrer longas distâncias em busca de cuidados básicos, agravando quadros que poderiam ser tratados precocemente.',
    },
  },
  {
    id: 'preconceito',
    tema: 'Desafios para a superação do preconceito e da exclusão social no Brasil',
    repertorio:
      'No conto "O Patinho Feio", o protagonista sofre rejeição do grupo por não corresponder aos padrões estéticos esperados.',
    temaBrasil:
      'Diante disso, os desafios para a superação do preconceito e da exclusão social na sociedade brasileira ainda se mostram evidentes.',
    problematica:
      'A naturalização de discursos discriminatórios e a ausência de punição a atos de exclusão são problemas decorrentes desse tema.',
    problematica1: 'A naturalização de discursos discriminatórios',
    problematica2: 'e a ausência de punição a atos de exclusão',
    d1: {
      problema:
        'Em primeira análise, destaca-se a naturalização de discursos discriminatórios no cotidiano da sociedade brasileira, pois esses discursos são frequentemente tratados como brincadeira ou opinião pessoal.',
      citacao:
        'Segundo pesquisa do Instituto Locomotiva, mais de 70% dos brasileiros já presenciaram algum tipo de discriminação em ambientes públicos.',
      argumento:
        'Desse modo, a banalização desses discursos contribui para a manutenção de estigmas sociais, dificultando a construção de uma convivência verdadeiramente inclusiva.',
    },
  },
  {
    id: 'meioambiente',
    tema: 'Desafios para a preservação do meio ambiente no Brasil',
    repertorio:
      'No filme "WALL-E", a Terra é retratada como um planeta abandonado e coberto de lixo após décadas de consumo desenfreado.',
    temaBrasil:
      'Fora da ficção, os desafios para a preservação do meio ambiente na sociedade brasileira também se mostram urgentes.',
    problematica:
      'O descarte inadequado de resíduos e a fiscalização insuficiente contra o desmatamento são problemas decorrentes desse tema.',
    problematica1: 'O descarte inadequado de resíduos',
    problematica2: 'e a fiscalização insuficiente contra o desmatamento',
    d1: {
      problema:
        'Primeiramente, destaca-se o descarte inadequado de resíduos como um dos principais entraves à preservação ambiental no Brasil, uma vez que grande parte dos municípios ainda não conta com coleta seletiva eficiente.',
      citacao:
        'Segundo dados do IBGE, menos de 40% dos municípios brasileiros oferecem coleta seletiva de lixo à população.',
      argumento:
        'Desse modo, a ausência de uma destinação correta dos resíduos contribui para a poluição de rios e solos, comprometendo ecossistemas inteiros.',
    },
  },
  {
    id: 'violenciaurbana',
    tema: 'Desafios para o combate à violência urbana no Brasil',
    repertorio:
      'Na série "The Walking Dead", a sociedade civil se desintegra diante do caos, e a violência entre sobreviventes se torna rotina diante da ausência de ordem.',
    temaBrasil:
      'Assim como na série, os desafios para o combate à violência urbana na sociedade brasileira comprometem a sensação de segurança da população.',
    problematica:
      'A ausência de policiamento em áreas periféricas e a impunidade de crimes violentos são problemas decorrentes desse tema.',
    problematica1: 'A ausência de policiamento em áreas periféricas',
    problematica2: 'e a impunidade de crimes violentos',
    d1: {
      problema:
        'Em primeiro lugar, destaca-se a ausência de policiamento em áreas periféricas como um dos principais fatores que agravam a violência urbana, uma vez que essas regiões recebem menos investimento em segurança pública.',
      citacao:
        'Segundo dados do Fórum Brasileiro de Segurança Pública, a maior parte dos homicídios no país ocorre em bairros com baixa presença policial.',
      argumento:
        'Desse modo, a desigualdade na distribuição da segurança pública aprofunda a sensação de abandono nessas comunidades, perpetuando o ciclo de violência.',
    },
  },
  {
    id: 'solidao',
    tema: 'Desafios para o enfrentamento da solidão e do isolamento social no Brasil',
    repertorio:
      'No filme "Up: Altas Aventuras", o personagem Carl isola-se do mundo após a perda da esposa, evidenciando o impacto da solidão na velhice.',
    temaBrasil:
      'Fora da ficção, os desafios para o enfrentamento da solidão e do isolamento social na sociedade brasileira atingem principalmente a população idosa.',
    problematica:
      'A falta de espaços de convívio comunitário e o abandono familiar de idosos são problemas decorrentes desse tema.',
    problematica1: 'A falta de espaços de convívio comunitário',
    problematica2: 'e o abandono familiar de idosos',
    d1: {
      problema:
        'Em primeira análise, destaca-se a falta de espaços de convívio comunitário como um entrave ao bem-estar da população idosa, pois muitos bairros não oferecem locais adequados para a socialização dessa faixa etária.',
      citacao:
        'Segundo dados do IBGE, mais de 30% dos idosos brasileiros vivem sozinhos, sem contato regular com familiares ou vizinhos.',
      argumento:
        'Desse modo, a ausência de convívio social contribui para o agravamento de quadros de solidão, afetando diretamente a saúde emocional dessa população.',
    },
  },
  {
    id: 'luto',
    tema: 'Desafios para o acolhimento emocional de pessoas enlutadas no Brasil',
    repertorio:
      'No filme "Divertida Mente", a personagem Riley enfrenta dificuldades emocionais ao processar uma mudança brusca em sua vida, revelando a complexidade do luto e da tristeza.',
    temaBrasil:
      'Nesse contexto, os desafios para o acolhimento emocional de pessoas enlutadas na sociedade brasileira ainda carecem de atenção adequada.',
    problematica:
      'A escassez de suporte psicológico gratuito e o silenciamento do luto no ambiente de trabalho são problemas decorrentes desse tema.',
    problematica1: 'A escassez de suporte psicológico gratuito',
    problematica2: 'e o silenciamento do luto no ambiente de trabalho',
    d1: {
      problema:
        'Primeiramente, destaca-se a escassez de suporte psicológico gratuito para pessoas enlutadas, uma vez que o sistema público de saúde ainda não prioriza esse tipo de atendimento.',
      citacao:
        'Segundo dados do Conselho Federal de Psicologia, a maior parte dos municípios brasileiros não conta com atendimento psicológico gratuito voltado ao luto.',
      argumento:
        'Desse modo, a falta de acompanhamento adequado prolonga o sofrimento das famílias enlutadas, dificultando a retomada da rotina após a perda.',
    },
  },
];

// Repertórios not tied to any tema — used only as wrong answers (distractors).
export interface DistractorRepertorio {
  id: string;
  text: string;
}

export const EXTRA_DISTRACTOR_REPERTORIOS: DistractorRepertorio[] = [
  {
    id: 'zootopia',
    text:
      'No filme "Zootopia", a personagem Judy Hopps enfrenta discriminação por pertencer a um grupo visto como incapaz para certas funções.',
  },
  {
    id: 'fma',
    text:
      'No anime "Fullmetal Alchemist", alquimistas que praticam a alquimia humana são marginalizados e temidos pela sociedade.',
  },
  {
    id: 'oextraordinario',
    text:
      'No livro "O Extraordinário", um garoto com deficiência física enfrenta exclusão no ambiente escolar.',
  },
];
