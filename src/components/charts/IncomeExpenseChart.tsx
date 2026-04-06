import { useMemo, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { useTransactionStore } from '../../store/useTransactionStore';
import { formatCurrency } from '../../utils/helpers';
import { format, parseISO, endOfMonth, eachDayOfInterval, isSameDay, isAfter, endOfDay } from 'date-fns';

export function IncomeExpenseChart() {
  const { transactions } = useTransactionStore();
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
    let days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const now = endOfDay(new Date());
    days = days.filter(day => !isAfter(day, now));

    return days.map(day => {
      let income = 0;
      let expense = 0;
      transactions.forEach(tx => {
        const txDate = parseISO(tx.date);
        if (isSameDay(txDate, day)) {
          if (tx.type === 'income') income += tx.amount;
          if (tx.type === 'expense') expense += tx.amount;
        }
      });
      return {
        date: format(day, 'MMM dd'),
        income,
        expense,
      };
    });
  }, [transactions, selectedMonth]);

  return (
    <div className="w-full flex flex-col h-full">
      {/* Header controls */}
      <div className="flex justify-between items-center mb-6">
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
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
              formatter={(value: any, name: any) => [
                formatCurrency(Number(value)), 
                String(name) === 'income' ? 'Income' : 'Expense'
              ]}
            />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }}
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              name="Income"
              stroke="#22c55e" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, fill: '#22c55e', stroke: '#16171d', strokeWidth: 2 }} 
            />
            <Line 
              type="monotone" 
              dataKey="expense" 
              name="Expense"
              stroke="#ef4444" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, fill: '#ef4444', stroke: '#16171d', strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
