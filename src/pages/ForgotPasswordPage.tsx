import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { StepEnterEmail } from '../components/auth/StepEnterEmail';
import { StepVerifyOTP } from '../components/auth/StepVerifyOTP';
import { StepNewPassword } from '../components/auth/StepNewPassword';
import { StepSuccess } from '../components/auth/StepSuccess';
import { authService } from '../services/authService';
import type { ApiError } from '../types/auth.types';
import watchroomLogo from '../assets/watcroomLogo.png';

type ForgotPasswordStep = 'email' | 'otp' | 'newPassword' | 'success';

const STEP_ORDER: ForgotPasswordStep[] = ['email', 'otp', 'newPassword', 'success'];

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [step]);

  async function handleSendOTP(emailInput: string): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(emailInput);
      setEmail(emailInput);
      setStep('otp');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message ?? 'Failed to send code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyOTP(otpInput: string): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      await authService.verifyOTP({ email, otp: otpInput });
      setOtp(otpInput);
      setStep('newPassword');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message ?? 'Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOTP(): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(email);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message ?? 'Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword(newPassword: string): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword({ email, otp, newPassword });
      setStep('success');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message ?? 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleGoToLogin(): void {
    navigate('/login');
  }

  const stepIndex = STEP_ORDER.indexOf(step);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden dark:bg-[#080c10] light:bg-[#f0f4f8] px-4 py-12">
      {/* Background gradients */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-125"
        style={{ background: 'radial-gradient(ellipse at top center, rgba(0,180,220,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(0,180,220,0.04) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-100 flex-col gap-8">

        {/* Logo */}
        <div data-aos="fade-down" data-aos-duration="700" className="flex flex-col items-center gap-3">
          <img src={watchroomLogo} alt="WatchRoomTV" className="h-16 w-16 object-contain" />
          <p className="text-[22px] font-medium tracking-tight">
            <span className="dark:text-white light:text-[#0f172a]">Watch</span>
            <span className="text-[#00b4dc]">Room</span>
            <span className="dark:text-white light:text-[#0f172a]">TV</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#3a5060]">Producer Portal</p>
        </div>

        {/* Step progress */}
        <div data-aos="fade-up" data-aos-delay="100" className="flex justify-center gap-2">
          {STEP_ORDER.map((_step, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === stepIndex
                  ? 'h-1.5 w-6 bg-[#00b4dc]'
                  : 'h-1.5 w-1.5 dark:bg-[#1a2830] light:bg-[#e2e8f0]'
              }`}
            />
          ))}
        </div>

        {/* Form card */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white px-7 py-8"
        >
          {step === 'email' && (
            <StepEnterEmail
              onNext={handleSendOTP}
              isLoading={isLoading}
              error={error}
            />
          )}
          {step === 'otp' && (
            <StepVerifyOTP
              email={email}
              onNext={handleVerifyOTP}
              onResend={handleResendOTP}
              isLoading={isLoading}
              error={error}
            />
          )}
          {step === 'newPassword' && (
            <StepNewPassword
              onNext={handleResetPassword}
              isLoading={isLoading}
              error={error}
            />
          )}
          {step === 'success' && (
            <StepSuccess onGoToLogin={handleGoToLogin} />
          )}
        </div>

      </div>
    </div>
  );
}
