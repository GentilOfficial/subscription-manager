"use client";

import { useEffect, useMemo } from 'react';
import { useSubscriptionStore } from '../../stores/subscriptions';
import AccentBlock from '../components/dashboard/AccentBlock';
import ActivityBlock from '../components/dashboard/ActivityBlock';
import ChartBlock from '../components/dashboard/ChartBlock';
import JumboBlock from '../components/dashboard/JumboBlock';
import { overview } from '../config/content';

export default function DashboardOverview() {
  const { subscriptions, isLoading, init } = useSubscriptionStore();

  useEffect(() => {
    init();
  }, [init]);

  const stats = useMemo(() => {
    const active = subscriptions.filter(s => s.status === 'Active');

    // Calculate Monthly Spend
    const totalMonthly = active.reduce((acc, sub) => {
      let monthlyCost = sub.price;
      if (sub.interval === 'Yearly') monthlyCost = sub.price / 12;
      if (sub.interval === 'Weekly') monthlyCost = sub.price * 4.33;
      return acc + monthlyCost;
    }, 0);

    // Calculate spend by category for the chart
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

    // Find closest upcoming payment
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize today to midnight
    let closestSub = null;
    let minDiff = Infinity;

    active.forEach(sub => {
      if (!sub.renewalDate) return;
      const renewalDate = new Date(sub.renewalDate);
      renewalDate.setHours(0, 0, 0, 0);

      // Calculate next renewal (assuming it hasn't passed, or if it has, calculate next cycle)
      // For simplicity, we just check if it's strictly >= today
      if (renewalDate >= today) {
        const diff = renewalDate - today;
        if (diff < minDiff) {
          minDiff = diff;
          closestSub = sub;
        }
      }
    });

    const daysUntilNext = closestSub ? Math.ceil(minDiff / (1000 * 60 * 60 * 24)) : null;

    return { totalMonthly, activeCount: active.length, categoryData, closestSub, daysUntilNext };
  }, [subscriptions]);

  if (isLoading) {
    return null
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-app-text dark:text-app-text-dark mb-4">
          {overview.greeting}<span className="text-transparent tracking-normal bg-clip-text bg-gradient-to-r from-primary to-accent">{overview.greetingName("Federico")}</span>
        </h1>
        <p className="text-lg md:text-xl text-app-text-muted font-medium">{overview.subtitle(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }))}</p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 lg:gap-8">
        <JumboBlock stats={stats} />
        <AccentBlock closestSub={stats.closestSub} daysUntilNext={stats.daysUntilNext} />
        <ChartBlock categoryData={stats.categoryData} />
        <ActivityBlock subscriptions={subscriptions} />
      </div>
    </div>
  );
}
