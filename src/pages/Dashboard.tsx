import { useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { BalanceChart } from '../components/charts/BalanceChart';
import { CategoryChart } from '../components/charts/CategoryChart';
import { formatCurrency } from '../utils/helpers';
import { useTransactionStore } from '../store/useTransactionStore';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

export function Dashboard() {
  const { transactions } = useTransactionStore();

  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
    return {
      balance: income - expense,
      income,
      expense
    };
  }, [transactions]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Overview</h1>
        <p className="text-finance-textMuted">Welcome back, here's your financial snapshot.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glow className="bg-gradient-to-br from-finance-card to-finance-card/50">
          <div className="flex justify-between items-start text-finance-textMuted mb-4">
            <h3 className="font-medium">Total Balance</h3>
            <DollarSign size={20} className="text-finance-accent" />
          </div>
          <p className="text-4xl font-bold">{formatCurrency(stats.balance)}</p>
        </Card>
        
        <Card glow>
          <div className="flex justify-between items-start text-finance-textMuted mb-4">
            <h3 className="font-medium">Income</h3>
            <div className="p-1 rounded-md bg-green-500/10 text-green-400">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(stats.income)}</p>
        </Card>
        
        <Card glow>
          <div className="flex justify-between items-start text-finance-textMuted mb-4">
            <h3 className="font-medium">Expenses</h3>
            <div className="p-1 rounded-md bg-red-500/10 text-red-400">
              <ArrowDownRight size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(stats.expense)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <h3 className="font-medium mb-1">Balance Trend</h3>
          <p className="text-sm text-finance-textMuted mb-4">Your balance history over time</p>
          <BalanceChart />
        </Card>

        {/* Side Chart */}
        <Card>
          <h3 className="font-medium mb-1">Spending Breakdown</h3>
          <p className="text-sm text-finance-textMuted mb-4">Categorized expenses</p>
          <CategoryChart />
        </Card>
      </div>
    </div>
  );
}
