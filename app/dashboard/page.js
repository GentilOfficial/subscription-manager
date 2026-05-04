"use client";

import { AlertTriangle } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useAuthStore } from '@/stores/auth';
import { useSubscriptionStore } from '@/stores/subscriptions';
import AccentBlock from '@/app/components/molecules/AccentBlock';
import ActivityBlock from '@/app/components/molecules/ActivityBlock';
import ChartBlock from '@/app/components/molecules/ChartBlock';
import JumboBlock from '@/app/components/molecules/JumboBlock';
import { overview } from '@/app/config/content';
import { getDaysRemaining, getNextRenewalDate } from '@/app/utils/dateUtils';
import { useDashboardStats } from '@/app/hooks/useDashboardStats';

export default function DashboardOverview() {
  const { subscriptions, isLoading: subsLoading, error, init: initSubs } = useSubscriptionStore();
  const { profile } = useAuthStore();

  useEffect(() => {
    initSubs();
  }, [initSubs]);

  const stats = useDashboardStats(subscriptions);

  if (subsLoading) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-accent/10 border border-accent/20 rounded-[2.5rem] p-12 text-center w-full max-w-lg animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-accent-dark" />
          </div>
          <p className="text-2xl font-black text-accent-dark mb-4">{overview.syncError}</p>
          <p className="text-app-text-muted font-medium mb-8 leading-relaxed">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-10 py-4 bg-app-text dark:bg-app-text-dark text-app-bg dark:text-app-bg-dark rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            {overview.retrySync}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-app-text dark:text-app-text-dark mb-4">
          {overview.greeting}<span className="text-transparent tracking-normal bg-clip-text bg-gradient-to-r from-primary to-accent">{overview.greetingName(profile?.username || "Guest")}</span>
        </h1>
        <p className="text-lg md:text-xl text-app-text-muted font-medium">{overview.subtitle(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }))}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 lg:gap-8">
        <JumboBlock stats={stats} />
        <AccentBlock upcomingSubs={stats.upcomingSubs} />
        <ChartBlock categoryData={stats.categoryData} />
        <ActivityBlock subscriptions={stats.recentActivity} />
      </div>
    </div>
  );
}
