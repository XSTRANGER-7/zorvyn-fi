import { useMemo, useState } from 'react';
import { Card } from '../components/ui/Card';
import { BalanceChart } from '../components/charts/BalanceChart';

import { formatCurrency } from '../utils/helpers';
import { useTransactionStore } from '../store/useTransactionStore';
import { ArrowUpRight, ArrowDownRight, Eye, EyeOff, CreditCard, WalletCards, Landmark, TrendingUp, Percent, Briefcase } from 'lucide-react'; 

export function Dashboard() {
  const { transactions } = useTransactionStore();
  const [showBalance, setShowBalance] = useState(true);

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
    <div className="space-y-6 md:space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Overview</h1>
        {/* <p className="text-finance-textMuted">Welcome back, here's your financial snapshot.</p> */}
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glow className="bg-gradient-to-br from-finance-card to-finance-card/50">
          <div className="flex justify-between items-start text-finance-textMuted mb-4">
            <h3 className="font-medium">Total Balance</h3>
            <button 
              onClick={() => setShowBalance(!showBalance)} 
              className="text-finance-accent hover:text-finance-accentDark transition-colors cursor-pointer"
              aria-label={showBalance ? "Hide balance" : "Show balance"}
            >
              {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <p className="text-4xl font-bold">{showBalance ? formatCurrency(stats.balance) : '****'}</p>
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

      {/* Quick Links Section */}
      <Card className="p-4 lg:p-6">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-2 md:gap-x-6 w-full">
          {[
            { icon: CreditCard, label: 'Debit Card' },
            { icon: WalletCards, label: 'Credit Card' },
            { icon: Landmark, label: 'Fixed Deposits' },
            { icon: TrendingUp, label: 'Mutual Funds' },
            { icon: Percent, label: 'Loans' },
            { icon: Briefcase, label: 'SIP' },
          ].map((service, idx) => (
            <button 
              key={idx} 
              className="flex flex-col items-center justify-center gap-3 group focus:outline-none w-full"
            >
              <div className="w-12 h-12 rounded-full bg-finance-dark border border-finance-border flex items-center justify-center text-finance-textMuted group-hover:border-finance-accent group-hover:text-finance-accent shadow-sm group-hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all duration-300">
                <service.icon size={22} />
              </div>
              <span className="text-xs font-medium text-finance-textMuted group-hover:text-finance-textMain transition-colors whitespace-nowrap">
                {service.label}
              </span>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 w-full gap-6">
        {/* Main Chart */}
        <Card className="col-span-1 w-full">
          <h3 className="font-medium mb-1">Balance Trend</h3>
          <p className="text-sm text-finance-textMuted mb-4">Your balance history over time</p>
          <BalanceChart />
        </Card>
      </div>
    </div>
 
  );
}
