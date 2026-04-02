import { useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { useTransactionStore } from '../store/useTransactionStore';
import { formatCurrency } from '../utils/helpers';
import { TrendingUp, AlertTriangle, Zap } from 'lucide-react';

export function Insights() {
  const { transactions } = useTransactionStore();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Highest Category
    const cats: Record<string, number> = {};
    expenses.forEach(e => { cats[e.category] = (cats[e.category] || 0) + e.amount; });
    const sortedCats = Object.entries(cats).sort((a, b) => b[1] - a[1]);
    const topCat = sortedCats[0];

    // Simple observation
    const topTx = [...expenses].sort((a,b) => b.amount - a.amount)[0];

    return {
      topCat,
      topTx
    }
  }, [transactions]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto w-full">
      <header>
        <h1 className="text-3xl font-bold mb-2">Insights</h1>
        <p className="text-finance-textMuted">AI-driven observations about your spending habits.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card glow className="relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <TrendingUp size={120} />
          </div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-full bg-finance-accent/20 flex items-center justify-center mb-4">
              <Zap size={20} className="text-finance-accent" />
            </div>
            <h3 className="text-finance-textMuted mb-2">Highest Spending Category</h3>
            <div className="text-3xl font-bold text-finance-textMain mb-1">
              {insights.topCat ? insights.topCat[0] : 'N/A'}
            </div>
            <p className="text-sm text-finance-textMuted">
              {insights.topCat ? `Totalling ${formatCurrency(insights.topCat[1])} across all records.` : 'Add expenses to see insights.'}
            </p>
          </div>
        </Card>

        <Card glow className="relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <AlertTriangle size={120} />
          </div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
              <AlertTriangle size={20} className="text-yellow-500" />
            </div>
            <h3 className="text-finance-textMuted mb-2">Largest Single Expense</h3>
            <div className="text-3xl font-bold text-finance-textMain mb-1">
              {insights.topTx ? formatCurrency(insights.topTx.amount) : 'N/A'}
            </div>
            <p className="text-sm text-finance-textMuted">
              {insights.topTx ? `Spent on ${insights.topTx.description} (${insights.topTx.category})` : 'Add expenses to see insights.'}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-medium mb-4">Monthly Trajectory</h3>
        <p className="text-finance-textMuted leading-relaxed">
          Based on your current transaction history, your spending aligns heavily with essential services like {insights.topCat?.[0]}. 
          Consider establishing a localized budget specifically targeting your largest single expense areas to increase overall savings rate.
        </p>
      </Card>
    </div>
  );
}
