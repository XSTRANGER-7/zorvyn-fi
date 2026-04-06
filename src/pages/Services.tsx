import { Card } from '../components/ui/Card';
import { CreditCard, WalletCards, Landmark, TrendingUp, Percent, Briefcase } from 'lucide-react';

export function Services() {
  return (
    <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto w-full animate-in fade-in duration-500">
      <header>
        <div className="flex items-center gap-3 mb-2"> 
          <h1 className="text-3xl font-bold">More Services</h1>
        </div>
        {/* <p className="text-finance-textMuted sm:text-lg">Explore all available financial instruments and offerings.</p> */}
      </header>

      {/* Services Links Grid */}
      <Card glow className="p-6 lg:p-8 border border-finance-border/60">
        <h3 className="font-semibold text-lg text-finance-textMain mb-8 border-b border-finance-border/50 pb-4">Financial Tools & Instruments</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4 w-full">
          {[
            { icon: CreditCard, label: 'Debit Card' },
            { icon: WalletCards, label: 'Credit Card' },
            { icon: Landmark, label: 'Fixed Deposits' },
            { icon: TrendingUp, label: 'Mutual Funds' },
            { icon: Percent, label: 'Loans' },
            { icon: Briefcase, label: 'SIP' },
          ].map((service, idx) => (
            <button 
              key={idx} 
              className="flex flex-col items-center justify-center gap-4 group focus:outline-none w-full hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-finance-dark/80 border border-finance-border flex items-center justify-center text-finance-textMuted group-hover:border-finance-accent group-hover:text-finance-accent shadow-sm group-hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] transition-all duration-300">
                <service.icon size={28} className="sm:w-8 sm:h-8" />
              </div>
              <span className="text-sm font-medium text-finance-textMuted group-hover:text-finance-textMain transition-colors text-center">
                {service.label}
              </span>
            </button>
          ))}
        </div>
      </Card>
      
      {/* Placeholder for future growth */}
      <Card className="p-6 lg:p-8 flex flex-col items-center justify-center py-20 border border-dashed border-finance-border/70 text-finance-textMuted">
         <p className="text-sm">Additional premium banking services will be unlocked here.</p>
      </Card>
    </div>
  );
}
