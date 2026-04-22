"use client";

import BaseModal from '../ui/BaseModal';
import Button from '../ui/Button';
import { settings, calendarSync } from '../../config/content';

export default function RevokeModal({ isOpen, onClose, onConfirm }) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={settings.calendarFeed.revokeModal.title} maxWidth="max-w-md">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-app-text dark:text-app-text-dark">{settings.calendarFeed.revokeModal.heading}</h3>
          <p className="text-app-text-muted">{settings.calendarFeed.revokeConfirm}</p>

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
            <Button variant="subtle" onClick={onClose} className="flex-1 w-full justify-center">
              {settings.calendarFeed.revokeModal.cancelBtn}
            </Button>
            <Button variant="danger" onClick={onConfirm} className="flex-1 w-full bg-red-500 text-white hover:bg-red-600 border-transparent text-center justify-center">
              {settings.calendarFeed.revokeModal.confirmBtn}
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
