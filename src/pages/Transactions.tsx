import { Card } from '../components/ui/Card';
import { TransactionTable } from '../components/table/TransactionTable';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useTransactionStore } from '../store/useTransactionStore';

export function Transactions() {
  const { role } = useAuthStore();
  const { addTransaction } = useTransactionStore();
  
  // For simplicity, defining mock additions instead of a full form modal.
  const handleAddMock = () => {
    addTransaction({
      description: 'New Transaction ' + Math.floor(Math.random() * 100),
      amount: Math.floor(Math.random() * 500) + 10,
      category: ['Groceries', 'Entertainment', 'Dining'][Math.floor(Math.random() * 3)],
      date: new Date().toISOString(),
      type: 'expense'
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transactions</h1>
          <p className="text-finance-textMuted">View, search, and manage your financial activity.</p>
        </div>
        {role === 'admin' && (
          <Button onClick={handleAddMock} className="gap-2">
            <Plus size={16} />
            <span className="hidden sm:inline">Add Transaction</span>
          </Button>
        )}
      </header>

      <Card className="p-0 sm:p-6 sm:overflow-hidden overflow-x-auto min-h-[400px]">
        <div className="p-6 sm:p-0">
          <TransactionTable />
        </div>
      </Card>
    </div>
  );
}
