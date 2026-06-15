import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { AlertCircle, Eye, EyeOff, LogIn } from 'lucide-react';
import type { LoginCredentials } from '../../types/auth.types';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  onForgotPassword: () => void;
  isLoading: boolean;
  error: string | null;
}

export function LoginForm({ onSubmit, onForgotPassword, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void onSubmit({ email, password });
      }}
      noValidate
    >
      {error && (
        <div
          role="alert"
          data-aos="fade-down"
          className="mb-5 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle size={16} aria-hidden="true" className="shrink-0" />
          {error}
        </div>
      )}

      <div data-aos="fade-up" data-aos-delay="100" className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium dark:text-[#4a6070] light:text-[#64748b]"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="producer@watchroomtv.com"
          className="w-full rounded-lg border dark:border-[#1e2e38] light:border-[#cbd5e1] dark:bg-[#111a20] light:bg-[#f8fafc] px-4 py-3 dark:text-[#d0e8f0] light:text-[#1e293b] outline-none transition-all duration-200 placeholder:dark:text-[#2a3e4a] placeholder:light:text-[#94a3b8] focus:border-[#00b4dc] focus:ring-2 focus:ring-[#00b4dc]/10"
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="200" className="mb-2">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium dark:text-[#4a6070] light:text-[#64748b]"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border dark:border-[#1e2e38] light:border-[#cbd5e1] dark:bg-[#111a20] light:bg-[#f8fafc] px-4 py-3 pr-11 dark:text-[#d0e8f0] light:text-[#1e293b] outline-none transition-all duration-200 placeholder:dark:text-[#2a3e4a] placeholder:light:text-[#94a3b8] focus:border-[#00b4dc] focus:ring-2 focus:ring-[#00b4dc]/10"
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-[#2a4050] light:text-[#94a3b8] transition-colors hover:text-[#00b4dc]"
          >
            {showPassword
              ? <EyeOff size={16} aria-hidden="true" />
              : <Eye size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="mb-6 text-right">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-xs dark:text-[#4a6070] light:text-[#64748b] transition-colors hover:text-[#00b4dc]"
        >
          Forgot password?
        </button>
      </div>

      <div data-aos="fade-up" data-aos-delay="300">
        <button
          type="submit"
          disabled={isLoading || !email || !password}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00b4dc] py-3 text-sm font-medium text-[#04121a] transition-all duration-200 hover:bg-[#00cef8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-[#04121a] border-t-transparent"
              />
              <span>Signing in…</span>
            </>
          ) : (
            <>
              <LogIn size={16} aria-hidden="true" />
              <span>Sign in</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
