import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Map, FlaskConical, TestTubeDiagonal, Radio,
  ClipboardList, FileBarChart, Settings, ChevronLeft, ChevronRight, Leaf, LogOut,
  Building2, TreePine, Microscope, Wifi, Beaker, Droplets, Upload,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../lib/auth';

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard' },

  // Hierarchical structure
  { to: '/app/clients', icon: Users, label: 'Clients' },
  { to: '/app/ranches', icon: Building2, label: 'Ranches' },
  { to: '/app/blocks', icon: TreePine, label: 'Blocks' },

  // Great Crops services
  { to: '/app/soil-microbiology', icon: Microscope, label: 'Soil Microbiology' },
  { to: '/app/remote-sensing', icon: Wifi, label: 'Remote Sensing' },
  { to: '/app/soil-chemistry', icon: Beaker, label: 'Soil Chemistry' },
  { to: '/app/water-chemistry', icon: Droplets, label: 'Water Chemistry' },
  { to: '/app/soil-monitoring', icon: Radio, label: 'Soil Monitoring' },

  // Data management
  { to: '/app/data-import', icon: Upload, label: 'Data Import' },

  // Legacy/other
  { to: '/app/treatments', icon: FlaskConical, label: 'Treatments' },
  { to: '/app/field-visits', icon: ClipboardList, label: 'Field Visits' },
  { to: '/app/reports', icon: FileBarChart, label: 'Reports' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onMobileClose?: () => void;
}

export function Sidebar({ collapsed, onToggle, onMobileClose }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-charcoal text-white z-40 flex flex-col transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10 flex-shrink-0">
        <img src="/logo.svg" alt="Great Crops" className="w-9 h-9 flex-shrink-0" />
        {!collapsed && (
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className="text-lg font-bold tracking-tight whitespace-nowrap">Great Crops</span>
            <Leaf className="w-4 h-4 text-green-deep-light flex-shrink-0" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/app'}
            onClick={onMobileClose}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-green-deep text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-white/10 hidden lg:block">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>

      {/* User info + Logout */}
      <div className="px-2 py-2 border-t border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-brown-warm flex items-center justify-center text-xs font-bold">
              TA
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">Tomas Aguayo</p>
              <p className="text-xs text-gray-400 truncate">CCA #12847</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors text-sm',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
