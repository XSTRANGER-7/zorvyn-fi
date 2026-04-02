import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, LineChart } from 'lucide-react';
import { cn } from '../../utils/helpers';

export function Sidebar() {
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/transactions', icon: ReceiptText, label: 'Transactions' },
    { to: '/insights', icon: LineChart, label: 'Insights' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-finance-border bg-finance-dark/50 backdrop-blur-xl hidden md:flex flex-col">
      <div className="flex-1 py-8 px-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-finance-accent/10 text-finance-accentDark shadow-[inset_2px_0_0_0_#aa3bff]" 
                  : "text-finance-textMuted hover:bg-finance-card hover:text-finance-textMain"
              )
            }
          >
            <link.icon size={20} />
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
