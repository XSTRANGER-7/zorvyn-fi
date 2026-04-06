import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Search, Filter, Trash2, ArrowUpRight, ArrowDownLeft, Download, FileText } from 'lucide-react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { useAuthStore } from '../../store/useAuthStore';
import { formatCurrency, cn } from '../../utils/helpers';
import { Button } from '../ui/Button';

export function TransactionTable() {
  const { transactions, filterText, setFilterText, filterCategory, setFilterCategory, deleteTransaction } = useTransactionStore();
  const { role } = useAuthStore();
  
  const [filterMonth, setFilterMonth] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showStatement, setShowStatement] = useState(false);

  const months = useMemo(() => {
    const m = new Set<string>();
    transactions.forEach(t => m.add(format(parseISO(t.date), 'yyyy-MM')));
    return Array.from(m).sort((a,b) => b.localeCompare(a));
  }, [transactions]);

  const categories = useMemo(() => ['All', ...new Set(transactions.map(t => t.category))], [transactions]);

  const filteredData = useMemo(() => {
    return transactions.filter(t => {
      const matchText = t.description.toLowerCase().includes(filterText.toLowerCase()) || 
                        t.category.toLowerCase().includes(filterText.toLowerCase());
      const matchCat = filterCategory === 'All' || t.category === filterCategory;
      const matchMonth = filterMonth === 'All' || format(parseISO(t.date), 'yyyy-MM') === filterMonth;
      const matchStatus = filterStatus === 'All' || t.type === filterStatus;
      
      return matchText && matchCat && matchMonth && matchStatus;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filterText, filterCategory, filterMonth, filterStatus]);

  const handleDownloadCSV = () => {
    const headers = ['Date,Description,Category,Type,Amount'];
    const rows = filteredData.map(t => 
      `${format(parseISO(t.date), 'yyyy-MM-dd')},"${t.description}","${t.category}",${t.type},${t.amount}`
    );
    const csvContent = headers.concat(rows).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `statement_${filterMonth === 'All' ? 'all' : filterMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-4 ">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between print:hidden ">
        
        {/* Search & Filter Trigger */}
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-finance-textMuted" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="w-full bg-finance-dark border border-finance-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-finance-accent transition-all"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <Button 
            variant="ghost" 
            className={cn("px-3 border border-finance-border", showFilters ? "bg-finance-card text-finance-accent" : "")}
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle Filters"
          >
            <Filter size={18} />
          </Button>
        </div>

        {/* Statement Dropdown */}
        <div className="relative w-full sm:w-auto">
          <Button variant="ghost" onClick={() => setShowStatement(!showStatement)} className="w-full sm:w-auto border border-finance-border text-xs gap-2">
            <FileText size={14} /> My Statement
          </Button>
          
          {showStatement && (
            <div className="absolute right-0 mt-2 w-full sm:w-48 bg-finance-card border border-finance-border rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <button onClick={() => { handleDownloadCSV(); setShowStatement(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-finance-dark/50 transition-colors flex items-center gap-2 text-finance-textMain">
                <Download size={14} /> Download CSV
              </button>
              <button onClick={() => { handleDownloadPDF(); setShowStatement(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-finance-dark/50 transition-colors flex items-center gap-2 border-t border-finance-border text-finance-textMain">
                <FileText size={14} /> Export PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Filter Menu */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-finance-dark/50 p-4 rounded-xl border border-finance-border animate-in fade-in slide-in-from-top-2 print:hidden">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-finance-textMuted font-medium">Month</label>
            <select 
              className="bg-finance-dark border border-finance-border rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none focus:border-finance-accent cursor-pointer"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              <option value="All">All Months</option>
              {months.map(m => (
                <option key={m} value={m}>{format(parseISO(`${m}-01T00:00:00`), 'MMMM yyyy')}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs text-finance-textMuted font-medium">Category</label>
            <select 
              className="bg-finance-dark border border-finance-border rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none focus:border-finance-accent cursor-pointer"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-finance-textMuted font-medium">Status</label>
            <select 
              className="bg-finance-dark border border-finance-border rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none focus:border-finance-accent cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="income">Credits Only</option>
              <option value="expense">Debits Only</option>
            </select>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="flex flex-col mt-4">
        {filteredData.length === 0 ? (
          <div className="py-12 text-center text-finance-textMuted rounded-xl border border-dashed border-finance-border">
            No transactions found.
          </div>
        ) : (
          filteredData.map((t) => (
            <div 
              key={t.id} 
              className="flex items-center justify-between py-4 sm:py-5 px-2 sm:px-4 border-b border-finance-border/70 last:border-0 hover:bg-finance-card/20 transition-colors group rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0",
                  t.type === 'income' ? 'bg-green-500/10 text-green-400' : 'bg-finance-card text-finance-textMuted border border-finance-border'
                )}>
                  {t.type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                
                <div className="flex flex-col">
                  <span className="font-semibold text-finance-textMain text-sm sm:text-base line-clamp-1">{t.description}</span>
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs text-finance-textMuted mt-0.5">
                    <span>{format(parseISO(t.date), 'MMM dd, yyyy')}</span>
                    <span className="w-1 h-1 rounded-full bg-finance-border"></span>
                    <span>{t.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <span className={cn(
                  "font-bold text-sm sm:text-base", 
                  t.type === 'income' ? 'text-green-400' : 'text-finance-textMain'
                )}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
                
                {role === 'admin' && (
                  <Button 
                    variant="ghost" 
                    className="h-8 w-8 p-0 text-red-500/70 hover:text-red-400 hover:bg-red-500/10 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all print:hidden shrink-0"
                    onClick={() => deleteTransaction(t.id)}
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
