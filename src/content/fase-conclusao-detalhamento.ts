import type { ActivityData } from '../engine/types';

// Conclusão — o DETALHAMENTO da proposta de intervenção: um exemplo ou
// aprofundamento concreto ("em detalhe", "isto é", "como, por exemplo", "ou
// seja"), somado ao conectivo + agente + ação + modo/meio + finalidade já
// vistos. Isso completa a proposta inteira (falta só a retomada, próximo e
// último elemento). Erro comum: repetir a finalidade ou o modo/meio em vez de
// dar um detalhe concreto — por isso vários distratores reafirmam esses
// elementos anteriores.

export const faseConclusaoDetalhamentoActivities: ActivityData[] = [
  // ── Q1 — ChoiceSelect: detalhamento concreto vs. repetir finalidade/modo (saúde) ─
  {
    id: 'fase-conclusao-detalhamento-1',
    kind: 'choice',
    prompt:
      "Qual opção detalha adequadamente, com um exemplo concreto, a proposta de 'investir em infraestrutura hospitalar... com a finalidade de reduzir a sobrecarga das unidades de saúde'?",
    options: [
      { id: 'q1-b', text: 'Com a finalidade de melhorar o atendimento.' },
      { id: 'q1-a', text: 'Em detalhe, é urgente ampliar o número de leitos e equipes médicas em regiões afastadas dos grandes centros.' },
      { id: 'q1-c', text: 'Por meio de mais recursos financeiros.' },
      { id: 'q1-d', text: 'Todavia, isso é difícil de implementar.' },
    ],
    correctOptionId: 'q1-a',
    explanation:
      'O detalhamento traz um exemplo ou aprofundamento concreto da proposta — aqui, ampliar leitos e equipes em regiões afastadas. "Com a finalidade de melhorar o atendimento" repete a finalidade; "por meio de mais recursos financeiros" repete o modo/meio; e "todavia, isso é difícil" não detalha nada.',
  },

  // ── Q2 — ChoiceSelect: detalhamento concreto vs. repetir finalidade/modo (violência) ─
  {
    id: 'fase-conclusao-detalhamento-2',
    kind: 'choice',
    prompt:
      "Qual opção detalha adequadamente, com um exemplo concreto, a proposta de 'ampliar o policiamento comunitário... com o objetivo de reduzir os índices de criminalidade'?",
    options: [
      { id: 'q2-b', text: 'Com o objetivo de tornar as ruas mais seguras.' },
      { id: 'q2-c', text: 'Por meio de mais policiais nas ruas.' },
      { id: 'q2-a', text: 'Como, por exemplo, o investimento em câmeras de monitoramento e iluminação pública.' },
      { id: 'q2-d', text: 'Apesar disso, a criminalidade é complexa.' },
    ],
    correctOptionId: 'q2-a',
    explanation:
      'O detalhamento traz um exemplo concreto — aqui, câmeras de monitoramento e iluminação pública. "Com o objetivo de tornar as ruas mais seguras" repete a finalidade; "por meio de mais policiais nas ruas" repete o modo/meio; e "apesar disso, a criminalidade é complexa" não detalha nada.',
  },

  // ── Q3 — ErrorSpot (single): finalidade disfarçada de detalhamento (solidão) ─
  // Only one of the candidate continuations is NOT a detalhamento — it is a
  // finalidade in disguise, and that is the error to spot.
  {
    id: 'fase-conclusao-detalhamento-3',
    kind: 'error-spot',
    prompt:
      'As frases abaixo deveriam detalhar, com um exemplo concreto, a proposta sobre solidão. Uma delas, na verdade, é uma nova finalidade. Toque na frase com o problema.',
    contextText:
      'Logo, as secretarias municipais de assistência social devem criar centros de convivência para idosos... com a finalidade de reduzir o isolamento social.',
    sentences: [
      { id: 'q3-s1', text: 'para que os idosos se sintam mais acolhidos' },
      { id: 'q3-s2', text: 'isto é, promover atividades recreativas e encontros intergeracionais regulares' },
      { id: 'q3-s3', text: 'em detalhe, oferecer oficinas culturais e acompanhamento psicológico' },
    ],
    errorSentenceIds: ['q3-s1'],
    explanation:
      "Essa frase é uma nova finalidade disfarçada ('para que...'), não um detalhe concreto da ação proposta.",
  },

  // ── Q4 — ErrorSpot (multiple): dois detalhamentos errados (trabalho de cuidado) ─
  {
    id: 'fase-conclusao-detalhamento-4',
    kind: 'error-spot',
    prompt:
      'Tema: trabalho de cuidado. Só uma das frases abaixo é um detalhamento concreto; as outras duas estão erradas — toque em uma frase que NÃO detalha a proposta.',
    contextText:
      'A proposta é "criar campanhas nacionais de conscientização". O detalhamento deve trazer um exemplo concreto — não repetir a finalidade nem o modo/meio.',
    sentences: [
      { id: 'q4-a1', text: 'isto é, promover debates nas escolas e empresas sobre a divisão igualitária das tarefas' },
      { id: 'q4-a2', text: 'para que a desigualdade de gênero diminua' },
      { id: 'q4-a3', text: 'através de mais parcerias com emissoras de televisão' },
    ],
    errorSentenceIds: ['q4-a2', 'q4-a3'],
    explanation:
      '"Para que a desigualdade de gênero diminua" repete a finalidade, e "através de mais parcerias com emissoras de televisão" repete o modo/meio. Só "isto é, promover debates nas escolas e empresas..." traz um detalhamento concreto.',
  },

  // ── Q5 — TagMatch (bijective): tema → detalhamento correto ──────────────────
  {
    id: 'fase-conclusao-detalhamento-5',
    kind: 'tag-match',
    prompt: 'Associe cada tema ao detalhamento que completa corretamente a sua proposta de intervenção.',
    sentences: [
      { id: 'q5-s1', text: 'Em detalhe, é urgente ampliar o número de leitos e equipes médicas em regiões afastadas dos grandes centros.' },
      { id: 'q5-s2', text: 'Como, por exemplo, o investimento em câmeras de monitoramento e iluminação pública.' },
      { id: 'q5-s3', text: 'Isto é, promover atividades recreativas e encontros intergeracionais regulares.' },
      { id: 'q5-s4', text: 'Isto é, promover debates nas escolas e empresas sobre a divisão igualitária das tarefas.' },
    ],
    tags: [
      { id: 'saude',     label: 'Saúde' },
      { id: 'violencia', label: 'Violência urbana' },
      { id: 'solidao',   label: 'Solidão' },
      { id: 'cuidado',   label: 'Trabalho de cuidado' },
    ],
    mapping: {
      'q5-s1': 'saude',
      'q5-s2': 'violencia',
      'q5-s3': 'solidao',
      'q5-s4': 'cuidado',
    },
  },

  // ── Q6 — TagMatch (many-to-few): detalhamento concreto vs. repete finalidade/modo ─
  {
    id: 'fase-conclusao-detalhamento-6',
    kind: 'tag-match',
    prompt:
      'Classifique cada frase: ela traz um detalhamento concreto (correto) ou apenas repete a finalidade ou o modo/meio (errado)?',
    sentences: [
      { id: 'q6-s1', text: 'Em detalhe, ampliar o número de leitos em regiões afastadas.' },
      { id: 'q6-s2', text: 'Com a finalidade de melhorar a saúde.' },
      { id: 'q6-s3', text: 'Como, por exemplo, câmeras de monitoramento.' },
      { id: 'q6-s4', text: 'Por meio de mais policiamento.' },
      { id: 'q6-s5', text: 'Isto é, promover encontros intergeracionais regulares.' },
      { id: 'q6-s6', text: 'Para que os idosos se sintam acolhidos.' },
      { id: 'q6-s7', text: 'Isto é, promover debates nas escolas sobre divisão de tarefas.' },
      { id: 'q6-s8', text: 'Através de mais parcerias com a mídia.' },
    ],
    tags: [
      { id: 'correto', label: 'Detalhamento concreto — correto' },
      { id: 'errado',  label: 'Repete finalidade ou modo — errado' },
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

  // ── Q7 — BuildFromScratch: proposta inteira até o detalhamento (saúde) ──────
  {
    id: 'fase-conclusao-detalhamento-7',
    kind: 'build',
    prompt: 'Tema "saúde": monte a proposta de intervenção inteira (conectivo + agente + ação + modo/meio + finalidade + detalhamento) na ordem correta.',
    fragments: [
      { id: 'q7-f1', text: 'Portanto',                                                                                    correct: true  },
      { id: 'q7-f2', text: 'o Ministério da Saúde deve investir em infraestrutura hospitalar',                            correct: true  },
      { id: 'q7-f3', text: 'por meio da destinação de verba específica para a contratação de novos profissionais',       correct: true  },
      { id: 'q7-f4', text: 'com a finalidade de reduzir a sobrecarga das unidades de saúde',                             correct: true  },
      { id: 'q7-f5', text: 'Em detalhe, é urgente ampliar o número de leitos e equipes médicas em regiões afastadas dos grandes centros', correct: true },
      { id: 'q7-d1', text: 'sem qualquer relação com hospitais',                                                          correct: false },
      { id: 'q7-d2', text: 'e os médicos ficarão satisfeitos',                                                           correct: false },
    ],
    acceptedOrders: [['q7-f1', 'q7-f2', 'q7-f3', 'q7-f4', 'q7-f5']],
  },

  // ── Q8 — BuildFromScratch: proposta inteira até o detalhamento (violência) ──
  {
    id: 'fase-conclusao-detalhamento-8',
    kind: 'build',
    prompt: 'Tema "violência urbana": monte a proposta de intervenção inteira (conectivo + agente + ação + modo/meio + finalidade + detalhamento) na ordem correta.',
    fragments: [
      { id: 'q8-f1', text: 'Assim',                                                                                      correct: true  },
      { id: 'q8-f2', text: 'as secretarias estaduais de segurança pública devem ampliar o policiamento comunitário',    correct: true  },
      { id: 'q8-f3', text: 'por meio da criação de bases fixas em bairros periféricos',                                 correct: true  },
      { id: 'q8-f4', text: 'com o objetivo de reduzir os índices de criminalidade nessas regiões',                     correct: true  },
      { id: 'q8-f5', text: 'Como, por exemplo, o investimento em câmeras de monitoramento e iluminação pública',        correct: true  },
      { id: 'q8-d1', text: 'sem qualquer relação com a criminalidade',                                                  correct: false },
      { id: 'q8-d2', text: 'e a comunidade ficará satisfeita',                                                          correct: false },
    ],
    acceptedOrders: [['q8-f1', 'q8-f2', 'q8-f3', 'q8-f4', 'q8-f5']],
  },
];
