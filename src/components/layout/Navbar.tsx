import { Wallet } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-finance-border glass z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-finance-accent/20 flex items-center justify-center">
          <Wallet size={18} className="text-finance-accent" />
        </div>
        <span className="font-semibold text-lg tracking-wide">Zorvyn</span>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
