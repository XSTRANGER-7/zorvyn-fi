import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-finance-dark text-finance-textMain font-sans flex flex-col transition-colors duration-300">
      <Navbar />
      <div className="flex flex-1 pt-16 pb-16 md:pb-0 min-w-0 w-full overflow-hidden">
        <Sidebar />
        <main className="flex-1 md:pl-64 flex flex-col items-center min-w-0 w-full overflow-x-hidden">
          <div className="w-full max-w-6xl p-4 md:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 flex-1 min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
