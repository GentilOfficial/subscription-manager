"use client";

import { getIcsToken, revokeIcsToken } from '@/stores/ics';
import { useEffect, useState } from 'react';
import { calendarSync, settings } from '../../config/content';
import CalendarSyncModal from '../subscriptions/CalendarSyncModal';
import Button from '../ui/Button';
import RevokeModal from './RevokeModal';

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
      <section className="bg-app-surface/60 dark:bg-app-surface-dark/5 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/50 dark:border-white/5 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 shrink-0 bg-app-text/5 dark:bg-white/5 rounded-full flex items-center justify-center text-app-text dark:text-app-text-dark">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
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
              <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
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
            <div className="text-center py-8 bg-app-bg/50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
              <p className="text-app-text-muted mb-4">{settings.calendarFeed.emptyToken}</p>
              <Button onClick={() => setIsModalOpen(true)}>
                {settings.calendarFeed.generateBtn}
              </Button>
            </div>
          )}
        </div>

      </section>

      <CalendarSyncModal isOpen={isModalOpen} onClose={handleModalClose} />
      <RevokeModal isOpen={isRevokeModalOpen} onClose={() => setIsRevokeModalOpen(false)} onConfirm={confirmRevoke} />
    </>
  );
}
