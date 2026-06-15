import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className="flex items-center gap-1.5"
    >
      {isDark
        ? <Moon size={13} className="text-[#00b4dc]" aria-hidden="true" />
        : <Sun size={13} className="text-amber-400" aria-hidden="true" />
      }
      <span className="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-300 dark:bg-[#1a2830] light:bg-[#e2e8f0]">
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full shadow-sm transition-transform duration-300 ${
            isDark
              ? 'translate-x-5.5 bg-[#00b4dc]'
              : 'translate-x-0.5 bg-white'
          }`}
        />
      </span>
    </button>
  );
}
