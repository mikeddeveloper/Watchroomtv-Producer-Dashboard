import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { Settings } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProfileCard } from '../components/settings/ProfileCard';
import { PasswordCard } from '../components/settings/PasswordCard';
import { AppearanceCard } from '../components/settings/AppearanceCard';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    updateUsername,
    updateProfilePicture,
    changePassword,
    isLoading,
    successMessage,
    error,
  } = useSettings();

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' });
  }, []);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <DashboardLayout>
      {/* Page header */}
      <div data-aos="fade-down" className="mb-8 flex items-center gap-3">
        <Settings size={22} className="text-[#00b4dc]" aria-hidden="true" />
        <div>
          <h1 className="text-xl font-medium dark:text-white light:text-[#0f172a]">Settings</h1>
          <p className="text-sm dark:text-[#4a6070] light:text-[#64748b]">
            Manage your producer account
          </p>
        </div>
      </div>

      {/* Settings grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Left column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ProfileCard
            user={user}
            onUsernameUpdate={updateUsername}
            onPictureUpdate={updateProfilePicture}
            isLoading={isLoading}
            successMessage={successMessage}
            error={error}
          />
          <PasswordCard
            onChangePassword={changePassword}
            isLoading={isLoading}
            successMessage={successMessage}
            error={error}
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <AppearanceCard />

          {/* Account info card */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5"
          >
            <p className="mb-4 text-sm font-medium dark:text-white light:text-[#0f172a]">
              Account Info
            </p>

            {(
              [
                { label: 'Account Type', value: 'Producer' },
                { label: 'Email', value: user.email },
                { label: 'Member Since', value: 'January 2025' },
              ] as const
            ).map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between border-b dark:border-[#1a2830] light:border-[#e2e8f0] py-3 last:border-0"
              >
                <span className="text-xs dark:text-[#4a6070] light:text-[#64748b]">{label}</span>
                <span className="text-xs dark:text-[#d0e8f0] light:text-[#1e293b]">{value}</span>
              </div>
            ))}

            {/* Status row */}
            <div className="flex justify-between py-3">
              <span className="text-xs dark:text-[#4a6070] light:text-[#64748b]">Status</span>
              <span className="flex items-center text-xs dark:text-[#d0e8f0] light:text-[#1e293b]">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Active
              </span>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
