import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, LineChart, Grid } from 'lucide-react';
import { cn } from '../../utils/helpers';

export function MobileNav() {
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/transactions', icon: ReceiptText, label: 'Transactions' },
    { to: '/insights', icon: LineChart, label: 'Insights' },
    { to: '/services', icon: Grid, label: 'Services' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-finance-border bg-finance-dark/95 backdrop-blur-xl md:hidden flex items-center justify-around z-50 px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {links.map((link) => (
        <NavLink
           key={link.to}
           to={link.to}
           className={({ isActive }) =>
             cn(
               "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
               isActive 
                 ? "text-finance-accent scale-105" 
                 : "text-finance-textMuted hover:text-finance-textMain"
             )
           }
        >
          <link.icon size={20} />
          <span className="text-[10px] font-medium">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
