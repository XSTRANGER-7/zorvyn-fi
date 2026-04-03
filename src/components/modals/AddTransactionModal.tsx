import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTransactionStore } from '../../store/useTransactionStore';
import { cn } from '../../utils/helpers';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  'Groceries', 'Entertainment', 'Dining', 'Shopping', 
  'Housing', 'Transportation', 'Income', 'Freelance', 'Savings', 'Investments', 'Other'
];

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const { addTransaction } = useTransactionStore();
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) {
      setError('Please fill in all required fields.');
      return;
    }
    
    addTransaction({
      description,
      amount: Number(amount),
      category,
      type,
      date: new Date().toISOString()
    });

    // Reset and close
    setDescription('');
    setAmount('');
    setCategory(CATEGORIES[0]);
    setType('expense');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-finance-dark/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-finance-card border border-finance-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden slide-in-from-bottom-4 animate-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-finance-border bg-finance-dark/50">
          <h2 className="text-lg font-semibold text-finance-textMain">Add Transaction</h2>
          <Button variant="ghost" className="h-8 w-8 p-0 border border-finance-border" onClick={onClose} aria-label="Close">
            <X size={16} />
          </Button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Type Toggle */}
          <div className="flex bg-finance-dark rounded-lg p-1 border border-finance-border">
            <button
              type="button"
              className={cn("flex-1 py-2 text-sm rounded-md font-medium transition-colors", type === 'expense' ? "bg-finance-card shadow-sm text-finance-textMain border border-finance-border/50" : "text-finance-textMuted")}
              onClick={() => setType('expense')}
            >
              Debit (Expense)
            </button>
            <button
              type="button"
              className={cn("flex-1 py-2 text-sm rounded-md font-medium transition-colors", type === 'income' ? "bg-green-500/10 text-green-400 border border-finance-border/50 shadow-sm" : "text-finance-textMuted")}
              onClick={() => setType('income')}
            >
              Credit (Income)
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-finance-textMuted">Description</label>
              <input 
                autoFocus
                type="text" 
                placeholder="e.g. Salary, Groceries, Uber"
                className="bg-finance-dark border border-finance-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-finance-accent transition-all text-finance-textMain"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-finance-textMuted">Amount (₹)</label>
              <input 
                type="number" 
                min="0"
                step="any"
                placeholder="0.00"
                className="bg-finance-dark border border-finance-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-finance-accent transition-all text-finance-textMain"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-finance-textMuted">Category</label>
              <select
                className="bg-finance-dark border border-finance-border rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:border-finance-accent transition-all text-finance-textMain cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-red-400 text-xs font-medium">{error}</p>}

          <div className="pt-4 border-t border-finance-border/50 flex gap-3">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1 border border-finance-border">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-finance-accent text-finance-dark font-medium hover:bg-finance-accentDark transition-colors shadow-[0_0_15px_rgba(234,179,8,0.2)]">
              Add Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
