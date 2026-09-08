import { useNavigate } from 'react-router-dom';
// Same layout as the introdução's formula guide — reuse its stylesheet.
import styles from './FormulaExplicacao.module.css';

const BLOCKS = [
  {
    heading: 'Agente + ação',
    body: 'Abra com um conectivo conclusivo (Portanto, Assim, Dessa forma…) e diga QUEM deve agir (o agente: um ministério, uma secretaria, a escola…) e O QUE deve ser feito (a ação).',
  },
  {
    heading: 'Modo / meio',
    body: 'Explique COMO a ação será realizada, geralmente com "por meio de", "através de" ou "mediante" — o instrumento concreto que torna a proposta possível.',
  },
  {
    heading: 'Finalidade',
    body: 'Aponte PARA QUÊ a ação serve, com "a fim de", "com a finalidade de" ou "com o objetivo de" — o resultado esperado que resolve a problemática.',
  },
  {
    heading: 'Detalhamento',
    body: 'Acrescente um detalhe, exemplo ou aprofundamento da proposta ("Em detalhe…", "Como, por exemplo…"), mostrando que ela é concreta e viável.',
  },
  {
    heading: 'Retomada do repertório',
    body: 'Feche o parágrafo com um conectivo conclusivo (Dessa forma, Dessa maneira…) retomando o repertório da introdução e mostrando que o problema poderá ser superado.',
  },
];

export function ConclusaoFormulaExplicacao() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Menu
        </button>
        <h1 className={styles.pageTitle}>A fórmula da conclusão</h1>
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

        <button className={styles.cta} onClick={() => navigate('/fase/fase-conclusao-formula')}>
          Fazer teste →
        </button>
      </div>
    </div>
  );
}
