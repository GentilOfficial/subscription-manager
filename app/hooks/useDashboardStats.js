import { useMemo } from 'react';
import { SUBSCRIPTION_INTERVALS, SUBSCRIPTION_STATUSES } from '@/app/config/constants';
import { getDaysRemaining, getNextRenewalDate } from '@/app/utils/dateUtils';

export function useDashboardStats(subscriptions) {
  return useMemo(() => {
    const active = subscriptions.filter(s => s.status === SUBSCRIPTION_STATUSES.ACTIVE);

    const totalMonthly = active.reduce((acc, sub) => {
      let monthlyCost = sub.price;
      if (sub.interval === SUBSCRIPTION_INTERVALS.YEARLY) monthlyCost = sub.price / 12;
      if (sub.interval === SUBSCRIPTION_INTERVALS.WEEKLY) monthlyCost = sub.price * 4.33;
      return acc + monthlyCost;
    }, 0);

    const categoryTotals = active.reduce((acc, sub) => {
      let monthlyCost = sub.price;
      if (sub.interval === SUBSCRIPTION_INTERVALS.YEARLY) monthlyCost = sub.price / 12;
      if (sub.interval === SUBSCRIPTION_INTERVALS.WEEKLY) monthlyCost = sub.price * 4.33;

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
        if (sub.interval === SUBSCRIPTION_INTERVALS.WEEKLY) lastPaid.setDate(lastPaid.getDate() - 7);
        else if (sub.interval === SUBSCRIPTION_INTERVALS.MONTHLY) lastPaid.setMonth(lastPaid.getMonth() - 1);
        else if (sub.interval === SUBSCRIPTION_INTERVALS.YEARLY) lastPaid.setFullYear(lastPaid.getFullYear() - 1);
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
}
