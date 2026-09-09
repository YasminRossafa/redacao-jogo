import { useNavigate } from 'react-router-dom';
// Same lightweight intro treatment as the fórmula guides — reuse its stylesheet.
import styles from './FormulaExplicacao.module.css';

const RULE =
  'Ao usar um dado de um texto de apoio, você NUNCA pode copiar a frase original — precisa reescrevê-la com suas próprias palavras, mantendo a informação real.';

const EXAMPLE =
  "Exemplo: se o texto de apoio diz 'Se 70% das mulheres não denunciam seus agressores'*, você pode escrever 'apenas 30% das vítimas denunciam' ou 'a maioria das vítimas não denuncia' — o dado continua o mesmo, mas a frase é outra.";

export function D1RepertoriosExplicacao() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Menu
        </button>
        <h1 className={styles.pageTitle}>Do texto de apoio à citação</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <p className={styles.cardBody}>{RULE}</p>
        </div>
        <div className={styles.card}>
          <p className={styles.cardBody}>{EXAMPLE}</p>
        </div>

        <button
          className={styles.cta}
          onClick={() => navigate('/fase/fase-d1-repertorios-bonus')}
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
