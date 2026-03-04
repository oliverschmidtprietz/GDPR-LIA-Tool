import React, { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  onOpenGuide?: () => void;
  onOpenFAQ?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onOpenGuide, onOpenFAQ }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-brand-black font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 no-print transition-all border-b border-transparent">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-brand-black p-1.5 rounded-lg group-hover:bg-brand-lime transition-colors duration-300">
              <ShieldCheck className="w-5 h-5 text-white group-hover:text-brand-black transition-colors duration-300" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-brand-black leading-none">LIA.Tool</h1>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mt-0.5">GDPR Compliance</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
             <button onClick={onOpenGuide} className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors bg-transparent border-none cursor-pointer">Guide</button>
             <button onClick={onOpenFAQ} className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors bg-transparent border-none cursor-pointer">FAQ</button>
             <div className="hidden sm:block h-4 w-px bg-gray-200"></div>
             <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">V1.0</span>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center w-full">
        {children}
      </main>

      <footer className="bg-white text-gray-400 py-12 no-print mt-auto border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} LIA Tool. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="https://onezero.legal/contact" target="_blank" rel="noopener noreferrer" className="hover:text-brand-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};