import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, DollarSign, Film } from 'lucide-react';
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

        {/* Logo section */}
        <div data-aos="fade-down" data-aos-duration="700" className="flex flex-col items-center gap-3">
          <img
            src={watchroomLogo}
            alt="WatchRoomTV"
            className="h-16 w-16 object-contain"
          />
          <p className="text-[22px] font-medium tracking-tight">
            <span className="dark:text-white light:text-[#0f172a]">Watch</span>
            <span className="text-[#00b4dc]">Room</span>
            <span className="dark:text-white light:text-[#0f172a]">TV</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#3a5060]">
            Producer Portal
          </p>
        </div>

        {/* Platform features row */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="flex justify-center gap-6"
        >
          {([
            { Icon: Film, label: 'Upload' },
            { Icon: BarChart2, label: 'Analytics' },
            { Icon: DollarSign, label: 'Revenue' },
          ] as const).map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Icon size={18} className="text-[#00b4dc]/60" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-wider text-[#3a5060]">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white px-7 py-8"
        >
          <h1 className="mb-1 text-lg font-medium dark:text-white light:text-[#0f172a]">Welcome back</h1>
          <p className="mb-7 text-sm dark:text-[#4a6070] light:text-[#64748b]">
            Enter your producer credentials to continue
          </p>
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {/* Footer */}
        <p data-aos="fade-up" data-aos-delay="200" className="text-center text-sm text-[#2e4a58]">
          Not a producer yet?{' '}
          <a
            href="mailto:producers@watchroomtv.com"
            className="text-[#00b4dc]/80 transition-colors hover:text-[#00b4dc]"
          >
            Request access
          </a>
        </p>

      </div>
    </div>
  );
}
