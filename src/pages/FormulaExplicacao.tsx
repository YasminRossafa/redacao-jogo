import { useNavigate } from 'react-router-dom';
import styles from './FormulaExplicacao.module.css';

const BLOCKS = [
  {
    heading: 'Repertório sociocultural',
    body: 'Usa um conhecimento externo (filme, livro, série, fato histórico) para contextualizar o tema.',
  },
  {
    heading: 'Tema + Brasil',
    body: 'Mostra a relação entre o repertório e o tema, sempre trazendo para a realidade brasileira.',
  },
  {
    heading: 'Problemáticas',
    body: 'Indica os dois problemas, tirados dos textos de apoio, que serão desenvolvidos nos próximos parágrafos.',
  },
];

export function FormulaExplicacao() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Menu
        </button>
        <h1 className={styles.pageTitle}>A fórmula da introdução</h1>
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

        <button className={styles.cta} onClick={() => navigate('/fase/fase-formula')}>
          Fazer perguntas →
        </button>
      </div>
    </div>
  );
}
