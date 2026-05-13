import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/research', label: 'Research' },
  { to: '/programs', label: 'Programs' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function WebsiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/60'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img src="/logo.svg" alt="Great Crops" className="w-9 h-9" />
              <div className="flex flex-col leading-tight">
                <span className={cn(
                  'text-lg font-serif font-bold tracking-tight transition-colors',
                  scrolled ? 'text-charcoal' : 'text-white'
                )}>
                  Great Crops
                </span>
                <span className={cn(
                  'text-[10px] uppercase tracking-[0.15em] transition-colors',
                  scrolled ? 'text-charcoal-lighter' : 'text-white/60'
                )}>
                  Agricultural Consulting
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-medium transition-colors relative pb-1',
                      scrolled
                        ? isActive
                          ? 'text-green-deep'
                          : 'text-charcoal-lighter hover:text-green-deep'
                        : isActive
                          ? 'text-white'
                          : 'text-white/70 hover:text-white',
                      isActive && 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-green-deep after:rounded-full'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                'md:hidden p-2 rounded-lg transition-colors',
                scrolled ? 'text-charcoal hover:bg-gray-100' : 'text-white hover:bg-white/10'
              )}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-green-deep/10 text-green-deep'
                        : 'text-charcoal hover:bg-gray-50'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="Great Crops" className="w-9 h-9" />
                <span className="text-lg font-serif font-bold">Great Crops</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Evidence-based agronomic consulting for California permanent crops.
                Advancing soil health through applied research since 2009.
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                CCA Certified Crop Adviser — American Society of Agronomy
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-serif font-semibold mb-4 text-sm text-gray-300">Navigation</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif font-semibold mb-4 text-sm text-gray-300">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>1175 Calle Cordoniz Rd</li>
                <li>Los Osos, CA 93402</li>
                <li className="pt-1">
                  <a href="mailto:tomas@greatcrops.com" className="hover:text-white transition-colors">
                    tomas@greatcrops.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Great Crops Agricultural Consulting. All rights reserved.
            </p>
            <Link
              to="/portal"
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
            >
              Client Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
