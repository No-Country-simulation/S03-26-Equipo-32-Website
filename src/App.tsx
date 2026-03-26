import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage, Dashboard } from '@/pages';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<HomePage />} />
    </BrowserRouter>
  )
}

export default App;
