import { useEffect, useRef, useState } from 'react';
import { Bell, LayoutDashboard, LogOut, Menu, Settings, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '../../types/nav.types';
import { useAuth } from '../../hooks/useAuth';
import { ThemeToggle } from '../ui/ThemeToggle';
import watchroomLogo from '../../assets/watcroomLogo.png';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const NOTIFICATIONS = [
  { id: 1, text: 'Midnight Rain is now live and streaming', time: '2m ago', unread: true },
  { id: 2, text: 'Payout of ₦45,200 is processing', time: '1h ago', unread: true },
  { id: 3, text: 'Lagos Nights just hit 10,000 views', time: '3h ago', unread: false },
];

export function TopNav() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notifOpen]);

  function handleNotifToggle() {
    setNotifOpen((v) => !v);
    setHasUnread(false);
  }

  return (
    <>
      <nav
        aria-label="Main navigation"
        data-aos="fade-down"
        data-aos-duration="600"
        className="fixed left-0 right-0 top-0 z-50 h-16 border-b dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#080c10]/95 light:bg-white/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5">

          {/* Logo — icon only */}
          <NavLink to="/dashboard" className="flex items-center" aria-label="Go to dashboard">
            <img src={watchroomLogo} alt="WatchRoomTV" className="h-8 w-8 object-contain" />
          </NavLink>

          {/* Center — nav links (desktop) */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    `flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors duration-150 ${
                      isActive
                        ? 'border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-[#f0f4f8] dark:text-white light:text-[#0f172a]'
                        : 'dark:text-[#4a6070] light:text-[#64748b] dark:hover:bg-[#0e1519] light:hover:bg-[#f0f4f8] dark:hover:text-white light:hover:text-[#0f172a]'
                    }`
                  }
                >
                  <Icon size={15} aria-hidden="true" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">

            {/* Notification bell */}
            <div ref={notifRef} className="relative">
              <button
                type="button"
                aria-label="Notifications"
                aria-expanded={notifOpen}
                onClick={handleNotifToggle}
                className="relative rounded-lg p-2 dark:text-[#4a6070] light:text-[#64748b] transition-colors duration-150 dark:hover:bg-[#0e1519] light:hover:bg-[#f0f4f8] dark:hover:text-white light:hover:text-[#0f172a]"
              >
                <Bell size={17} aria-hidden="true" />
                {hasUnread && (
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#00b4dc]" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white shadow-lg dark:shadow-black/30 light:shadow-black/8">
                  <div className="flex items-center justify-between border-b dark:border-[#1a2830] light:border-[#e2e8f0] px-4 py-3">
                    <p className="text-sm font-medium dark:text-white light:text-[#0f172a]">Notifications</p>
                    <button
                      type="button"
                      aria-label="Close notifications"
                      onClick={() => setNotifOpen(false)}
                      className="rounded p-0.5 dark:text-[#4a6070] light:text-[#64748b] transition-colors dark:hover:text-white light:hover:text-[#0f172a]"
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                  <ul className="divide-y dark:divide-[#1a2830] light:divide-[#e2e8f0]">
                    {NOTIFICATIONS.map((n) => (
                      <li
                        key={n.id}
                        className="flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors duration-150 dark:hover:bg-[#111a20] light:hover:bg-[#f8fafc]"
                      >
                        <div
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                            n.unread ? 'bg-[#00b4dc]' : 'dark:bg-[#1a2830] light:bg-[#e2e8f0]'
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm leading-snug dark:text-[#d0e8f0] light:text-[#1e293b]">{n.text}</p>
                          <p className="mt-0.5 text-xs dark:text-[#4a6070] light:text-[#64748b]">{n.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t dark:border-[#1a2830] light:border-[#e2e8f0] px-4 py-2.5">
                    <button
                      type="button"
                      onClick={() => setHasUnread(false)}
                      className="text-xs text-[#00b4dc] hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Producer avatar + name (desktop) */}
            {user && (
              <div className="ml-1 hidden items-center gap-2.5 md:flex">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-[#f8fafc]">
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
                  <p className="text-xs dark:text-[#4a6070] light:text-[#64748b]">{user.email}</p>
                </div>
              </div>
            )}

            {/* Log out */}
            <button
              type="button"
              aria-label="Log out"
              title="Log out"
              onClick={logout}
              className="rounded-lg p-2 dark:text-[#4a6070] light:text-[#64748b] transition-colors duration-150 dark:hover:bg-[#0e1519] light:hover:bg-[#f0f4f8] hover:text-red-400"
            >
              <LogOut size={16} aria-hidden="true" />
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-lg p-2 dark:text-[#4a6070] light:text-[#64748b] transition-colors duration-150 dark:hover:bg-[#0e1519] light:hover:bg-[#f0f4f8] dark:hover:text-white light:hover:text-[#0f172a] md:hidden"
            >
              {mobileOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 z-40 border-b dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#080c10] light:bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-0.5 px-5 py-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }: { isActive: boolean }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                      isActive
                        ? 'dark:bg-[#0e1519] light:bg-[#f0f4f8] dark:text-white light:text-[#0f172a]'
                        : 'dark:text-[#4a6070] light:text-[#64748b] dark:hover:bg-[#0e1519] light:hover:bg-[#f0f4f8] dark:hover:text-white light:hover:text-[#0f172a]'
                    }`
                  }
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </NavLink>
              );
            })}

            {user && (
              <div className="mt-1 border-t dark:border-[#1a2830] light:border-[#e2e8f0] pt-3">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-[#f8fafc]">
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
                    <p className="text-xs dark:text-[#4a6070] light:text-[#64748b]">{user.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
