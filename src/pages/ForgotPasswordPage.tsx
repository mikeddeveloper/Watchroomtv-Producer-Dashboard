import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-[#080c10] light:bg-[#f0f4f8] px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src={watchroomLogo} alt="WatchRoomTV" className="h-11 w-11 object-contain" />
        </div>

        {/* Step progress */}
        <div className="mb-6 flex justify-center gap-2">
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
        <div className="rounded-xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white px-7 py-8">
          {step === 'email' && (
            <StepEnterEmail onNext={handleSendOTP} isLoading={isLoading} error={error} />
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
            <StepNewPassword onNext={handleResetPassword} isLoading={isLoading} error={error} />
          )}
          {step === 'success' && (
            <StepSuccess onGoToLogin={handleGoToLogin} />
          )}
        </div>

      </div>
    </div>
  );
}
