"use client";

import { useMemo, useState } from 'react';
import { useAuthStore } from '../../../stores/auth';
import { settings } from '../../config/content';
import Button from '../ui/Button';

export default function ChangePasswordSection() {
  const { updatePassword } = useAuthStore();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password requirements validation
  const reqs = useMemo(() => {
    return {
      length: newPassword.length >= 12,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      special: /[^A-Za-z0-9]/.test(newPassword)
    };
  }, [newPassword]);

  const requirementsMet = Object.values(reqs).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setErrorMsg('');

    if (!requirementsMet) {
      setErrorMsg(settings.changePassword.errorRequirements);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg(settings.changePassword.errorMismatch);
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePassword(newPassword);
      setSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CheckIcon = ({ fulfilled }) => (
    <svg className={`w-4 h-4 shrink-0 transition-colors ${fulfilled ? 'text-green-500' : 'text-slate-300 dark:text-white/20'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <section className="bg-app-surface/60 dark:bg-app-surface-dark/5 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/50 dark:border-white/5 shadow-xl mt-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-app-text/5 dark:bg-white/5 rounded-full flex items-center justify-center text-app-text dark:text-app-text-dark">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-app-text dark:text-app-text-dark">
            {settings.changePassword.title}
          </h2>
          <p className="text-sm text-app-text-muted mt-1">
            {settings.changePassword.description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold tracking-wide text-app-text-muted mb-3">
              {settings.changePassword.newPasswordLabel}
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-5 py-4 bg-app-bg dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10 rounded-2xl text-app-text dark:text-app-text-dark focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-app-text-muted/50 font-bold shadow-inner"
              placeholder={settings.changePassword.newPasswordPlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-bold tracking-wide text-app-text-muted mb-3">
              {settings.changePassword.confirmPasswordLabel}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-4 bg-app-bg dark:bg-app-surface-dark border border-slate-200/50 dark:border-white/10 rounded-2xl text-app-text dark:text-app-text-dark focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-app-text-muted/50 font-bold shadow-inner"
              placeholder={settings.changePassword.confirmPasswordPlaceholder}
            />
          </div>
        </div>

        <div className="p-4 bg-app-bg dark:bg-black/20 rounded-2xl border border-slate-200/50 dark:border-white/5">
          <ul className="text-sm text-app-text-muted space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <li className="flex items-center gap-2">
              <CheckIcon fulfilled={reqs.length} /> <span>{settings.changePassword.requirements.length}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon fulfilled={reqs.uppercase} /> <span>{settings.changePassword.requirements.uppercase}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon fulfilled={reqs.lowercase} /> <span>{settings.changePassword.requirements.lowercase}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon fulfilled={reqs.number} /> <span>{settings.changePassword.requirements.number}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon fulfilled={reqs.special} /> <span>{settings.changePassword.requirements.special}</span>
            </li>
          </ul>
        </div>

        {errorMsg && (
          <div className="px-5 py-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl text-sm font-semibold text-red-600 dark:text-red-400 animate-in fade-in duration-300">
            {errorMsg}
          </div>
        )}

        {success && (
          <div className="px-5 py-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-2xl text-sm font-semibold text-green-600 dark:text-green-400 animate-in fade-in duration-300">
            {settings.changePassword.successMsg}
          </div>
        )}

        <div className="flex justify-end pt-5 border-t border-slate-200 dark:border-white/10">
          <Button type="submit" disabled={isSubmitting || !newPassword || !confirmPassword || !requirementsMet} className="w-full sm:w-auto px-8 transition-all">
            {isSubmitting ? settings.changePassword.updatingBtn : settings.changePassword.updateBtn}
          </Button>
        </div>
      </form>
    </section>
  );
}
