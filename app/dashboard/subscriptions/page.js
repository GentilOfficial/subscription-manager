"use client";

import { useEffect, useState } from "react";
import { useSubscriptionStore } from "../../../stores/subscriptions";
import CsvImportModal from "../../components/CsvImportModal";
import SubscriptionCard from "../../components/subscriptions/SubscriptionCard";
import SubscriptionModal from "../../components/subscriptions/SubscriptionModal";
import CalendarSyncModal from "../../components/subscriptions/CalendarSyncModal";
import { useToast } from "@/app/context/ToastContext";
import { subscriptions as content, notifications, calendarSync } from "../../config/content";
import { exportCsv } from "../../utils/exportCsv";

import Button from "../../components/ui/Button";

export default function SubscriptionsPage() {
  const { addToast } = useToast();
  const {
    subscriptions,
    isLoading,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    init
  } = useSubscriptionStore();

  useEffect(() => {
    init();
  }, [init]);

  const [filter, setFilter] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const openAddModal = () => {
    setEditingId(null);
    setEditingData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (sub) => {
    setEditingId(sub.id);
    setEditingData({
      name: sub.name,
      price: sub.price,
      interval: sub.interval,
      status: sub.status,
      category: sub.category,
      color: sub.color,
      renewalDate: sub.renewalDate || new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setEditingData(null);
  };

  const handleSave = async (subData) => {
    try {
      if (editingId) {
        await updateSubscription(editingId, subData);
        addToast(notifications.success.update, 'success');
      } else {
        await addSubscription(subData);
        addToast(notifications.success.add, 'success');
      }
      closeModal();
    } catch (error) {
      addToast(editingId ? notifications.error.update : notifications.error.add, 'error');
    }
  };

  const handleDelete = async () => {
    if (editingId) {
      try {
        await deleteSubscription(editingId);
        addToast(notifications.success.delete, 'success');
        closeModal();
      } catch (error) {
        addToast(notifications.error.delete, 'error');
      }
    }
  };

  const handleExportCsv = () => {
    try {
      exportCsv(subscriptions);
      addToast(notifications.success.export, 'success');
    } catch (error) {
      addToast(notifications.error.export, 'error');
    }
  };

  const filteredSubs = filter === 'All' ? subscriptions : subscriptions.filter(s => s.category === filter);

  if (isLoading) {
    return null
  }

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 relative ease-out">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
          <div className="max-w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-app-text dark:text-app-text-dark mb-4 leading-tight">{content.heading}</h1>
            <p className="text-base sm:text-lg md:text-xl text-app-text-muted font-medium max-w-2xl">{content.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center w-full lg:w-auto">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto">
              <Button
                variant="ghost"
                onClick={handleExportCsv}
                className="whitespace-nowrap"
              >
                {content.exportCsv}
              </Button>

              <Button
                variant="ghost"
                onClick={() => setIsImportModalOpen(true)}
                className="whitespace-nowrap"
              >
                {content.importCsv}
              </Button>
              <Button
                onClick={() => setIsSyncModalOpen(true)}
                variant="secondary"
                className="flex-1 sm:flex-none whitespace-nowrap"
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
              >
                {calendarSync.button}
              </Button>
            </div>


            <Button
              onClick={openAddModal}
              className="flex-1 sm:flex-none"
              size="lg"
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>}
            >
              {content.addNew}
            </Button>
          </div>
        </header>

        <div className="flex gap-3 pt-2 px-6 pb-6 overflow-x-auto custom-scrollbar">
          {[content.filterAll, ...content.categories].map((cat, i) => (
            <button
              key={i}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all border ${filter === cat
                ? 'bg-app-text text-app-text-dark dark:bg-app-text-dark dark:text-app-bg-dark border-transparent shadow-[0_8px_16px_rgb(0,0,0,0.1)] scale-105'
                : 'bg-app-surface/60 dark:bg-app-surface-dark/5 backdrop-blur-md text-app-text-muted dark:text-app-text-dark/70 hover:bg-app-surface dark:hover:bg-app-surface-dark/10 hover:text-app-text dark:hover:text-app-text-dark border-slate-200/50 dark:border-white/5 hover:scale-105'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-4">
          {filteredSubs.map((sub) => (
            <SubscriptionCard key={sub.id} sub={sub} onClick={() => openEditModal(sub)} />
          ))}
          {filteredSubs.length === 0 && (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-app-surface/50 dark:bg-white/5 backdrop-blur-md border border-dashed border-slate-300/50 dark:border-white/10 rounded-[3rem]">
              <div className="w-20 h-20 bg-app-bg dark:bg-white/5 rounded-full flex items-center justify-center mb-6 ring-8 ring-app-bg dark:ring-white/5">
                <svg className="w-10 h-10 text-app-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight text-app-text dark:text-app-text-dark mb-2">{content.emptyTitle}</h3>
              <p className="text-lg text-app-text-muted font-medium max-w-sm mb-8">{content.emptyMessage}</p>
              <Button onClick={openAddModal} variant="secondary" size="lg">
                {content.emptyCta}
              </Button>
            </div>
          )}
        </div>
      </div>

      <CsvImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
      <CalendarSyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
        initialData={editingData}
        isEditing={!!editingId}
      />
    </>
  );
}
