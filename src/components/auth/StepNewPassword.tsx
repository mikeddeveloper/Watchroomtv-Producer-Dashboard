import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { AlertCircle, Eye, EyeOff, KeyRound } from 'lucide-react';

interface StepNewPasswordProps {
  onNext: (newPassword: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

function getStrengthScore(pwd: string): number {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_TEXT_COLORS = ['', 'text-red-500', 'text-amber-500', 'text-blue-400', 'text-[#00b4dc]'];
const STRENGTH_BAR_COLORS = ['bg-red-500', 'bg-amber-500', 'bg-blue-400', 'bg-[#00b4dc]'];

export function StepNewPassword({ onNext, isLoading, error }: StepNewPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const score = getStrengthScore(password);

  function validate(): string | null {
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one special character';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  }

  function handleSubmit(): void {
    const msg = validate();
    if (msg) {
      setValidationError(msg);
      return;
    }
    setValidationError(null);
    void onNext(password);
  }

  const displayError = validationError ?? error;

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <KeyRound size={32} className="text-[#00b4dc]" aria-hidden="true" />
      </div>
      <h2 className="mb-2 text-center text-lg font-medium dark:text-white light:text-[#0f172a]">Set new password</h2>
      <p className="mb-7 text-center text-sm dark:text-[#4a6070] light:text-[#64748b]">
        Choose a strong password for your account
      </p>

      {displayError && (
        <div
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle size={16} aria-hidden="true" className="shrink-0" />
          {displayError}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        noValidate
      >
        <div className="mb-2">
          <label
            htmlFor="np-password"
            className="mb-2 block text-sm font-medium dark:text-[#4a6070] light:text-[#64748b]"
          >
            New password
          </label>
          <div className="relative">
            <input
              id="np-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
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

        {password.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    score > i ? STRENGTH_BAR_COLORS[score - 1] : 'dark:bg-[#1e2e38] light:bg-[#e2e8f0]'
                  }`}
                />
              ))}
            </div>
            {score > 0 && (
              <span className={`text-xs ${STRENGTH_TEXT_COLORS[score]}`}>
                {STRENGTH_LABELS[score]}
              </span>
            )}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="np-confirm"
            className="mb-2 block text-sm font-medium dark:text-[#4a6070] light:text-[#64748b]"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="np-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border dark:border-[#1e2e38] light:border-[#cbd5e1] dark:bg-[#111a20] light:bg-[#f8fafc] px-4 py-3 pr-11 dark:text-[#d0e8f0] light:text-[#1e293b] outline-none transition-all duration-200 placeholder:dark:text-[#2a3e4a] placeholder:light:text-[#94a3b8] focus:border-[#00b4dc] focus:ring-2 focus:ring-[#00b4dc]/10"
            />
            <button
              type="button"
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-[#2a4050] light:text-[#94a3b8] transition-colors hover:text-[#00b4dc]"
            >
              {showConfirm
                ? <EyeOff size={16} aria-hidden="true" />
                : <Eye size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !password || !confirmPassword}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00b4dc] py-3 text-sm font-medium text-[#04121a] transition-all duration-200 hover:bg-[#00cef8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-[#04121a] border-t-transparent"
              />
              <span>Updating…</span>
            </>
          ) : (
            <>
              <KeyRound size={16} aria-hidden="true" />
              <span>Update password</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
