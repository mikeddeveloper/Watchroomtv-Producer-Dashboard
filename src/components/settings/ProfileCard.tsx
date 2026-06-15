import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { AlertCircle, Camera, CheckCircle, Save } from 'lucide-react';
import type { AuthUser } from '../../types/auth.types';

interface ProfileCardProps {
  user: AuthUser;
  onUsernameUpdate: (username: string) => Promise<void>;
  onPictureUpdate: (file: File) => Promise<void>;
  isLoading: boolean;
  successMessage: string | null;
  error: string | null;
}

export function ProfileCard({
  user,
  onUsernameUpdate,
  onPictureUpdate,
  isLoading,
  successMessage,
  error,
}: ProfileCardProps) {
  const [username, setUsername] = useState(user.username);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setFileError('Image must be under 2MB');
      return;
    }
    setFileError(null);
    void onPictureUpdate(file);
  }

  return (
    <div
      className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-6"
    >
      {/* Avatar section */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="relative h-24 w-24">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.username}
              className="h-24 w-24 rounded-full border-2 dark:border-[#1a2830] light:border-[#e2e8f0] object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-[#f8fafc]">
              <span className="text-2xl font-medium text-[#00b4dc]">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <button
            type="button"
            aria-label="Upload profile picture"
            onClick={() => { fileInputRef.current?.click(); }}
            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#00b4dc] transition-colors duration-200 hover:bg-[#00cef8]"
          >
            <Camera size={14} className="text-[#04121a]" aria-hidden="true" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <p className="text-sm dark:text-[#4a6070] light:text-[#64748b]">{user.email}</p>
        {fileError && (
          <p role="alert" className="text-xs text-red-400">{fileError}</p>
        )}
      </div>

      {/* Username form */}
      <div>
        <p className="mb-4 text-sm font-medium dark:text-white light:text-[#0f172a]">Update Username</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void onUsernameUpdate(username);
          }}
          noValidate
        >
          <div className="mb-5">
            <label
              htmlFor="settings-username"
              className="mb-2 block text-sm font-medium dark:text-[#4a6070] light:text-[#64748b]"
            >
              Username
            </label>
            <input
              id="settings-username"
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value); }}
              className="w-full rounded-lg border dark:border-[#1e2e38] light:border-[#cbd5e1] dark:bg-[#111a20] light:bg-[#f8fafc] px-4 py-3 dark:text-[#d0e8f0] light:text-[#1e293b] outline-none transition-all duration-200 placeholder:dark:text-[#2a3e4a] focus:border-[#00b4dc] focus:ring-2 focus:ring-[#00b4dc]/10"
            />
          </div>

          <button
            type="submit"
            disabled={username === user.username || isLoading || !username.trim()}
            className="flex items-center gap-2 rounded-lg bg-[#00b4dc] px-6 py-3 text-sm font-medium text-[#04121a] transition-all duration-200 hover:bg-[#00cef8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-[#04121a] border-t-transparent"
                />
                <span>Saving…</span>
              </>
            ) : (
              <>
                <Save size={15} aria-hidden="true" />
                <span>Save changes</span>
              </>
            )}
          </button>
        </form>
      </div>

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
      {error && (
        <div
          role="alert"
          className="mt-5 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle size={16} aria-hidden="true" className="shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
