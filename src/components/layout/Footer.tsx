import { ThemeToggle } from './ThemeToggle';
import { Mail, Globe, MessageCircle, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-finance-card/50 backdrop-blur-md border-t border-finance-border mt-auto py-10 px-6 lg:px-8 transition-colors duration-300 z-10">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        
        <div className="flex flex-col items-center md:items-start max-w-sm">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-finance-accent to-finance-accentDark flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(234,179,8,0.4)]">
               Z
             </div>
             <span className="text-2xl font-bold tracking-wider text-finance-textMain">Zorvynfi</span>
          </div>
          <p className="text-sm text-finance-textMuted text-center md:text-left mb-6 leading-relaxed">
            Empowering your financial future with professional-grade analytics, enterprise-level security, and a beautiful interface.
          </p>
          <div className="flex items-center gap-4 border border-finance-border rounded-full p-2 pl-4 bg-finance-dark/50">
            <span className="text-sm font-medium text-finance-textMain">Appearance:</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-14 text-sm text-finance-textMuted">
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-finance-textMain uppercase tracking-widest text-xs mb-2">Platform</h4>
            <a href="#" className="hover:text-finance-accent transition-colors flex items-center gap-1 group">
              Overview <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="#" className="hover:text-finance-accent transition-colors">Trade Desk</a>
            <a href="#" className="hover:text-finance-accent transition-colors">Portfolios</a>
            <a href="#" className="hover:text-finance-accent transition-colors">Pro Signals</a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-finance-textMain uppercase tracking-widest text-xs mb-2">Resources</h4>
            <a href="#" className="hover:text-finance-accent transition-colors">Documentation</a>
            <a href="#" className="hover:text-finance-accent transition-colors">API Reference</a>
            <a href="#" className="hover:text-finance-accent transition-colors">Support Center</a>
            <a href="#" className="hover:text-finance-accent transition-colors">Changelog</a>
          </div>
        </div>

      </div>
      
      <div className="max-w-6xl mx-auto w-full mt-12 pt-6 border-t border-finance-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-finance-textMuted">
        <p>&copy; {new Date().getFullYear()} Zorvynfi Financial Ltd. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-finance-textMain transition-colors"><MessageCircle size={18}/></a>
          <a href="#" className="hover:text-finance-textMain transition-colors"><Globe size={18}/></a>
          <a href="#" className="hover:text-finance-textMain transition-colors"><Mail size={18}/></a>
        </div>
      </div>
    </footer>
  );
}
