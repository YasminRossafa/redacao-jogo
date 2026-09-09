import { useNavigate } from 'react-router-dom';
// Same lightweight intro treatment as the fórmula guides — reuse its stylesheet.
import styles from './FormulaExplicacao.module.css';

const RULE =
  'Uma mesma citação filosófica ou sociológica pode servir para mais de um tema — desde que a ideia central da citação realmente se conecte com o motivo apresentado.';

const WARNING =
  'Mas cuidado: isso não quer dizer que qualquer citação serve para qualquer tema. Avalie se a ideia realmente combina antes de usar.';

export function D2RepertoriosExplicacao() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Menu
        </button>
        <h1 className={styles.pageTitle}>Uma citação, vários temas</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <p className={styles.cardBody}>{RULE}</p>
        </div>
        <div className={styles.card}>
          <p className={styles.cardBody}>{WARNING}</p>
        </div>

        <button
          className={styles.cta}
          onClick={() => navigate('/fase/fase-d2-repertorios-bonus')}
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
