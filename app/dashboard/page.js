"use client";

import { useEffect, useMemo } from 'react';
import { useSubscriptionStore } from '../../stores/subscriptions';
import AccentBlock from '../components/dashboard/AccentBlock';
import ActivityBlock from '../components/dashboard/ActivityBlock';
import ChartBlock from '../components/dashboard/ChartBlock';
import JumboBlock from '../components/dashboard/JumboBlock';
import { overview } from '../config/content';
import { getDaysRemaining, getNextRenewalDate } from '../utils/dateUtils';

export default function DashboardOverview() {
  const { subscriptions, isLoading, error, init } = useSubscriptionStore();

  useEffect(() => {
    init();
  }, [init]);

  const stats = useMemo(() => {
    const active = subscriptions.filter(s => s.status === 'Active');

    const totalMonthly = active.reduce((acc, sub) => {
      let monthlyCost = sub.price;
      if (sub.interval === 'Yearly') monthlyCost = sub.price / 12;
      if (sub.interval === 'Weekly') monthlyCost = sub.price * 4.33;
      return acc + monthlyCost;
    }, 0);

    const categoryTotals = active.reduce((acc, sub) => {
      let monthlyCost = sub.price;
      if (sub.interval === 'Yearly') monthlyCost = sub.price / 12;
      if (sub.interval === 'Weekly') monthlyCost = sub.price * 4.33;

      if (!acc[sub.category]) acc[sub.category] = 0;
      acc[sub.category] += monthlyCost;
      return acc;
    }, {});

    const categoryData = Object.keys(categoryTotals).map(cat => ({
      name: cat,
      value: Number(categoryTotals[cat].toFixed(2))
    }));

    const upcomingSubs = active.map(sub => {
      const nextRenewal = getNextRenewalDate(sub.renewalDate, sub.interval);
      if (!nextRenewal) return null;
      const daysUntil = getDaysRemaining(nextRenewal);
      
      return { 
        ...sub, 
        nextRenewalDate: nextRenewal, 
        daysUntil 
      };
    })
    .filter(Boolean)
    .filter(sub => sub.daysUntil >= 0 && sub.daysUntil <= 7)
    .sort((a, b) => a.nextRenewalDate - b.nextRenewalDate)
    .slice(0, 3);

    const recentActivity = active.map(sub => {
      const next = getNextRenewalDate(sub.renewalDate, sub.interval);
      if (!next) return null;
      
      let lastPaid = new Date(next);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (next > today) {
        if (sub.interval === 'Weekly') lastPaid.setDate(lastPaid.getDate() - 7);
        else if (sub.interval === 'Monthly') lastPaid.setMonth(lastPaid.getMonth() - 1);
        else if (sub.interval === 'Yearly') lastPaid.setFullYear(lastPaid.getFullYear() - 1);
      }

      const firstPaymentDate = new Date(sub.renewalDate);
      firstPaymentDate.setHours(0, 0, 0, 0);
      if (lastPaid < firstPaymentDate) return null;
      
      return { ...sub, lastPaidDate: lastPaid };
    })
    .filter(Boolean)
    .sort((a, b) => b.lastPaidDate - a.lastPaidDate)
    .slice(0, 5);

    return { 
      totalMonthly, 
      activeCount: active.length, 
      categoryData, 
      upcomingSubs,
      recentActivity
    };
  }, [subscriptions]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-accent/10 border border-accent/20 rounded-[2.5rem] p-12 text-center w-full max-w-lg animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
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
          {overview.greeting}<span className="text-transparent tracking-normal bg-clip-text bg-gradient-to-r from-primary to-accent">{overview.greetingName("Federico")}</span>
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
