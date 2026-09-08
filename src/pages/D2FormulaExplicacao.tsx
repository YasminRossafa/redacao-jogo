import { useNavigate } from 'react-router-dom';
// Same layout as the introdução's formula guide — reuse its stylesheet.
import styles from './FormulaExplicacao.module.css';

const BLOCKS = [
  {
    heading: 'Frase 1 — Problemática + motivo',
    body: 'Abre com um conectivo de segundo argumento (Em segundo lugar, Ademais…), retoma com suas palavras a segunda problemática da introdução e explica, com um conector (porque, pois, visto que, uma vez que…), por que aquilo é um problema.',
  },
  {
    heading: 'Frase 2 — Citação',
    body: 'Traz um dado, um fato ou o pensamento de uma fonte confiável (um filósofo, um estudioso, uma pesquisa) que reforça a problemática apresentada.',
  },
  {
    heading: 'Frase 3 — Argumento',
    body: 'Aprofunda a reflexão sobre o impacto do problema, fechando o parágrafo e mostrando por que ele merece atenção.',
  },
];

export function D2FormulaExplicacao() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Menu
        </button>
        <h1 className={styles.pageTitle}>A fórmula do desenvolvimento 2</h1>
      </header>

      <div className={styles.content}>
        {BLOCKS.map((block, i) => (
          <div key={block.heading} className={styles.card}>
            <h2 className={styles.cardHeading}>
              <span className={styles.cardIndex} aria-hidden>{i + 1}</span>
              {block.heading}
            </h2>
            <p className={styles.cardBody}>{block.body}</p>
          </div>
        ))}

        <button className={styles.cta} onClick={() => navigate('/fase/fase-d2-formula')}>
          Fazer teste →
        </button>
      </div>
    </div>
  );
}
