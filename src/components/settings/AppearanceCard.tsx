import { CheckCircle2, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ui/ThemeToggle';

export function AppearanceCard() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5"
    >
      <h3 className="mb-1 text-sm font-medium dark:text-white light:text-[#0f172a]">Appearance</h3>
      <p className="mb-5 text-xs dark:text-[#4a6070] light:text-[#64748b]">
        Customize your dashboard experience
      </p>

      {/* Theme toggle row */}
      <div className="flex items-center justify-between border-b dark:border-[#1a2830] light:border-[#e2e8f0] pb-4">
        <div className="flex items-center gap-3">
          <Monitor size={18} className="text-[#00b4dc]" aria-hidden="true" />
          <div>
            <p className="text-sm dark:text-white light:text-[#0f172a]">Theme</p>
            <p className="text-xs dark:text-[#4a6070] light:text-[#64748b]">
              Switch between dark and light mode
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs dark:text-[#4a6070] light:text-[#64748b]">
            {isDark ? 'Dark' : 'Light'}
          </span>
          <ThemeToggle />
        </div>
      </div>

      {/* Theme preview cards */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {/* Dark preview */}
        <button
          type="button"
          onClick={() => { if (!isDark) toggleTheme(); }}
          className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all duration-200 bg-[#0e1519] ${
            isDark ? 'border-[#00b4dc]' : 'dark:border-[#1a2830] light:border-[#e2e8f0]'
          }`}
        >
          {isDark && (
            <CheckCircle2
              size={14}
              className="absolute right-2 top-2 text-[#00b4dc]"
              aria-hidden="true"
            />
          )}
          <div className="space-y-1.5">
            <div className="h-2 rounded-full bg-[#1a2830]" />
            <div className="h-2 w-3/4 rounded-full bg-[#1a2830]" />
            <div className="h-2 w-1/2 rounded-full bg-[#1a2830]" />
          </div>
          <p className="mt-2 text-center text-xs text-[#4a6070]">Dark</p>
        </button>

        {/* Light preview */}
        <button
          type="button"
          onClick={() => { if (isDark) toggleTheme(); }}
          className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all duration-200 bg-white ${
            !isDark ? 'border-[#00b4dc]' : 'dark:border-[#1a2830] light:border-[#e2e8f0]'
          }`}
        >
          {!isDark && (
            <CheckCircle2
              size={14}
              className="absolute right-2 top-2 text-[#00b4dc]"
              aria-hidden="true"
            />
          )}
          <div className="space-y-1.5">
            <div className="h-2 rounded-full bg-[#e2e8f0]" />
            <div className="h-2 w-3/4 rounded-full bg-[#e2e8f0]" />
            <div className="h-2 w-1/2 rounded-full bg-[#e2e8f0]" />
          </div>
          <p className="mt-2 text-center text-xs text-[#64748b]">Light</p>
        </button>
      </div>
    </div>
  );
}
