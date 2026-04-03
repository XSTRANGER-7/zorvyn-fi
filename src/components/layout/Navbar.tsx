import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-finance-border glass z-50 px-4 md:px-6 flex items-center justify-between">
      <div 
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <img src="/favicon.png" alt="Z" className="w-7 h-7 object-contain" />
        <span className="font-semibold text-xl tracking-wide -ml-0.5">orvynfi</span>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
