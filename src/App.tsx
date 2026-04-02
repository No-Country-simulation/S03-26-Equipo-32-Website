import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutDashboard } from '@/components/LayoutDashboard.tsx';
import { DashboardPage } from '@/components/pages/dashboard/ui/page';
import { LoginPage } from '@/components/pages/login/ui/page';
import { HomePage } from '@/components/pages/landing/ui/page';
import './App.css';
import { LeadsManagerPage } from '@/components/pages/leads-manager/ui/page.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutDashboard />}>
          <Route path="/panel-general" element={<DashboardPage />} />
          <Route path="/prospectos" element={<LeadsManagerPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
