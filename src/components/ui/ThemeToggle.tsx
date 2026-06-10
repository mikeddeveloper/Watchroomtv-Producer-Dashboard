import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="relative h-7 w-14 cursor-pointer rounded-full transition-colors duration-300 dark:bg-[#1a2830] light:bg-[#e2e8f0]"
    >
      <Sun
        size={12}
        aria-hidden="true"
        className={`absolute left-1.5 top-1/2 -translate-y-1/2 text-amber-400 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}
      />
      <Moon
        size={12}
        aria-hidden="true"
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 text-[#00b4dc] transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
      />
      <span
        className={`absolute top-1 h-5 w-5 rounded-full transition-transform duration-300 ${
          isDark ? 'translate-x-7 bg-[#00b4dc]' : 'translate-x-1 bg-white shadow-sm'
        }`}
      />
    </button>
  );
}
