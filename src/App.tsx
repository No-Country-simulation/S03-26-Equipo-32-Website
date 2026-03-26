import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, Dashboard } from '@/pages';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
