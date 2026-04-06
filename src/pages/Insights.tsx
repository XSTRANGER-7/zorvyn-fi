import { useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { useTransactionStore } from '../store/useTransactionStore';
import { formatCurrency } from '../utils/helpers';
import { AlertTriangle, Zap, CalendarDays, BrainCircuit, Sparkles, PieChart } from 'lucide-react';
import { CategoryChart } from '../components/charts/CategoryChart';
import { format, parseISO } from 'date-fns';

export function Insights() {
  const { transactions } = useTransactionStore();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const incomeList = transactions.filter(t => t.type === 'income');
    
    const totalIncome = incomeList.reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    // Highest Category
    const cats: Record<string, number> = {};
    expenses.forEach(e => { cats[e.category] = (cats[e.category] || 0) + e.amount; });
    const sortedCats = Object.entries(cats).sort((a, b) => b[1] - a[1]);
    const topCat = sortedCats[0];
    
    // Top 3 Categories combined percentage
    const top3Amount = sortedCats.slice(0, 3).reduce((sum, cat) => sum + cat[1], 0);
    const top3Percentage = totalExpense > 0 ? (top3Amount / totalExpense) * 100 : 0;

    // Highest Spend Month
    const months: Record<string, number> = {};
    expenses.forEach(e => {
       const monthKey = format(parseISO(e.date), 'MMMM yyyy');
       months[monthKey] = (months[monthKey] || 0) + e.amount;
    });
    const sortedMonths = Object.entries(months).sort((a, b) => b[1] - a[1]);
    const topMonth = sortedMonths[0];

    // Largest Single observation
    const topTx = [...expenses].sort((a,b) => b.amount - a.amount)[0];

    // AI logic
    let recommendation = '';
    if (savingsRate < 20) {
      recommendation = `You are saving ${savingsRate.toFixed(1)}% of your income. The 50/30/20 rule suggests saving at least 20%. To improve, try reducing expenses in your biggest drain: ${topCat?.[0] || 'your top category'}.`;
    } else {
      recommendation = `Outstanding! You maintain a powerful savings rate of ${savingsRate.toFixed(1)}%. It's time to heavily consider pushing your surplus into Fixed Deposits or Mutual Funds to compound your wealth over time.`;
    }

    if (top3Percentage > 70) {
      recommendation += ` Also, AI analysis detects heavily consolidated spending: ${top3Percentage.toFixed(1)}% of your expenses go to just your top 3 categories! Setting strict threshold budgets for these specific areas will mathematically guarantee faster net-worth growth.`;
    }

    return {
      topCat,
      topTx,
      topMonth,
      recommendation
    }
  }, [transactions]);

  return (
    <div className="max-w-6xl mx-auto w-full animate-in fade-in duration-500 flex flex-col gap-8">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-finance-accent/20 rounded-lg">
            <BrainCircuit size={28} className="text-finance-accent animate-pulse" />
          </div>
           <h1 className="text-3xl font-bold">Insights</h1>
        </div>
        <p className="text-finance-textMuted sm:text-lg">Intelligent deep-dives and dynamic breakdown of your financial footprint.</p>
      </header>

      {/* Main Grid Layout to handle strict mobile/desktop re-ordering */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Top Value Cards (Mobile Level: 2 | Desktop Level: 1) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 order-2 lg:order-1">
          <Card glow className="relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-finance-card to-blue-500/5 dark:to-[#1a1b26]/80 p-8">
            <div className="absolute -right-4 -top-4 p-8 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity rotate-12 group-hover:rotate-0 duration-500">
              <Zap size={140} className="text-finance-accent dark:text-finance-accent"/>
            </div>
            <div className="relative z-10 flex flex-col gap-3">
              <h3 className="text-finance-textMuted text-lg font-medium">Highest Spending Category</h3>
              <div className="text-4xl font-bold text-finance-textMain tracking-tight">
                {insights.topCat ? insights.topCat[0] : 'N/A'}
              </div>
              <p className="text-base text-finance-textMuted/90">
                {insights.topCat ? `Totalling ${formatCurrency(insights.topCat[1])}` : 'Add records'}
              </p>
            </div>
          </Card>
          
          <Card glow className="relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-finance-card to-purple-500/5 dark:to-[#1d1626]/80 p-8">
            <div className="absolute -right-4 -top-4 p-8 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity -rotate-12 group-hover:rotate-0 duration-500">
              <CalendarDays size={140} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div className="relative z-10 flex flex-col gap-3">
              <h3 className="text-finance-textMuted text-lg font-medium">Most Expensive Month</h3>
              <div className="text-4xl font-bold text-finance-textMain tracking-tight">
                {insights.topMonth ? insights.topMonth[0] : 'N/A'}
              </div>
              <p className="text-base text-finance-textMuted/90">
                {insights.topMonth ? `Burned ${formatCurrency(insights.topMonth[1])}` : 'Add records'}
              </p>
            </div>
          </Card>

          <Card glow className="relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-finance-card to-red-500/5 dark:to-[#261616]/80 p-8">
            <div className="absolute -right-4 -bottom-4 p-8 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity rotate-12 group-hover:rotate-0 duration-500">
              <AlertTriangle size={140} className="text-red-500 dark:text-red-400" />
            </div>
            <div className="relative z-10 flex flex-col gap-3"> 
              <h3 className="text-finance-textMuted text-lg font-medium">Largest Single Expense</h3>
              <div className="text-4xl font-bold text-finance-textMain tracking-tight">
                {insights.topTx ? formatCurrency(insights.topTx.amount) : 'N/A'}
              </div>
              <p className="text-base text-finance-textMuted/90 truncate">
                {insights.topTx ? `on ${insights.topTx.description} (${insights.topTx.category})` : 'Add records'}
              </p>
            </div>
          </Card>
        </div>

        {/* Visual Graph Side (Mobile Level: 1 | Desktop Level: 2) */}
        <Card className="order-1 lg:order-2 flex flex-col h-full border border-finance-border/60 hover:border-finance-border transition-colors w-full min-h-[400px]">
          <div className="flex items-center gap-2 mb-6">
            <PieChart size={20} className="text-finance-textMuted" />
            <h3 className="font-semibold text-lg">Spending Breakdown Visualized</h3>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0">
              <CategoryChart />
            </div>
          </div>
        </Card>

        {/* AI Engine Side (Mobile Level: 3 | Desktop Level: 3) */}
        <Card glow className="order-3 lg:order-3 relative flex flex-col justify-center border border-finance-accent/30 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-finance-accent/5 to-transparent rounded-2xl pointer-events-none" />
           <div className="relative z-10 p-0 sm:p-2">
             <div className="flex items-center gap-2 mb-6">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-finance-accent to-yellow-600 flex items-center justify-center shadow-lg shadow-finance-accent/20">
                 <Sparkles size={24} className="text-finance-darker animate-pulse" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-finance-accent to-yellow-200">Zorvyn AI Strategy Coach</h3>
                 <p className="text-sm text-finance-textMuted flex items-center gap-1">Based on <span className="text-finance-accent font-mono">{transactions.length}</span> actions</p>
               </div>
             </div>
             
             <div className="bg-finance-dark/50 rounded-xl p-4 sm:p-6 border border-finance-border/50 shadow-inner">
               <p className="text-finance-textMain text-lg leading-relaxed font-light">
                 {insights.recommendation || "Upload more transactions for Zorvyn AI to dynamically process your financial behavior patterns."}
               </p>
             </div>
              
           </div>
        </Card>

      </div>
    </div>
  );


}

