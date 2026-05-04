"use client";

import { useToast } from '@/app/context/ToastContext';
import Toast from '@/app/components/molecules/Toast';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 z-[200] flex flex-col gap-4 pointer-events-none items-center sm:items-end">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full sm:w-auto animate-in slide-in-from-bottom-8 sm:slide-in-from-right-8 duration-300">
          <Toast toast={toast} onRemove={() => removeToast(toast.id)} />
        </div>
      ))}
    </div>
  );
}
