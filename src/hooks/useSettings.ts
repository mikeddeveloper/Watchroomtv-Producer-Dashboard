import { useState } from 'react';
import type { ChangePasswordPayload } from '../types/settings.types';
import { settingsService } from '../services/settingsService';

export function useSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function clearMessages(): void {
    setSuccessMessage(null);
    setError(null);
  }

  async function updateUsername(username: string): Promise<void> {
    setIsLoading(true);
    clearMessages();
    try {
      const result = await settingsService.updateUsername({ username });
      setSuccessMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update username');
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfilePicture(file: File): Promise<void> {
    setIsLoading(true);
    clearMessages();
    try {
      const result = await settingsService.updateProfilePicture({ file });
      setSuccessMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile picture');
    } finally {
      setIsLoading(false);
    }
  }

  async function changePassword(payload: ChangePasswordPayload): Promise<void> {
    setIsLoading(true);
    clearMessages();
    try {
      const result = await settingsService.changePassword(payload);
      setSuccessMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    updateUsername,
    updateProfilePicture,
    changePassword,
    isLoading,
    successMessage,
    error,
    clearMessages,
  };
}
