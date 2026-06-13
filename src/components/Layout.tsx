import { Link, useLocation } from "react-router-dom";
import { QrCode, Barcode, KeyRound, Link as LinkIcon, Calculator, Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

const tools = [
  { name: "QR Generator", path: "/", icon: QrCode },
  { name: "Barcode Generator", path: "/barcode-generator", icon: Barcode },
  { name: "Password Generator", path: "/password-generator", icon: KeyRound },
  { name: "URL Shortener", path: "/url-shortener", icon: LinkIcon },
  { name: "Age Calculator", path: "/age-calculator", icon: Calculator },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <QrCode className="w-8 h-8 text-blue-600" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                QRGenius Tools
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6">
              {tools.slice(0, 3).map((t) => (
                <Link
                  key={t.name}
                  to={t.path}
                  className={cn(
                    "text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-2",
                    location.pathname === t.path ? "text-blue-600" : "text-slate-600"
                  )}
                >
                  <t.icon className="w-4 h-4" />
                  {t.name}
                </Link>
              ))}
              <Link to="/articles" className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-2 text-slate-600">
                <BookOpen className="w-4 h-4" /> Articles
              </Link>
            </nav>

            <button 
              className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {tools.map((t) => (
                <Link
                  key={t.name}
                  to={t.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 flex items-center gap-3"
                >
                  <t.icon className="w-5 h-5" />
                  {t.name}
                </Link>
              ))}
              <Link
                to="/articles"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 flex items-center gap-3"
              >
                <BookOpen className="w-5 h-5" /> Articles
              </Link>
            </div>
          </div>
        )}
      </header>

      <div className="flex-grow flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-500" />
              All Tools
            </h3>
            <ul className="space-y-2">
              {tools.map(t => (
                <li key={t.name}>
                  <Link 
                    to={t.path}
                    className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                  >
                    <t.icon className="w-4 h-4" />
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">Did you know?</h3>
            <p className="text-sm text-slate-600 mb-4">
              QR codes can hold up to 7,089 numeric characters or 4,296 alphanumeric characters.
            </p>
            <Link to="/articles/what-is-a-qr-code" className="text-sm font-medium text-blue-600 hover:underline">
              Read more facts →
            </Link>
          </div>
        </aside>
      </div>

      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {tools.map(t => (
                  <li key={t.name}><Link to={t.path} className="hover:text-blue-600">{t.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/articles" className="hover:text-blue-600">Blog & Articles</Link></li>
                <li><Link to="/faq" className="hover:text-blue-600">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/about-us" className="hover:text-blue-600">About Us</Link></li>
                <li><Link to="/contact-us" className="hover:text-blue-600">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="hover:text-blue-600">Terms & Conditions</Link></li>
                <li><Link to="/disclaimer" className="hover:text-blue-600">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} QRGenius Tools. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
