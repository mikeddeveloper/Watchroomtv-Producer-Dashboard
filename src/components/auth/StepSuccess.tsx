import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, LogIn } from 'lucide-react';

interface StepSuccessProps {
  onGoToLogin: () => void;
}

export function StepSuccess({ onGoToLogin }: StepSuccessProps) {
  const [countdown, setCountdown] = useState(5);
  const onGoToLoginRef = useRef(onGoToLogin);

  useEffect(() => {
    const redirectTimer = setTimeout(() => { onGoToLoginRef.current(); }, 5000);
    const countdownTimer = setInterval(() => {
      setCountdown((n) => Math.max(0, n - 1));
    }, 1000);
    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownTimer);
    };
  }, []);

  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#00b4dc]/30">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00b4dc]/10">
          <CheckCircle2 size={28} className="text-[#00b4dc]" aria-hidden="true" />
        </div>
      </div>

      <h2 className="mb-3 text-xl font-medium dark:text-white light:text-[#0f172a]">Password updated</h2>
      <p className="mb-8 text-sm dark:text-[#4a6070] light:text-[#64748b]">
        Your password has been reset successfully. Sign in with your new credentials.
      </p>

      <button
        type="button"
        onClick={onGoToLogin}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00b4dc] py-3 text-sm font-medium text-[#04121a] transition-all duration-200 hover:bg-[#00cef8] active:scale-[0.98]"
      >
        <LogIn size={16} aria-hidden="true" />
        <span>Go to sign in</span>
      </button>

      <div className="mt-3">
        <div className="mb-1 flex justify-center gap-1.5">
          {Array.from({ length: countdown }, (_, i) => (
            <span
              key={i}
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#3a5060]"
            />
          ))}
        </div>
        {countdown > 0 && (
          <p className="text-[10px] text-[#3a5060]">Redirecting in {countdown}s</p>
        )}
      </div>
    </div>
  );
}
