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
  /** The problemáticas decorrentes desse tema. */
  problematica: string;
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
