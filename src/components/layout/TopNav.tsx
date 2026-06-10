import { Bell, LayoutDashboard, LogOut, Menu, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '../../types/nav.types';
import { useAuth } from '../../hooks/useAuth';
import { ThemeToggle } from '../ui/ThemeToggle';
import watchroomLogo from '../../assets/watcroomLogo.png';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export function TopNav() {
  const { user, logout } = useAuth();

  return (
    <nav
      aria-label="Main navigation"
      data-aos="fade-down"
      data-aos-duration="600"
      className="fixed left-0 right-0 top-0 z-50 h-16 border-b dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#080c10]/95 light:bg-white/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">

        {/* Left — Logo */}
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <img src={watchroomLogo} alt="WatchRoomTV" className="h-8 w-8 object-contain" />
          <span className="text-[18px] font-medium tracking-tight">
            <span className="dark:text-white light:text-[#0f172a]">Watch</span>
            <span className="text-[#00b4dc]">Room</span>
            <span className="dark:text-white light:text-[#0f172a]">TV</span>
          </span>
        </NavLink>

        {/* Center — Nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
                    isActive
                      ? 'border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-[#f0f4f8] dark:text-white light:text-[#0f172a]'
                      : 'dark:text-[#4a6070] light:text-[#64748b] dark:hover:bg-[#0e1519] light:hover:bg-[#f0f4f8] dark:hover:text-white light:hover:text-[#0f172a]'
                  }`
                }
              >
                <Icon size={16} aria-hidden="true" />
                {item.label}
              </NavLink>
            );
          })}
        </div>

        {/* Right — Producer info + logout */}
        <div className="flex items-center gap-4">

          {/* Notification bell */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative dark:text-[#4a6070] light:text-[#64748b] transition-colors duration-200 dark:hover:text-white light:hover:text-[#0f172a]"
          >
            <Bell size={18} aria-hidden="true" />
            <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-[#00b4dc]" />
          </button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Producer avatar + name */}
          {user && (
            <div className="hidden items-center gap-2.5 md:flex">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-[#f8fafc]">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-[11px] font-medium text-[#00b4dc]">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm dark:text-[#d0e8f0] light:text-[#1e293b]">{user.username}</p>
                <p className="text-[11px] dark:text-[#4a6070] light:text-[#64748b]">{user.email}</p>
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            type="button"
            aria-label="Logout"
            title="Logout"
            onClick={logout}
            className="dark:text-[#4a6070] light:text-[#64748b] transition-colors duration-200 hover:text-red-400"
          >
            <LogOut size={16} aria-hidden="true" />
          </button>

          {/* Mobile menu */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => { console.log('mobile menu'); }}
            className="dark:text-[#4a6070] light:text-[#64748b] md:hidden"
          >
            <Menu size={20} aria-hidden="true" />
          </button>

        </div>
      </div>
    </nav>
  );
}
