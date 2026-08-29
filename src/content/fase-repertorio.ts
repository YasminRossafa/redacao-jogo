import type { ActivityData } from '../engine/types';
import { TEMA_BANK, EXTRA_DISTRACTOR_REPERTORIOS } from './shared-bank';

// Helpers — looked up once so the activity definitions below stay readable.
const rep = (id: string) => TEMA_BANK.find((e) => e.id === id)!.repertorio;
const tema = (id: string) => TEMA_BANK.find((e) => e.id === id)!.tema;
const extra = (id: string) => EXTRA_DISTRACTOR_REPERTORIOS.find((e) => e.id === id)!.text;

export const faseRepertorioActivities: ActivityData[] = [
  // ── 6 × ChoiceActivity ───────────────────────────────────────────────────
  // "Qual repertório se encaixa melhor no tema?"
  // correct option = the bank entry for that tema; 3 distractors from other entries.

  {
    id: 'fase-repertorio-choice-1',
    kind: 'choice',
    prompt: `Para o tema "${tema('saude')}", qual repertório se encaixa melhor?`,
    options: [
      { id: 'saude',         text: rep('saude') },
      { id: 'meioambiente',  text: rep('meioambiente') },
      { id: 'preconceito',   text: rep('preconceito') },
      { id: 'violenciaurbana', text: rep('violenciaurbana') },
    ],
    correctOptionId: 'saude',
    explanation:
      'Grey\'s Anatomy retrata a escassez de recursos hospitalares e a pressão sobre profissionais de saúde, contexto diretamente ligado aos desafios do acesso à saúde pública.',
  },

  {
    id: 'fase-repertorio-choice-2',
    kind: 'choice',
    prompt: `Para o tema "${tema('preconceito')}", qual repertório se encaixa melhor?`,
    options: [
      { id: 'preconceito',  text: rep('preconceito') },
      { id: 'saude',        text: rep('saude') },
      { id: 'meioambiente', text: rep('meioambiente') },
      { id: 'solidao',      text: rep('solidao') },
    ],
    correctOptionId: 'preconceito',
    explanation:
      'O Patinho Feio ilustra a rejeição por não corresponder a padrões do grupo, metáfora direta do preconceito e da exclusão social que o tema propõe discutir.',
  },

  {
    id: 'fase-repertorio-choice-3',
    kind: 'choice',
    prompt: `Para o tema "${tema('meioambiente')}", qual repertório se encaixa melhor?`,
    options: [
      { id: 'meioambiente', text: rep('meioambiente') },
      { id: 'luto',         text: rep('luto') },
      { id: 'saude',        text: rep('saude') },
      { id: 'solidao',      text: rep('solidao') },
    ],
    correctOptionId: 'meioambiente',
    explanation:
      'WALL-E retrata as consequências do consumo desenfreado e do descarte irresponsável, tornando-o referência clara para introduzir os desafios ambientais.',
  },

  {
    id: 'fase-repertorio-choice-4',
    kind: 'choice',
    prompt: `Para o tema "${tema('violenciaurbana')}", qual repertório se encaixa melhor?`,
    options: [
      { id: 'violenciaurbana', text: rep('violenciaurbana') },
      { id: 'zootopia',        text: extra('zootopia') },
      { id: 'luto',            text: rep('luto') },
      { id: 'meioambiente',    text: rep('meioambiente') },
    ],
    correctOptionId: 'violenciaurbana',
    explanation:
      'The Walking Dead mostra como a ausência de ordem leva à violência generalizada, espelhando a discussão sobre insegurança e criminalidade nas cidades brasileiras.',
  },

  {
    id: 'fase-repertorio-choice-5',
    kind: 'choice',
    prompt: `Para o tema "${tema('solidao')}", qual repertório se encaixa melhor?`,
    options: [
      { id: 'solidao',        text: rep('solidao') },
      { id: 'fma',            text: extra('fma') },
      { id: 'violenciaurbana', text: rep('violenciaurbana') },
      { id: 'saude',          text: rep('saude') },
    ],
    correctOptionId: 'solidao',
    explanation:
      'Up retrata o isolamento de Carl após a perda da esposa, evidenciando o impacto emocional e social da solidão — especialmente na velhice, foco central do tema.',
  },

  {
    id: 'fase-repertorio-choice-6',
    kind: 'choice',
    prompt: `Para o tema "${tema('luto')}", qual repertório se encaixa melhor?`,
    options: [
      { id: 'luto',           text: rep('luto') },
      { id: 'oextraordinario', text: extra('oextraordinario') },
      { id: 'preconceito',    text: rep('preconceito') },
      { id: 'meioambiente',   text: rep('meioambiente') },
    ],
    correctOptionId: 'luto',
    explanation:
      'Divertida Mente explora o processamento emocional da tristeza e da perda, tornando-o repertório pertinente para introduzir os desafios do acolhimento de pessoas enlutadas.',
  },

  // ── 4 × ErrorSpotActivity ─────────────────────────────────────────────────
  // "Qual desses repertórios NÃO se encaixa no tema?"
  // Each set has 3 sentences: the correct one (fits), the flagged wrong one,
  // and one extra distractor (present but not flagged as the error).

  {
    id: 'fase-repertorio-error-1',
    kind: 'error-spot',
    prompt: `Para o tema "${tema('preconceito')}", qual desses repertórios NÃO se encaixa?`,
    sentences: [
      { id: 'fits',  text: rep('preconceito') },
      { id: 'wrong', text: rep('meioambiente') },
      { id: 'extra', text: extra('oextraordinario') },
    ],
    errorSentenceIds: ['wrong'],
    explanation:
      'WALL-E trata de consumo e meio ambiente, sem relação com preconceito ou exclusão social.',
  },

  {
    id: 'fase-repertorio-error-2',
    kind: 'error-spot',
    prompt: `Para o tema "${tema('saude')}", qual desses repertórios NÃO se encaixa?`,
    sentences: [
      { id: 'fits',  text: rep('saude') },
      { id: 'wrong', text: rep('violenciaurbana') },
      { id: 'extra', text: rep('solidao') },
    ],
    errorSentenceIds: ['wrong'],
    explanation:
      'The Walking Dead trata da desintegração social após um apocalipse zumbi, sem relação direta com acesso à saúde.',
  },

  {
    id: 'fase-repertorio-error-3',
    kind: 'error-spot',
    prompt: `Para o tema "${tema('meioambiente')}", qual desses repertórios NÃO se encaixa?`,
    // Two independently valid answers: both fail to fit the meio ambiente theme,
    // for different reasons — hence two entries in errorSentenceIds.
    sentences: [
      { id: 'fits',             text: rep('meioambiente') },
      { id: 'wrong-zootopia',   text: extra('zootopia') },
      { id: 'wrong-greysanatomy', text: rep('saude') },
    ],
    errorSentenceIds: ['wrong-zootopia', 'wrong-greysanatomy'],
    explanation:
      "Nenhum dos dois se encaixa no tema de meio ambiente. Zootopia trata de preconceito e discriminação — é tema errado. Grey's Anatomy trata da escassez de recursos na saúde: conecta-se a outro tema válido, mas não ao meio ambiente.",
  },

  {
    id: 'fase-repertorio-error-4',
    kind: 'error-spot',
    prompt: `Para o tema "${tema('violenciaurbana')}", qual desses repertórios NÃO se encaixa?`,
    sentences: [
      { id: 'fits',  text: rep('violenciaurbana') },
      { id: 'wrong', text: rep('solidao') },
      { id: 'extra', text: extra('zootopia') },
    ],
    errorSentenceIds: ['wrong'],
    explanation:
      'Up trata de luto e solidão na velhice, sem relação direta com violência urbana.',
  },
];
