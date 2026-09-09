import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from './pages/Menu';
import { Fase } from './pages/Fase';
import { FormulaExplicacao } from './pages/FormulaExplicacao';
import { D1FormulaExplicacao } from './pages/D1FormulaExplicacao';
import { D2FormulaExplicacao } from './pages/D2FormulaExplicacao';
import { ConclusaoFormulaExplicacao } from './pages/ConclusaoFormulaExplicacao';
import { D1RepertoriosExplicacao } from './pages/D1RepertoriosExplicacao';
import { MissaoFinalIntro } from './pages/MissaoFinalIntro';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/formula" element={<FormulaExplicacao />} />
        <Route path="/d1-formula" element={<D1FormulaExplicacao />} />
        <Route path="/d2-formula" element={<D2FormulaExplicacao />} />
        <Route path="/conclusao-formula" element={<ConclusaoFormulaExplicacao />} />
        <Route path="/d1-repertorios" element={<D1RepertoriosExplicacao />} />
        <Route path="/missao-final" element={<MissaoFinalIntro />} />
        <Route path="/fase/:phaseId" element={<Fase />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
