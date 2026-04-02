import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTransactionStore } from '../../store/useTransactionStore';
import { CATEGORY_COLORS } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';

export function CategoryChart() {
  const { transactions } = useTransactionStore();

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categories: Record<string, number> = {};
    
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    return Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="flex flex-col h-full">
      <div className="h-56 relative">
        {data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-finance-textMuted text-sm">
            No expenses found.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || '#6b6375'} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#16171d', borderColor: '#2e303a', borderRadius: '8px' }}
                formatter={(value: any) => formatCurrency(Number(value))}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {data.slice(0, 4).map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[item.name] || '#6b6375' }} />
            <span className="text-finance-textMuted flex-1 truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
