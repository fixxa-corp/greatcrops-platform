import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Sprout, Leaf, Map, FlaskConical, TestTubeDiagonal,
  ClipboardList, FileBarChart, LogOut, Menu, X, LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/client', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/client/fields', icon: Map, label: 'My Fields', end: false },
  { to: '/client/treatments', icon: FlaskConical, label: 'Treatments', end: false },
  { to: '/client/lab-results', icon: TestTubeDiagonal, label: 'Lab Results', end: false },
  { to: '/client/visits', icon: ClipboardList, label: 'Field Visits', end: false },
  { to: '/client/reports', icon: FileBarChart, label: 'Reports', end: false },
];

export function ClientLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/portal', { replace: true });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-deep rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-charcoal">Great Crops</span>
              <Leaf className="w-4 h-4 text-green-deep" />
              <span className="text-sm text-charcoal-lighter ml-2 hidden sm:inline">| Grower Portal</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-green-deep/10 text-green-deep'
                        : 'text-charcoal-lighter hover:bg-gray-100'
                    )
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* User + logout */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-charcoal-lighter hidden sm:inline">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-charcoal-lighter hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-charcoal hover:bg-gray-100 rounded-lg"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-green-deep/10 text-green-deep'
                      : 'text-charcoal-lighter hover:bg-gray-100'
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
