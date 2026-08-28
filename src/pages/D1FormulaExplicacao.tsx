import { useNavigate } from 'react-router-dom';
// Same layout as the introdução's formula guide — reuse its stylesheet.
import styles from './FormulaExplicacao.module.css';

const BLOCKS = [
  {
    heading: 'Frase 1 — Problemática + motivo',
    body: 'Abre com um conectivo de primeiro argumento (Primeiramente, Em primeiro lugar…), retoma com suas palavras a primeira problemática da introdução e explica, com um conector (porque, pois, uma vez que…), por que aquilo é um problema.',
  },
  {
    heading: 'Frase 2 — Citação',
    body: 'Traz um dado ou fato de uma fonte confiável (IBGE, MEC, uma ONG, uma universidade) que reforça a problemática apresentada.',
  },
  {
    heading: 'Frase 3 — Argumento',
    body: 'Aprofunda a reflexão sobre o impacto do problema, fechando o parágrafo e mostrando por que ele merece atenção.',
  },
];

export function D1FormulaExplicacao() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Menu
        </button>
        <h1 className={styles.pageTitle}>A fórmula do desenvolvimento 1</h1>
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

        <button className={styles.cta} onClick={() => navigate('/fase/fase-d1-formula')}>
          Fazer teste →
        </button>
      </div>
    </div>
  );
}
