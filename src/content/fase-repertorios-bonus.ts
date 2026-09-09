import type { ActivityData } from '../engine/types';

// ─── Fase bônus: "Repertórios" ────────────────────────────────────────────────
// Ramo lateral da Introdução (não faz parte da trilha sequencial).
//
// Dez OrderPuzzle organizados em CINCO temas, cada um com DUAS versões (A e B).
// Para um mesmo tema, a ponte (tema + Brasil) e as problemáticas são IDÊNTICAS
// nas duas versões — só muda a frase do repertório. A ideia é mostrar ao aluno
// que mais de um repertório válido serve à mesma introdução.
//
// Cada questão traz ainda 1 distrator (uma frase de OUTRO tema) que não se
// encaixa em nenhuma posição: colocá-lo desloca um item obrigatório e reprova a
// conferência (mecânica padrão de `distractors` do OrderPuzzle).

interface Tema {
  /** Ponte tema + Brasil — compartilhada pelas versões A e B do tema. */
  ponte: string;
  /** Problemáticas — compartilhadas pelas versões A e B do tema. */
  prob: string;
}

const TEMAS = {
  preconceito: {
    ponte:
      'Fora da ficção, os desafios para a superação do preconceito e da exclusão social na sociedade brasileira ainda se mostram evidentes.',
    prob:
      'Dois problemas desse tema são a naturalização de discursos discriminatórios, além da ausência de punição a atos de exclusão.',
  },
  meioambiente: {
    ponte:
      'Fora da ficção, os desafios para a preservação do meio ambiente na sociedade brasileira também se mostram urgentes.',
    prob:
      'Dois problemas desse tema são o descarte inadequado de resíduos, além da fiscalização insuficiente contra o desmatamento.',
  },
  violenciaurbana: {
    ponte:
      'Fora da ficção, os desafios para o combate à violência urbana na sociedade brasileira comprometem a sensação de segurança da população.',
    prob:
      'Dois problemas desse tema são a ausência de policiamento em áreas periféricas, além da impunidade de crimes violentos.',
  },
  solidao: {
    ponte:
      'Fora da ficção, os desafios para o enfrentamento da solidão e do isolamento social na sociedade brasileira atingem principalmente a população idosa.',
    prob:
      'Dois problemas desse tema são a falta de espaços de convívio comunitário, além do abandono familiar de idosos.',
  },
  manipulacao: {
    ponte:
      'Fora da ficção, os desafios para o combate à manipulação da informação na sociedade brasileira comprometem o acesso da população à verdade.',
    prob:
      'Dois problemas desse tema são a disseminação de notícias falsas nas redes sociais, além da dificuldade de verificar a veracidade das informações.',
  },
} satisfies Record<string, Tema>;

const PROMPT =
  'Monte a introdução na ordem correta: repertório → contextualização (tema + Brasil) → problematização. Atenção: uma das frases é de outro tema e não se encaixa em nenhuma posição.';

/** Builds one 3-slot OrderPuzzle: repertório → ponte → problemáticas, plus a
 *  single pool-only distractor that fits nowhere. */
function question(
  id: string,
  temaKey: keyof typeof TEMAS,
  repertorio: string,
  distractor: string
): ActivityData {
  const t = TEMAS[temaKey];
  return {
    id,
    kind: 'order',
    prompt: PROMPT,
    items: [
      { id: 'rep', label: repertorio },
      { id: 'ponte', label: t.ponte },
      { id: 'prob', label: t.prob },
    ],
    distractors: [{ id: 'distr', label: distractor }],
  };
}

