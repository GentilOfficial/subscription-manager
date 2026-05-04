"use client";

import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth';
import { currencies, settings } from '@/app/config/content';
import Button from '@/app/components/atoms/Button';
import GlassCard from '@/app/components/atoms/GlassCard';
import Input from '@/app/components/atoms/Input';
import Label from '@/app/components/atoms/Label';
import Select from '@/app/components/atoms/Select';
import Spinner from '@/app/components/atoms/Spinner';

export default function ProfileSection() {
  const { profile, updateProfile, isLoading } = useAuthStore();
  const [username, setUsername] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (profile?.username) {
      setUsername(profile.username);
    }
    if (profile?.currency) {
      setCurrency(profile.currency);
    }
  }, [profile]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess('');
    
    if (username.length > 20) {
      setErrorMsg(settings.profile.errorTooLong);
      return;
    }

    setIsUpdating(true);
    try {
      await updateProfile({ username, currency });
      setSuccess(settings.profile.successMsg);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setErrorMsg(err.message || settings.profile.errorGeneric);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading && !profile) {
    return (
      <GlassCard className="p-8 sm:p-10 animate-pulse">
        <div className="h-8 bg-app-text/10 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-app-text/5 rounded w-2/4"></div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-8 sm:p-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 shrink-0 bg-app-text/5 dark:bg-white/5 rounded-full flex items-center justify-center text-app-text dark:text-app-text-dark">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-app-text dark:text-app-text-dark">
            {settings.profile.title}
          </h2>
          <p className="text-sm text-app-text-muted mt-1">
            {settings.profile.description}
          </p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="mb-3">
              {settings.profile.usernameLabel}
            </Label>
            <Input
              type="text"
              variant="bgInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={settings.profile.usernamePlaceholder}
              maxLength={20}
            />
            <div className="flex justify-between px-2 pt-1 text-xs text-app-text-muted">
              <span>{settings.profile.usernameHint}</span>
              <span className={username.length === 20 ? 'text-red-500' : ''}>
                {username.length}/20
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="mb-3">
              {settings.profile.currencyLabel}
            </Label>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </Select>
            <p className="px-2 pt-1 text-xs text-app-text-muted">
              {settings.profile.currencyHint}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="px-5 py-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl text-sm font-semibold text-red-600 dark:text-red-400 animate-in fade-in duration-300">
            {errorMsg}
          </div>
        )}

        {success && (
          <div className="px-5 py-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-2xl text-sm font-semibold text-green-600 dark:text-green-400 animate-in fade-in duration-300">
            {success}
          </div>
        )}

        <div className="flex justify-end pt-5 border-t border-slate-200 dark:border-white/10">
          <Button 
            type="submit" 
            disabled={isUpdating || (username === (profile?.username || '') && currency === (profile?.currency || 'EUR'))} 
            className="w-full sm:w-auto px-8 transition-all flex items-center justify-center gap-2"
          >
            {isUpdating && <Spinner size="sm" />}
            {isUpdating ? settings.profile.updatingBtn : settings.profile.updateBtn}
          </Button>
        </div>
      </form>
    </GlassCard>
  );
}
