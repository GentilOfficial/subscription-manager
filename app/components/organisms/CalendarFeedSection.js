"use client";

import { getIcsToken, revokeIcsToken } from '@/stores/ics';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { calendarSync, settings } from '@/app/config/content';
import CalendarSyncModal from '@/app/components/organisms/CalendarSyncModal';
import Button from '@/app/components/atoms/Button';
import EmptyState from '@/app/components/atoms/EmptyState';
import GlassCard from '@/app/components/atoms/GlassCard';
import Spinner from '@/app/components/atoms/Spinner';
import RevokeModal from '@/app/components/organisms/RevokeModal';

export default function CalendarFeedSection() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    setIsLoading(true);
    try {
      const existingToken = await getIcsToken();
      setToken(existingToken);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeClick = () => {
    setIsRevokeModalOpen(true);
  };

  const confirmRevoke = async () => {
    setIsLoading(true);
    setIsRevokeModalOpen(false);
    try {
      await revokeIcsToken();
      setToken(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchToken();
  };

  const copyToClipboard = () => {
    if (!token) return;
    const url = `${window.location.origin}/api/calendar/${token}`;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        if (document.execCommand('copy')) {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        }
      } catch (err) {
        console.error('Fallback copy error', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <>
      <GlassCard className="p-8 sm:p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 shrink-0 bg-app-text/5 dark:bg-white/5 rounded-full flex items-center justify-center text-app-text dark:text-app-text-dark">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-app-text dark:text-app-text-dark">
              {settings.calendarFeed.title}
            </h2>
            <p className="text-sm text-app-text-muted mt-1">
              {settings.calendarFeed.description}
            </p>
          </div>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <Spinner size="md" className="text-primary" />
            </div>
          ) : token ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold mb-2">{settings.calendarFeed.feedUrlLabel}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 bg-app-bg dark:bg-black/20 p-3 rounded-xl border border-slate-200/50 dark:border-white/5 overflow-x-auto custom-scrollbar flex items-center">
                    <p className="font-mono text-sm text-app-text-muted dark:text-app-text-dark whitespace-nowrap">
                      {`${window.location.origin}/api/calendar/${token}`}
                    </p>
                  </div>
                  <Button onClick={copyToClipboard} variant="secondary" className="shrink-0 transition-all">
                    {isCopied ? calendarSync.copiedBtn : calendarSync.copyBtn}
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center flex-wrap gap-4">
                <Button variant="danger" onClick={handleRevokeClick} className="w-full sm:w-auto">
                  {settings.calendarFeed.revokeBtn}
                </Button>
                <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
                  {calendarSync.button}
                </Button>
              </div>
            </div>
          ) : (
            <EmptyState
              title={settings.calendarFeed.emptyToken}
              action={
                <Button onClick={() => setIsModalOpen(true)}>
                  {settings.calendarFeed.generateBtn}
                </Button>
              }
            />
          )}
        </div>
      </GlassCard>

      <CalendarSyncModal isOpen={isModalOpen} onClose={handleModalClose} />
      <RevokeModal isOpen={isRevokeModalOpen} onClose={() => setIsRevokeModalOpen(false)} onConfirm={confirmRevoke} />
    </>
  );
}
