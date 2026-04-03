import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactionStore } from '../../store/useTransactionStore';
import { formatCurrency } from '../../utils/helpers';
import { format, parseISO } from 'date-fns';

export function BalanceChart() {
  const { transactions } = useTransactionStore();

  const data = useMemo(() => {
    // Sort transactions by date ascending
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let currentBalance = 0;
    
    return sorted.map(tx => {
      currentBalance += tx.type === 'income' ? tx.amount : -tx.amount;
      return {
        date: format(parseISO(tx.date), 'MMM dd'),
        balance: currentBalance,
      };
    });
  }, [transactions]);

  return (
    <div className="h-72 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#6b6375" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#6b6375" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#16171d', borderColor: '#2e303a', borderRadius: '8px' }}
            itemStyle={{ color: '#fcd34d' }}
            formatter={(value: any) => [formatCurrency(Number(value)), 'Balance']}
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#eab308" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorBalance)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
