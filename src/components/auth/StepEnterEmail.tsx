import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Mail, Send } from 'lucide-react';

interface StepEnterEmailProps {
  onNext: (email: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function StepEnterEmail({ onNext, isLoading, error }: StepEnterEmailProps) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  return (
    <div data-aos="fade-up">
      <div className="mb-4 flex justify-center">
        <Mail size={32} className="text-[#00b4dc]" aria-hidden="true" />
      </div>
      <h2 className="mb-2 text-center text-lg font-medium dark:text-white light:text-[#0f172a]">Forgot your password?</h2>
      <p className="mb-7 text-center text-sm dark:text-[#4a6070] light:text-[#64748b]">
        Enter your producer email and we'll send you a one-time code
      </p>

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle size={16} aria-hidden="true" className="shrink-0" />
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void onNext(email);
        }}
        noValidate
      >
        <div className="mb-5">
          <label
            htmlFor="fp-email"
            className="mb-2 block text-sm font-medium dark:text-[#4a6070] light:text-[#64748b]"
          >
            Email address
          </label>
          <input
            id="fp-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="producer@watchroomtv.com"
            className="w-full rounded-lg border dark:border-[#1e2e38] light:border-[#cbd5e1] dark:bg-[#111a20] light:bg-[#f8fafc] px-4 py-3 dark:text-[#d0e8f0] light:text-[#1e293b] outline-none transition-all duration-200 placeholder:dark:text-[#2a3e4a] placeholder:light:text-[#94a3b8] focus:border-[#00b4dc] focus:ring-2 focus:ring-[#00b4dc]/10"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !email}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00b4dc] py-3 text-sm font-medium text-[#04121a] transition-all duration-200 hover:bg-[#00cef8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-[#04121a] border-t-transparent"
              />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              <span>Send code</span>
            </>
          )}
        </button>
      </form>

      <button
        type="button"
        onClick={() => { navigate('/login'); }}
        className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm dark:text-[#4a6070] light:text-[#64748b] transition-colors hover:text-[#00b4dc]"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        Back to login
      </button>
    </div>
  );
}