export const faseRepertoriosBonusActivities: ActivityData[] = [
  // ── Tema 1 — Preconceito ───────────────────────────────────────────────────
  // A: conto de fadas
  question(
    'fase-repertorios-bonus-1',
    'preconceito',
    "No conto 'O Patinho Feio', o protagonista sofre rejeição do grupo por não corresponder aos padrões estéticos esperados.",
    "No filme 'WALL-E', a Terra é retratada como um planeta abandonado e coberto de lixo após décadas de consumo desenfreado."
  ),
  // B: desenho Disney
  question(
    'fase-repertorios-bonus-2',
    'preconceito',
    "No filme 'Zootopia', a coelha Judy Hopps enfrenta preconceito por parte de outros animais que duvidam de sua capacidade de ser policial apenas por ela pertencer a uma espécie considerada frágil.",
    "No livro 'O Pequeno Príncipe', de Antoine de Saint-Exupéry, a raposa relata sua solidão até ser cativada por alguém que se torna especial para ela."
  ),

  // ── Tema 2 — Meio ambiente ─────────────────────────────────────────────────
  // A: filme
  question(
    'fase-repertorios-bonus-3',
    'meioambiente',
    "No filme 'WALL-E', a Terra é retratada como um planeta abandonado e coberto de lixo após décadas de consumo desenfreado.",
    "No conto 'O Patinho Feio', o protagonista sofre rejeição do grupo por não corresponder aos padrões estéticos esperados."
  ),
  // B: livro infantil
  question(
    'fase-repertorios-bonus-4',
    'meioambiente',
    "No livro 'O Lorax', de Dr. Seuss, uma fábrica destrói progressivamente a natureza ao redor em nome do lucro, até que não resta nenhuma árvore na região.",
    "No livro 'Cidade de Deus', de Paulo Lins, jovens de uma comunidade carioca crescem cercados pela violência armada e pela ausência do poder público."
  ),

  // ── Tema 3 — Violência urbana ──────────────────────────────────────────────
  // A: série
  question(
    'fase-repertorios-bonus-5',
    'violenciaurbana',
    "Na série 'The Walking Dead', a sociedade civil se desintegra diante do caos, e a violência entre sobreviventes se torna rotina diante da ausência de ordem.",
    "No filme 'Zootopia', a coelha Judy Hopps enfrenta preconceito por parte de outros animais que duvidam de sua capacidade de ser policial."
  ),
  // B: clássico brasileiro
  question(
    'fase-repertorios-bonus-6',
    'violenciaurbana',
    "No livro 'Cidade de Deus', de Paulo Lins, jovens de uma comunidade carioca crescem cercados pela violência armada e pela ausência do poder público.",
    "No livro 'O Lorax', de Dr. Seuss, uma fábrica destrói progressivamente a natureza ao redor em nome do lucro."
  ),

  // ── Tema 4 — Solidão ───────────────────────────────────────────────────────
  // A: filme
  question(
    'fase-repertorios-bonus-7',
    'solidao',
    "No filme 'Up: Altas Aventuras', o personagem Carl isola-se do mundo após a perda da esposa, evidenciando o impacto da solidão na velhice.",
    "No livro '1984', de George Orwell, o governo totalitário manipula a verdade e reescreve a história para manter o controle sobre a população."
  ),
  // B: clássico francês
  question(
    'fase-repertorios-bonus-8',
    'solidao',
    "No livro 'O Pequeno Príncipe', de Antoine de Saint-Exupéry, a raposa relata sua solidão até ser cativada por alguém que se torna especial para ela, evidenciando como os vínculos afetivos combatem o isolamento.",
    "No filme 'V de Vingança', um regime autoritário controla a mídia e distorce informações para manipular a opinião pública."
  ),

  // ── Tema 5 — Manipulação da informação ─────────────────────────────────────
  // A: distopia clássica
  question(
    'fase-repertorios-bonus-9',
    'manipulacao',
    "No livro '1984', de George Orwell, o governo totalitário manipula a verdade e reescreve a história para manter o controle sobre a população.",
    "No filme 'Up: Altas Aventuras', o personagem Carl isola-se do mundo após a perda da esposa, evidenciando o impacto da solidão na velhice."
  ),
  // B: distopia gráfica — questão de encerramento da fase
  question(
    'fase-repertorios-bonus-10',
    'manipulacao',
    "No filme 'V de Vingança', um regime autoritário controla a mídia e distorce informações para manipular a opinião pública.",
    "Na série 'The Walking Dead', a sociedade civil se desintegra diante do caos, e a violência entre sobreviventes se torna rotina diante da ausência de ordem."
  ),
];
