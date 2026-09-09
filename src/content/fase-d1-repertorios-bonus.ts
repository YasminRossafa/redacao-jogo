import type { ActivityData } from '../engine/types';

// ─── Fase bônus: "Repertórios" — Desenvolvimento 1 ────────────────────────────
// Ramo lateral do Desenvolvimento 1 (não faz parte da trilha sequencial).
//
// Diferente do bônus da Introdução (que ensina a ESCOLHER um repertório/obra),
// este ensina a TRANSFORMAR um dado de texto de apoio em citação: o dado real
// precisa ser reescrito com palavras próprias — nunca copiado literalmente.
//
// São 5 questões, cada uma testando uma técnica de reformulação diferente. O
// painel de regra (D1RepertoriosExplicacao) abre a fase com o exemplo central.

export const faseD1RepertoriosBonusActivities: ActivityData[] = [
  // ── Q1 — ChoiceSelect: usar o complemento do dado ──────────────────────────
  {
    id: 'fase-d1-repertorios-bonus-1',
    kind: 'choice',
    prompt:
      'Texto de apoio: "Segundo uma pesquisa do Datafolha, 70% das mulheres vítimas de violência doméstica não denunciam seus agressores." Qual das opções usa esse dado como citação, sem copiar o texto de apoio?',
    options: [
      {
        id: 'copia',
        text: 'Segundo uma pesquisa do Datafolha, 70% das mulheres vítimas de violência doméstica não denunciam seus agressores.',
      },
      {
        id: 'complemento',
        text: 'Segundo o Datafolha, apenas 30% das vítimas de violência doméstica registram queixa contra o agressor.',
      },
      {
        id: 'generico',
        text: 'A violência doméstica é um problema grave no Brasil.',
      },
      {
        id: 'ordem',
        text: '70% das mulheres vítimas de violência doméstica não denunciam seus agressores, segundo pesquisa.',
      },
    ],
    correctOptionId: 'complemento',
    explanation:
      'A citação correta usa o complemento do dado (30% denunciam, em vez de 70% não denunciam) e reescreve a frase, mantendo a fonte e a informação real. Copiar a frase original, apenas inverter a ordem das palavras ou fazer uma afirmação genérica sem o dado não valem como citação reformulada.',
  },

  // ── Q2 — ErrorSpot (múltiplas respostas): trocar conectivo ou ordem não é reformular ──
  {
    id: 'fase-d1-repertorios-bonus-2',
    kind: 'error-spot',
    prompt:
      'Uma destas tentativas de citação é uma reformulação válida; as outras duas ainda são cópias do texto de apoio. Toque em uma das cópias.',
    contextText:
      'Texto de apoio: "De acordo com o IBGE, menos de 40% dos municípios brasileiros oferecem coleta seletiva de lixo à população."',
    sentences: [
      {
        id: 'reformulada',
        text: 'Segundo o IBGE, a minoria dos municípios do país conta com serviço de coleta seletiva.',
      },
      {
        id: 'so-conectivo',
        text: 'Segundo o IBGE, menos de 40% dos municípios brasileiros oferecem coleta seletiva de lixo à população.',
      },
      {
        id: 'so-ordem',
        text: 'De acordo com o IBGE, à população menos de 40% dos municípios brasileiros oferecem coleta seletiva de lixo.',
      },
    ],
    errorSentenceIds: ['so-conectivo', 'so-ordem'],
    explanation:
      'C2 só trocou o conectivo, mantendo o resto idêntico ao texto de apoio. C3 apenas embaralhou a ordem das palavras — nenhuma das duas é uma reformulação de verdade.',
  },

  // ── Q3 — ChoiceSelect: generalizar o dado numérico com outras palavras ──────
  {
    id: 'fase-d1-repertorios-bonus-3',
    kind: 'choice',
    prompt:
      'Texto de apoio: "Segundo o Conselho Federal de Medicina, municípios do interior contam com menos de um médico para cada mil habitantes." Qual opção reformula esse dado sem copiá-lo?',
    options: [
      {
        id: 'copia',
        text: 'Segundo o Conselho Federal de Medicina, municípios do interior contam com menos de um médico para cada mil habitantes.',
      },
      {
        id: 'generalizada',
        text: 'De acordo com o CFM, a escassez de médicos é mais grave nas regiões afastadas dos grandes centros, chegando a menos de um profissional por mil moradores.',
      },
      {
        id: 'perde-dado',
        text: 'É importante ter mais médicos no interior do Brasil.',
      },
      {
        id: 'ordem',
        text: 'Municípios do interior contam com menos de um médico para cada mil habitantes, segundo o Conselho Federal de Medicina.',
      },
    ],
    correctOptionId: 'generalizada',
    explanation:
      'A citação correta generaliza o dado com outras palavras ("escassez de médicos... nas regiões afastadas"), mas mantém a informação real. Copiar o texto, apenas inverter a ordem das palavras ou perder o dado não são reformulações válidas.',
  },

  // ── Q4 — BuildFromScratch: trocar a estrutura da frase e usar sinônimos ─────
  // 4 fragmentos corretos (na ordem) + 2 distratores que copiam o texto de apoio.
  {
    id: 'fase-d1-repertorios-bonus-4',
    kind: 'build',
    prompt:
      'Texto de apoio: "De acordo com a PNAD, as mulheres dedicam aproximadamente o dobro de horas semanais aos afazeres domésticos em relação aos homens." Monte uma citação reformulada, sem copiar o texto de apoio.',
    fragments: [
      { id: 'f1', text: 'Segundo dados da PNAD',                                    correct: true  },
      { id: 'f2', text: 'o tempo semanal dedicado por mulheres às tarefas do lar',  correct: true  },
      { id: 'f3', text: 'chega a ser duas vezes maior',                             correct: true  },
      { id: 'f4', text: 'do que o dos homens',                                      correct: true  },
      { id: 'd1', text: 'as mulheres dedicam aproximadamente o dobro de horas semanais', correct: false },
      { id: 'd2', text: 'aos afazeres domésticos em relação aos homens',           correct: false },
    ],
    acceptedOrders: [['f1', 'f2', 'f3', 'f4']],
  },

  // ── Q5 — ErrorSpot (resposta única) — encerramento: reforça a regra central ─
  {
    id: 'fase-d1-repertorios-bonus-5',
    kind: 'error-spot',
    prompt:
      'A tentativa de citação abaixo ainda é uma cópia do texto de apoio. Toque na frase que NÃO é uma reformulação válida.',
    contextText:
      'Texto de apoio: "Segundo o Fórum Brasileiro de Segurança Pública, a maior parte dos homicídios no país ocorre em bairros com baixa presença policial."',
    sentences: [
      {
        id: 'copia',
        text: 'Segundo o Fórum Brasileiro de Segurança Pública, a maioria dos homicídios no país acontece em bairros com baixa presença policial.',
      },
    ],
    errorSentenceIds: ['copia'],
    explanation:
      'Trocar só uma ou duas palavras ("maior parte" por "maioria", "ocorre" por "acontece") não é reformular — o resto da frase continua praticamente idêntico ao texto de apoio. É preciso mudar a estrutura da frase, não só o vocabulário pontual.',
  },
];
