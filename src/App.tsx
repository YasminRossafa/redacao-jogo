import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from './pages/Menu';
import { Fase } from './pages/Fase';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/fase/:phaseId" element={<Fase />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
