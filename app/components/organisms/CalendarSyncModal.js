"use client";

import { getIcsToken, refreshIcsToken } from '@/stores/ics';
import { AlertTriangle, Calendar, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { calendarSync } from '@/app/config/content';
import BaseModal from '@/app/components/organisms/BaseModal';
import Button from '@/app/components/atoms/Button';
import Spinner from '@/app/components/atoms/Spinner';

export default function CalendarSyncModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setStep(1);
      setIsCopied(false);
      getIcsToken().then(existingToken => {
        if (existingToken) {
          setToken(existingToken);
          setStep(2);
        }
        setIsLoading(false);
      }).catch(err => {
        setIsLoading(false);
      });
    }
  }, [isOpen]);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const newToken = await refreshIcsToken();
      setToken(newToken);
      setStep(2);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
    <BaseModal isOpen={isOpen} onClose={onClose} title={calendarSync.modalTitle} maxWidth="max-w-xl">
      <div className="p-6 sm:p-8">
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Spinner size="lg" className="text-primary" />
          </div>
        ) : step === 1 ? (
          <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-app-text/5 dark:bg-white/5 rounded-full flex items-center justify-center text-app-text dark:text-app-text-dark">
              <Calendar className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-app-text dark:text-app-text-dark">{calendarSync.step1Title}</h3>
              <p className="mt-2 text-app-text-muted">{calendarSync.step1Desc}</p>
              
              <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-800 dark:text-yellow-600 text-sm p-4 rounded-xl mt-6 max-w-sm mx-auto text-left flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="font-medium leading-relaxed">{calendarSync.step1Disclaimer}</p>
              </div>
            </div>
            <Button size="lg" onClick={handleGenerate} className="w-full justify-center">
              {calendarSync.generateBtn}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-app-text dark:text-app-text-dark">{calendarSync.step2Title}</h3>
              <p className="mt-2 text-app-text-muted">{calendarSync.step2Desc}</p>
            </div>

            <div className="p-2 sm:p-4 bg-app-surface/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
               <div className="overflow-x-auto custom-scrollbar flex-1 w-full bg-app-bg dark:bg-black/20 p-3 rounded-xl border border-slate-200/50 dark:border-white/5 flex items-center">
                 <p className="text-sm font-mono text-app-text-muted dark:text-app-text-dark whitespace-nowrap">
                   {`${window.location.origin}/api/calendar/${token}`}
                 </p>
               </div>
               <Button onClick={copyToClipboard} variant={isCopied ? 'primary' : 'secondary'} className="w-full sm:w-auto shrink-0 whitespace-nowrap transition-all">
                 {isCopied ? (
                   <span className="flex items-center gap-2">
                     <Check className="w-4 h-4" />
                     {calendarSync.copiedBtn}
                   </span>
                 ) : calendarSync.copyBtn}
               </Button>
            </div>

            <div className="pt-6 border-t border-slate-200/50 dark:border-white/10">
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-app-text-muted">{calendarSync.instructionsHeadline}</h4>
              <ul className="text-sm space-y-3 text-app-text-muted">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><span className="text-xs font-bold">1</span></div>
                  <span>{calendarSync.instructions.apple}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><span className="text-xs font-bold">2</span></div>
                  <span>{calendarSync.instructions.google}</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
}
