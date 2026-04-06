import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { Transactions } from '../pages/Transactions';
import { Insights } from '../pages/Insights';
import { Services } from '../pages/Services';
import { DebugApi } from '../pages/DebugApi';

export function AppRoutes() {
  return (
    <Routes>
      {/* Acts as a plain-text debug backend URL route */}
      <Route path="/api/data" element={<DebugApi />} />

      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="insights" element={<Insights />} />
        <Route path="services" element={<Services />} />
      </Route>
    </Routes>
  );
}
