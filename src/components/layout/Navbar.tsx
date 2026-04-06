import { useState, useRef, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { User, ShieldAlert, Check } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../utils/helpers';

export function Navbar() {
  const { role, setRole } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-finance-card/80 backdrop-blur-md border-b border-finance-border z-50 px-4 md:px-6 flex items-center justify-between shadow-sm">
      <div 
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <img src="/favicon.png" alt="Z" className="w-7 h-7 object-contain" />
        <span className="font-semibold text-xl tracking-wide -ml-0.5">orvynfi</span>
      </div>
      
      <div className="flex items-center gap-3 md:gap-4">
        <ThemeToggle />
        
        {/* Profile Dropdown */}
        <div className="relative md:hidden" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full bg-finance-dark/50 border border-finance-border flex items-center justify-center text-finance-textMuted hover:text-finance-textMain hover:border-finance-accent transition-colors relative"
            aria-label="User Profile"
          >
            <User size={18} />
            {role === 'admin' && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-finance-dark shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-finance-card border border-finance-border rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 p-1">
              <div className="px-3 py-2 border-b border-finance-border/50 mb-1">
                <p className="text-xs text-finance-textMuted font-medium uppercase tracking-wider">Active Mode</p>
              </div>
              
              <button 
                onClick={() => { setRole('viewer'); setDropdownOpen(false); }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors",
                  role === 'viewer' ? "bg-finance-accent/10 text-finance-accent font-medium" : "text-finance-textMain hover:bg-finance-dark/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>Viewer Mode</span>
                </div>
                {role === 'viewer' && <Check size={16} />}
              </button>
              
              <button 
                onClick={() => { setRole('admin'); setDropdownOpen(false); }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors",
                  role === 'admin' ? "bg-finance-accent/10 text-green-400 font-medium" : "text-finance-textMain hover:bg-finance-dark/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} />
                  <span>Admin Mode</span>
                </div>
                {role === 'admin' && <Check size={16} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
