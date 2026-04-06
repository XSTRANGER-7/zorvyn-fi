import { useState } from 'react';

import { TransactionTable } from '../components/table/TransactionTable';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { AddTransactionModal } from '../components/modals/AddTransactionModal';

export function Transactions() {
  const { role } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transactions</h1>
          <p className="text-finance-textMuted">View, search, and manage your financial activity.</p>
        </div>
        {role === 'admin' && (
          <Button onClick={() => setIsModalOpen(true)} className="gap-2 shrink-0">
            <Plus size={16} />
            <span className="hidden sm:inline">Add Transaction</span>
          </Button>
        )}
      </header>

      <div className="sm:overflow-hidden overflow-x-auto min-h-[400px]">
        <TransactionTable />
      </div>

      {/* Admin Specific Action Modal */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
