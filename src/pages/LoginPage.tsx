import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { LoginForm } from '../components/auth/LoginForm';
import { authService } from '../services/authService';
import type { ApiError, LoginCredentials } from '../types/auth.types';
import watchroomLogo from '../assets/watcroomLogo.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' });
  }, []);

  async function handleLogin(credentials: LoginCredentials): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      await authService.login(credentials);
      navigate('/dashboard');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message ?? 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleForgotPassword(): void {
    navigate('/forgot-password');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-[#080c10] light:bg-[#f0f4f8] px-4 py-12">

      <div className="w-full max-w-sm">

        {/* Logo */}
        <div data-aos="fade-down" className="mb-8 flex justify-center">
          <img
            src={watchroomLogo}
            alt="WatchRoomTV"
            className="h-11 w-11 object-contain"
          />
        </div>

        {/* Form card */}
        <div
          data-aos="fade-up"
          data-aos-delay="80"
          className="rounded-xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white px-7 py-8"
        >
          <h1 className="mb-1 text-[17px] font-semibold dark:text-white light:text-[#0f172a]">
            Sign in to your account
          </h1>
          <p className="mb-7 text-sm dark:text-[#4a6070] light:text-[#64748b]">
            Enter your credentials to access the producer portal
          </p>
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {/* Footer */}
        <p data-aos="fade-up" data-aos-delay="160" className="mt-6 text-center text-sm dark:text-[#4a6070] light:text-[#64748b]">
          Not a producer yet?{' '}
          <a
            href="mailto:producers@watchroomtv.com"
            className="text-[#00b4dc] transition-colors hover:underline"
          >
            Request access
          </a>
        </p>

      </div>
    </div>
  );
}
