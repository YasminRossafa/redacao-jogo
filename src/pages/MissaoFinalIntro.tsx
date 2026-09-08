import { useNavigate } from 'react-router-dom';
import styles from './MissaoFinalIntro.module.css';

/** Spaceship returning to Earth — the final destination icon, large. */
function ReturnShipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      {/* Earth */}
      <circle cx="7" cy="17" r="4.5" fill="#2563EB" />
      <path d="M3.2 15.5c1.4.6 2.2-.5 3.4 0s2 .9 3.6.2" stroke="#93C5FD" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M4 18.6c1.2.5 2-.3 3.2.2" stroke="#93C5FD" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Descending capsule */}
      <path d="M17 3.5c2.2 0 3.6 1.8 3.6 4 0 2.6-2.2 4.6-3.6 6-1.4-1.4-3.6-3.4-3.6-6 0-2.2 1.4-4 3.6-4z" fill="#F8FAFC" />
      <circle cx="17" cy="7.2" r="1.5" fill="#F59E0B" />
      {/* Re-entry trail */}
      <path d="M14.5 12.5 12 15" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <path d="M19.5 12.5 22 15" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <path d="M17 14 17 17.5" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function MissaoFinalIntro() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← Menu
      </button>

      <div className={styles.panel}>
        <span className={styles.badge}>Missão Final</span>
        <span className={styles.icon} aria-hidden>
          <ReturnShipIcon />
        </span>
        <h1 className={styles.title}>Missão Final: Retorno à Terra</h1>
        <p className={styles.body}>
          Você cruzou todas as etapas da galáxia da redação — Introdução,
          Desenvolvimento 1, Desenvolvimento 2 e Conclusão. Agora é hora de reunir
          tudo o que aprendeu em uma única travessia: 30 desafios que percorrem o
          texto inteiro, do repertório à proposta de intervenção. Complete a missão
          e retorne à Terra como Comandante.
        </p>
        <button className={styles.cta} onClick={() => navigate('/fase/fase-missao-final')}>
          Iniciar Missão →
        </button>
      </div>
    </div>
  );
}
