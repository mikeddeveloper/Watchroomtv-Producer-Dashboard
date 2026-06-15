import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff, KeyRound } from 'lucide-react';
import type { ChangePasswordPayload } from '../../types/settings.types';

interface PasswordCardProps {
  onChangePassword: (payload: ChangePasswordPayload) => Promise<void>;
  isLoading: boolean;
  successMessage: string | null;
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

export function PasswordCard({
  onChangePassword,
  isLoading,
  successMessage,
  error,
}: PasswordCardProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const score = getStrengthScore(newPassword);

  function validate(): string | null {
    if (newPassword.length < 8) return 'New password must be at least 8 characters';
    if (!/[A-Z]/.test(newPassword)) return 'New password must contain at least one uppercase letter';
    if (!/[0-9]/.test(newPassword)) return 'New password must contain at least one number';
    if (!/[^A-Za-z0-9]/.test(newPassword)) return 'New password must contain at least one special character';
    if (newPassword !== confirmPassword) return 'Passwords do not match';
    return null;
  }

  function handleSubmit(): void {
    const msg = validate();
    if (msg) {
      setValidationError(msg);
      return;
    }
    setValidationError(null);
    void onChangePassword({ currentPassword, newPassword, confirmPassword });
  }

  const displayError = validationError ?? error;

  return (
    <div
      className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-6"
    >
      <p className="mb-5 text-sm font-medium dark:text-white light:text-[#0f172a]">Change Password</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        noValidate
      >
        {/* Current password */}
        <div className="mb-4">
          <label
            htmlFor="pw-current"
            className="mb-2 block text-sm font-medium dark:text-[#4a6070] light:text-[#64748b]"
          >
            Current Password
          </label>
          <div className="relative">
            <input
              id="pw-current"
              type={showCurrent ? 'text' : 'password'}
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => { setCurrentPassword(e.target.value); }}
              placeholder="••••••••"
              className="w-full rounded-lg border dark:border-[#1e2e38] light:border-[#cbd5e1] dark:bg-[#111a20] light:bg-[#f8fafc] px-4 py-3 pr-11 dark:text-[#d0e8f0] light:text-[#1e293b] outline-none transition-all duration-200 placeholder:dark:text-[#2a3e4a] focus:border-[#00b4dc] focus:ring-2 focus:ring-[#00b4dc]/10"
            />
            <button
              type="button"
              aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
              onClick={() => { setShowCurrent((v) => !v); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-[#2a4050] light:text-[#94a3b8] transition-colors hover:text-[#00b4dc]"
            >
              {showCurrent ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* New password */}
        <div className="mb-2">
          <label
            htmlFor="pw-new"
            className="mb-2 block text-sm font-medium dark:text-[#4a6070] light:text-[#64748b]"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="pw-new"
              type={showNew ? 'text' : 'password'}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => { setNewPassword(e.target.value); }}
              placeholder="••••••••"
              className="w-full rounded-lg border dark:border-[#1e2e38] light:border-[#cbd5e1] dark:bg-[#111a20] light:bg-[#f8fafc] px-4 py-3 pr-11 dark:text-[#d0e8f0] light:text-[#1e293b] outline-none transition-all duration-200 placeholder:dark:text-[#2a3e4a] focus:border-[#00b4dc] focus:ring-2 focus:ring-[#00b4dc]/10"
            />
            <button
              type="button"
              aria-label={showNew ? 'Hide new password' : 'Show new password'}
              onClick={() => { setShowNew((v) => !v); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-[#2a4050] light:text-[#94a3b8] transition-colors hover:text-[#00b4dc]"
            >
              {showNew ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Strength indicator */}
        {newPassword.length > 0 && (
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

        {/* Confirm password */}
        <div className="mb-5">
          <label
            htmlFor="pw-confirm"
            className="mb-2 block text-sm font-medium dark:text-[#4a6070] light:text-[#64748b]"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="pw-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => { setConfirmPassword(e.target.value); }}
              placeholder="••••••••"
              className="w-full rounded-lg border dark:border-[#1e2e38] light:border-[#cbd5e1] dark:bg-[#111a20] light:bg-[#f8fafc] px-4 py-3 pr-11 dark:text-[#d0e8f0] light:text-[#1e293b] outline-none transition-all duration-200 placeholder:dark:text-[#2a3e4a] focus:border-[#00b4dc] focus:ring-2 focus:ring-[#00b4dc]/10"
            />
            <button
              type="button"
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
              onClick={() => { setShowConfirm((v) => !v); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-[#2a4050] light:text-[#94a3b8] transition-colors hover:text-[#00b4dc]"
            >
              {showConfirm ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!currentPassword || !newPassword || !confirmPassword || isLoading}
          className="flex items-center gap-2 rounded-lg bg-[#00b4dc] px-6 py-3 text-sm font-medium text-[#04121a] transition-all duration-200 hover:bg-[#00cef8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
              <KeyRound size={15} aria-hidden="true" />
              <span>Update password</span>
            </>
          )}
        </button>
      </form>

      {/* Banners */}
      {successMessage && (
        <div
          role="alert"
          className="mt-5 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-400"
        >
          <CheckCircle size={16} aria-hidden="true" className="shrink-0" />
          {successMessage}
        </div>
      )}
      {displayError && (
        <div
          role="alert"
          className="mt-5 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle size={16} aria-hidden="true" className="shrink-0" />
          {displayError}
        </div>
      )}
    </div>
  );
}
