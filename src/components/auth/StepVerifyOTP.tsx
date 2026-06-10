import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';
import { AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';

interface StepVerifyOTPProps {
  email: string;
  onNext: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function StepVerifyOTP({ email, onNext, onResend, isLoading, error }: StepVerifyOTPProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill('') as string[]);
  const [resendCooldown, setResendCooldown] = useState(30);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setTimeout(() => {
      setResendCooldown((n) => n - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [resendCooldown]);

  function handleChange(i: number, e: ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>): void {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = [...otp];
    for (let j = 0; j < pasted.length; j++) next[j] = pasted[j] ?? '';
    setOtp(next);
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  }

  function handleResend(): void {
    void onResend();
    setResendCooldown(30);
  }

  const otpValue = otp.join('');

  return (
    <div data-aos="fade-up">
      <div className="mb-4 flex justify-center">
        <ShieldCheck size={32} className="text-[#00b4dc]" aria-hidden="true" />
      </div>
      <h2 className="mb-2 text-center text-lg font-medium dark:text-white light:text-[#0f172a]">Check your email</h2>
      <p className="mb-6 text-center text-sm dark:text-[#4a6070] light:text-[#64748b]">
        We sent a 6-digit code to{' '}
        <span className="font-medium dark:text-[#d0e8f0] light:text-[#1e293b]">{email}</span>
      </p>

      <div className="mb-5 flex justify-center gap-3">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { if (el) inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            aria-label={`OTP digit ${i + 1}`}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(i, e)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className="h-12 w-11 rounded-lg border dark:border-[#1e2e38] light:border-[#cbd5e1] dark:bg-[#111a20] light:bg-[#f8fafc] text-center text-lg font-medium dark:text-[#d0e8f0] light:text-[#1e293b] outline-none transition-all duration-200 focus:border-[#00b4dc] focus:ring-2 focus:ring-[#00b4dc]/10"
          />
        ))}
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle size={16} aria-hidden="true" className="shrink-0" />
          {error}
        </div>
      )}

      <button
        type="button"
        disabled={otpValue.length < 6 || isLoading}
        onClick={() => { void onNext(otpValue); }}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00b4dc] py-3 text-sm font-medium text-[#04121a] transition-all duration-200 hover:bg-[#00cef8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-[#04121a] border-t-transparent"
            />
            <span>Verifying…</span>
          </>
        ) : (
          <>
            <CheckCircle size={16} aria-hidden="true" />
            <span>Verify code</span>
          </>
        )}
      </button>

      <div className="mt-4 text-center">
        {resendCooldown > 0 ? (
          <p className="text-xs dark:text-[#4a6070] light:text-[#64748b]">Resend code in {resendCooldown}s</p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-xs text-[#00b4dc] underline transition-colors hover:text-[#00cef8]"
          >
            Resend code
          </button>
        )}
      </div>
    </div>
  );
}
