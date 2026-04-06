import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { useTransactionStore } from '../store/useTransactionStore';

function App() {
  const loadTransactions = useTransactionStore((state) => state.loadTransactions);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
