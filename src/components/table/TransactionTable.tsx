import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Search, ChevronDown, Trash2 } from 'lucide-react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { useAuthStore } from '../../store/useAuthStore';
import { formatCurrency, cn } from '../../utils/helpers';
import { CATEGORY_COLORS } from '../../data/mockData';
import { Button } from '../ui/Button';

export function TransactionTable() {
  const { transactions, filterText, setFilterText, filterCategory, setFilterCategory, deleteTransaction } = useTransactionStore();
  const { role } = useAuthStore();
  
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const categories = useMemo(() => ['All', ...new Set(transactions.map(t => t.category))], [transactions]);

  const filteredData = useMemo(() => {
    let result = transactions.filter(t => {
      const matchText = t.description.toLowerCase().includes(filterText.toLowerCase()) || 
                        t.category.toLowerCase().includes(filterText.toLowerCase());
      const matchCat = filterCategory === 'All' || t.category === filterCategory;
      return matchText && matchCat;
    });

    result = result.sort((a, b) => {
      if (sortField === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });

    return result;
  }, [transactions, filterText, filterCategory, sortField, sortOrder]);

  const handleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-finance-textMuted" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-finance-dark border border-finance-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-finance-accent focus:ring-1 focus:ring-finance-accent transition-all"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        
        <select 
          className="w-full sm:w-auto bg-finance-dark border border-finance-border rounded-lg px-4 py-2 text-sm appearance-none focus:outline-none focus:border-finance-accent transition-all cursor-pointer"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-finance-border text-finance-textMuted text-sm">
              <th className="py-4 px-4 font-medium min-w-[200px]">Description</th>
              <th className="py-4 px-4 font-medium min-w-[120px] cursor-pointer hover:text-finance-textMain" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1">Date <ChevronDown size={14} className={cn("transition-transform", sortField === 'date' && sortOrder === 'asc' && "rotate-180")} /></div>
              </th>
              <th className="py-4 px-4 font-medium min-w-[120px]">Category</th>
              <th className="py-4 px-4 font-medium text-right cursor-pointer hover:text-finance-textMain" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end gap-1">Amount <ChevronDown size={14} className={cn("transition-transform", sortField === 'amount' && sortOrder === 'asc' && "rotate-180")} /></div>
              </th>
              {role === 'admin' && <th className="py-4 px-4 font-medium w-16"></th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={role === 'admin' ? 5 : 4} className="py-8 text-center text-finance-textMuted border-b border-finance-border/50">
                  No transactions found.
                </td>
              </tr>
            ) : filteredData.map((t) => (
              <tr key={t.id} className="border-b border-finance-border/50 hover:bg-finance-card/50 transition-colors group">
                <td className="py-4 px-4">
                  <span className="font-medium">{t.description}</span>
                </td>
                <td className="py-4 px-4 text-finance-textMuted text-sm">
                  {format(parseISO(t.date), 'MMM dd, yyyy')}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[t.category] || '#6b6375' }} />
                    <span className="text-sm text-finance-textMuted">{t.category}</span>
                  </div>
                </td>
                <td className={cn("py-4 px-4 text-right font-medium", t.type === 'income' ? 'text-green-400' : '')}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                {role === 'admin' && (
                  <td className="py-4 px-4 text-right">
                    <Button 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-red-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                      onClick={() => deleteTransaction(t.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
