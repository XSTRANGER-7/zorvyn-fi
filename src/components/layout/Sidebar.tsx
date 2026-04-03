import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, LineChart, UserCircle, ShieldCheck, ShieldAlert, KeyRound } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';

export function Sidebar() {
  const { role, toggleRole } = useAuthStore();
  
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/transactions', icon: ReceiptText, label: 'Transactions' },
    { to: '/insights', icon: LineChart, label: 'Insights' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-finance-border bg-finance-dark/50 backdrop-blur-xl hidden md:flex flex-col justify-between">
      <div className="py-8 px-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                isActive 
                  ? "bg-finance-accent/10 text-finance-accentDark shadow-[inset_2px_0_0_0_#eab308]" 
                  : "text-finance-textMuted hover:bg-finance-card hover:text-finance-textMain"
              )
            }
          >
            <link.icon size={20} />
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-finance-border bg-finance-card/20">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-finance-dark border border-finance-border flex items-center justify-center text-finance-textMuted overflow-hidden">
              <UserCircle size={24} />
            </div>
            <div className="flex flex-col flex-1 truncate">
              <span className="text-sm font-semibold text-finance-textMain truncate">
                {role === 'admin' ? 'John Doe (Admin)' : 'Guest User'}
              </span>
              <span className="text-xs text-finance-textMuted flex items-center gap-1">
                {role === 'admin' ? (
                  <><ShieldCheck size={12} className="text-green-400" /> Admin</>
                ) : (
                  <><ShieldAlert size={12} className="text-yellow-400" /> Viewer</>
                )}
              </span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={toggleRole} 
            className="w-full text-xs h-9 justify-start gap-2 border border-finance-border hover:bg-finance-border/50 text-finance-textMuted hover:text-finance-textMain transition-all"
          >
            <KeyRound size={14} />
            Switch to {role === 'admin' ? 'Viewer' : 'Admin'} Mode
          </Button>
        </div>
      </div>
    </aside>
  );
}
