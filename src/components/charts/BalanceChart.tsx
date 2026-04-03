import { useMemo, useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { useTransactionStore } from '../../store/useTransactionStore';
import { formatCurrency, cn } from '../../utils/helpers';
import { format, parseISO, endOfMonth, eachDayOfInterval, isBefore, isSameDay } from 'date-fns';
import { BarChart3, TrendingUp } from 'lucide-react';

export function BalanceChart() {
  const { transactions } = useTransactionStore();
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    transactions.forEach(t => {
      months.add(format(parseISO(t.date), 'yyyy-MM'));
    });
    const sortedMonths = Array.from(months).sort((a, b) => b.localeCompare(a));
    
    // Fallback to current month if no transactions
    if (sortedMonths.length === 0) {
      sortedMonths.push(format(new Date(), 'yyyy-MM'));
    }
    
    return sortedMonths;
  }, [transactions]);

  useEffect(() => {
    if (!selectedMonth && availableMonths.length > 0) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);

  const data = useMemo(() => {
    if (!selectedMonth) return [];

    const monthStart = parseISO(`${selectedMonth}-01T00:00:00`);
    const monthEnd = endOfMonth(monthStart);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    let currentBalance = 0;
    const sortedTxs = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate carry-over balance up to the start of the month
    sortedTxs.forEach(tx => {
      const txDate = parseISO(tx.date);
      if (isBefore(txDate, monthStart)) {
        currentBalance += tx.type === 'income' ? tx.amount : -tx.amount;
      }
    });

    // Populate data for every single day in the month
    return days.map(day => {
      sortedTxs.forEach(tx => {
        const txDate = parseISO(tx.date);
        if (isSameDay(txDate, day)) {
          currentBalance += tx.type === 'income' ? tx.amount : -tx.amount;
        }
      });
      return {
        date: format(day, 'MMM dd'),
        balance: currentBalance,
      };
    });
  }, [transactions, selectedMonth]);

  return (
    <div className="w-full flex flex-col h-full">
      {/* Controls Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        
        <select 
          className="bg-finance-dark/50 border border-finance-border rounded-lg px-3 py-1.5 text-sm text-finance-textMain focus:outline-none focus:border-finance-accent transition-colors cursor-pointer"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {availableMonths.map(month => {
            const date = parseISO(`${month}-01T00:00:00`);
            return (
              <option key={month} value={month}>
                {format(date, 'MMMM yyyy')}
              </option>
            );
          })}
        </select>

        <div className="flex items-center bg-finance-dark/50 border border-finance-border rounded-lg p-1">
          <button
            onClick={() => setChartType('area')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
              chartType === 'area' ? "bg-finance-card text-finance-textMain shadow-sm" : "text-finance-textMuted hover:text-finance-textMain"
            )}
          >
            <TrendingUp size={14} />
            Area
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
              chartType === 'bar' ? "bg-finance-card text-finance-textMain shadow-sm" : "text-finance-textMuted hover:text-finance-textMain"
            )}
          >
            <BarChart3 size={14} />
            Bar
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke="#6b6375" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
                minTickGap={20}
              />
              <YAxis 
                stroke="#6b6375" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `₹${value}`}
                tickMargin={10}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#16171d', borderColor: '#2e303a', borderRadius: '8px', color: '#f3f4f6' }}
                itemStyle={{ color: '#fcd34d', fontWeight: 600 }}
                formatter={(value: any) => [formatCurrency(Number(value)), 'End of Day Balance']}
                labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#eab308" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke="#6b6375" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
                minTickGap={20}
              />
              <YAxis 
                stroke="#6b6375" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `₹${value}`}
                tickMargin={10}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(234, 179, 8, 0.1)' }}
                contentStyle={{ backgroundColor: '#16171d', borderColor: '#2e303a', borderRadius: '8px', color: '#f3f4f6' }}
                itemStyle={{ color: '#fcd34d', fontWeight: 600 }}
                formatter={(value: any) => [formatCurrency(Number(value)), 'End of Day Balance']}
                labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
              />
              <Bar 
                dataKey="balance" 
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.balance >= 0 ? '#eab308' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
