import { useAuthStore } from '@/stores/auth';
import { ArrowRight, Calendar } from 'lucide-react';
import { blocks } from '../../config/content';
import SubscriptionIcon from '../SubscriptionIcon';
import Badge from '../ui/Badge';
import GlassCard from '../ui/GlassCard';

import { getDaysRemaining, getNextRenewalDate } from '../../utils/dateUtils';

export default function SubscriptionCard({ sub, onClick }) {
  const { getCurrencySymbol } = useAuthStore();
  const nextRenewalDate = getNextRenewalDate(sub.renewalDate, sub.interval);
  const daysRemaining = getDaysRemaining(nextRenewalDate);

  return (
    <GlassCard 
      className="p-8 cursor-pointer hover:shadow-2xl hover:scale-[1.03] active:scale-95 group transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-6">
        <SubscriptionIcon name={sub.name} color={sub.color} className="w-16 h-16 rounded-2xl shadow-lg group-hover:scale-110 transition-transform" />
        <div className="flex flex-col items-end gap-2">
          <Badge showDot>{sub.status}</Badge>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-2xl font-extrabold tracking-tight text-app-text dark:text-app-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{sub.name}</h3>
        <p className="text-sm font-bold text-app-text-muted tracking-wider uppercase mt-1">{sub.category}</p>
      </div>
      
      <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-white/10 flex items-end justify-between">
        <div>
          <p className="text-3xl sm:text-[2.5rem] leading-none font-extrabold tracking-tighter text-app-text dark:text-app-text-dark mb-1 whitespace-nowrap"><span className="text-lg sm:text-xl text-primary mr-0.5">{getCurrencySymbol()}</span>{Number(sub.price).toFixed(2)}</p>
          <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-app-text-muted">
            <span>{sub.interval}</span>
            {sub.renewalDate && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20"></span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {nextRenewalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                {daysRemaining !== null && daysRemaining >= 0 && daysRemaining <= 7 && (
                  <span className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-md border ${
                    daysRemaining === 0 
                      ? 'bg-accent/10 text-accent-dark border-accent/20 animate-pulse' 
                      : daysRemaining > 0 && daysRemaining <= 7 
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-app-bg dark:bg-white/5 text-app-text-muted border-slate-200/50 dark:border-white/10'
                  }`}>
                    {daysRemaining === 0 ? blocks.accent.today : blocks.accent.days(daysRemaining)}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-app-bg dark:bg-app-surface-dark/50 flex items-center justify-center text-app-text-muted/50 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </GlassCard>
  );
}
