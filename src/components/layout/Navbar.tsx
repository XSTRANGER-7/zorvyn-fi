import { Wallet, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';

export function Navbar() {
  const { role, toggleRole } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-finance-border glass z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-finance-accent/20 flex items-center justify-center">
          <Wallet size={18} className="text-finance-accent" />
        </div>
        <span className="font-semibold text-lg tracking-wide">Zorvyn</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-finance-textMuted bg-finance-dark px-3 py-1.5 rounded-full border border-finance-border">
          {role === 'admin' ? (
            <ShieldCheck size={16} className="text-green-400" />
          ) : (
            <ShieldAlert size={16} className="text-yellow-400" />
          )}
          <span className="capitalize">{role} View</span>
        </div>
        <Button variant="ghost" onClick={toggleRole} className="text-xs h-8 px-3">
          Switch Role
        </Button>
      </div>
    </header>
  );
}
