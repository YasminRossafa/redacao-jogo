import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Menu } from './pages/Menu';
import { Fase } from './pages/Fase';
import { FormulaExplicacao } from './pages/FormulaExplicacao';
import { D1FormulaExplicacao } from './pages/D1FormulaExplicacao';
import { D2FormulaExplicacao } from './pages/D2FormulaExplicacao';
import { ConclusaoFormulaExplicacao } from './pages/ConclusaoFormulaExplicacao';
import { D1RepertoriosExplicacao } from './pages/D1RepertoriosExplicacao';
import { D2RepertoriosExplicacao } from './pages/D2RepertoriosExplicacao';
import { MissaoFinalIntro } from './pages/MissaoFinalIntro';

// Separated from App so it can call useLocation() — that needs a Router
// ancestor, which only exists once BrowserRouter itself has rendered, i.e.
// one level below App.
function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/formula" element={<FormulaExplicacao />} />
      <Route path="/d1-formula" element={<D1FormulaExplicacao />} />
      <Route path="/d2-formula" element={<D2FormulaExplicacao />} />
      <Route path="/conclusao-formula" element={<ConclusaoFormulaExplicacao />} />
      <Route path="/d1-repertorios" element={<D1RepertoriosExplicacao />} />
      <Route path="/d2-repertorios" element={<D2RepertoriosExplicacao />} />
      <Route path="/missao-final" element={<MissaoFinalIntro />} />
      {/* Keyed by the full path so navigating between two phases (e.g. the
          results screen's "Próximo" button, or any /fase/:id -> /fase/:id2
          link) forces a full remount instead of reusing the same Fase
          instance with a changed :phaseId param — React Router does NOT
          remount on a param-only change, so without this every piece of
          Fase's local state (shuffledActivities, results, showResults,
          activityIndex, bestCombo, ...) carried over from whichever phase
          was open before, showing that phase's leftover results screen
          under the new phase's name instead of a fresh question 1. */}
      <Route path="/fase/:phaseId" element={<Fase key={location.pathname} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
