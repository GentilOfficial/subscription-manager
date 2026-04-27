import { useAuthStore } from '@/stores/auth';
import Link from 'next/link';
import { blocks } from '../../config/content';
import GlassCard from '../ui/GlassCard';

export default function JumboBlock({ stats }) {
  const { getCurrencySymbol } = useAuthStore();
  return (
    <GlassCard className="md:col-span-6 lg:col-span-8 p-8 md:p-12">
      <div className="flex flex-col h-full justify-between">
        <h3 className="text-xl font-semibold text-app-text-muted mb-8 sm:mb-20">{blocks.jumbo.title}</h3>
        <div>
          <p className="text-[3.5rem] sm:text-[7rem] leading-none font-extrabold tracking-tighter text-app-text dark:text-app-text-dark">
            <span className="text-primary pr-2">{getCurrencySymbol()}</span>{stats.totalMonthly.toFixed(0)}<span className="text-2xl sm:text-5xl text-app-text-muted/30">.{stats.totalMonthly.toFixed(2).split('.')[1]}</span>
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="bg-primary-muted text-primary px-4 py-2 rounded-full font-bold text-sm border border-primary/20 shadow-sm">
              {blocks.jumbo.activeServices(stats.activeCount)}
            </div>
            <Link href="/dashboard/subscriptions" className="text-app-text-muted font-semibold text-sm hover:text-app-text dark:hover:text-app-text-dark flex items-center gap-1 transition-colors">
              {blocks.jumbo.viewAll} <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
